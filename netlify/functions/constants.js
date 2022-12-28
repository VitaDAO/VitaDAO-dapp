export const history = `
SELECT
    timestamp,
    SUM(COALESCE(bal
        * (SELECT price FROM ethereum.token_prices p
           WHERE contract_address = p.token_address
             AND timestamp <= p.timestamp
           ORDER BY timestamp DESC LIMIT 1)
        /
         POWER(10, (SELECT decimals FROM ethereum.tokens t
                    WHERE carried_balances.contract_address = t.contract_address)), 0))
        AS balance
FROM
(
    SELECT
        *,
        coalesce(balance, first_value(balance) over (PARTITION BY contract_address, open_group ORDER BY timestamp)) as bal
    FROM
    (
    select
        timestamp,
        contract_address,
        balance,
        count(balance) OVER (ORDER BY contract_address, timestamp) as open_group
    FROM
    (
    SELECT
        ts as timestamp,
        contract_addresses.contract_address,
        min(balance_series.min) as balance
    FROM generate_series(
        (SELECT date_trunc('day', created_timestamp) FROM ethereum.accounts WHERE address = '0xF5307a74d1550739ef81c6488DC5C7a6a53e5Ac2')::timestamp,
         date_trunc('day', NOW())::timestamp,
         '1 day'::interval) ts
     CROSS JOIN (SELECT contract_address
                 FROM ethereum.token_transfers
                 WHERE from_address = '0xF5307a74d1550739ef81c6488DC5C7a6a53e5Ac2'
                    OR to_address = '0xF5307a74d1550739ef81c6488DC5C7a6a53e5Ac2'
                 GROUP BY contract_address) contract_addresses
    LEFT OUTER JOIN
    (
        SELECT
            date_trunc('day', timestamp) AS timestamp,
            contract_address,
            min(balance)
        FROM
            (SELECT
                 timestamp,
                 contract_address,
                 (SELECT balance AS balance FROM ethereum.token_owners tok
                  WHERE tok.contract_address = transfers.contract_address
                    AND tok.owner_address = '0xF5307a74d1550739ef81c6488DC5C7a6a53e5Ac2')
                     -
                 (SELECT COALESCE(SUM(quantity), 0) AS balance FROM ethereum.token_transfers
                  WHERE contract_address = transfers.contract_address
                    AND to_address = '0xF5307a74d1550739ef81c6488DC5C7a6a53e5Ac2'
                    AND timestamp > transfers.timestamp
                    AND __confirmed = true)
                     +
                 (SELECT COALESCE(SUM(quantity), 0) AS balance FROM ethereum.token_transfers
                  WHERE contract_address = transfers.contract_address
                    AND from_address = '0xF5307a74d1550739ef81c6488DC5C7a6a53e5Ac2'
                    AND timestamp > transfers.timestamp
                    AND __confirmed = true)
                     AS balance

             FROM ethereum.token_transfers transfers
             WHERE from_address = '0xF5307a74d1550739ef81c6488DC5C7a6a53e5Ac2'
                OR to_address = '0xF5307a74d1550739ef81c6488DC5C7a6a53e5Ac2'

             UNION

             (SELECT
                  NOW() AS timestamp,
                  contract_address,
                  balance
              FROM ethereum.token_owners
              WHERE owner_address = '0xF5307a74d1550739ef81c6488DC5C7a6a53e5Ac2'
              AND balance >0)
             ) AS token_balances
        WHERE balance >= 0
        GROUP BY timestamp, contract_address
        ORDER BY timestamp) balance_series
    ON balance_series.contract_address = contract_addresses.contract_address
    AND balance_series.timestamp = ts
    GROUP BY ts, contract_addresses.contract_address
    ORDER BY contract_addresses.contract_address, ts
    ) balances
    ) carry
) carried_balances GROUP BY timestamp ORDER BY timestamp;
`

// TODO confirm final list of addresses aggregated as non-circulating and
// whether it's okay to commit to Git.
export const vita = `
WITH

vita AS (
    SELECT
        token_address,
        price AS usd
    FROM ethereum.token_prices AS etp
    WHERE etp.token_address = '0x81f8f0bb1cB2A06649E51913A151F0E7Ef6FA321'
    ORDER BY timestamp DESC LIMIT 1
),

nc AS (
    SELECT
        contract_address,
        SUM(balance) AS non_circulating
    FROM ethereum.token_owners
    WHERE contract_address = '0x81f8f0bb1cB2A06649E51913A151F0E7Ef6FA321'
    AND owner_address IN (
        '0xf5307a74d1550739ef81c6488dc5c7a6a53e5ac2'
    )
    GROUP BY contract_address
)

SELECT
    (et.supply - nc.non_circulating) / POWER(10, et.decimals) as circulating,
    vita.usd * (et.supply / POWER(10, et.decimals)) as market_cap
FROM ethereum.tokens AS et
JOIN vita ON vita.token_address = et.contract_address
JOIN nc ON nc.contract_address = et.contract_address
WHERE et.contract_address = '0x81f8f0bb1cB2A06649E51913A151F0E7Ef6FA321';
`

export const tokens = `
WITH

erc20s AS (
SELECT
    contract_address,
    balance raw_balance,
    (SELECT price FROM ethereum.token_prices etp
    WHERE etp.token_address = contract_address
    ORDER BY timestamp DESC LIMIT 1) price
FROM ethereum.token_owners eto
WHERE eto.owner_address = '0xF5307a74d1550739ef81c6488DC5C7a6a53e5Ac2'
AND balance > 0
AND eto.contract_address IN (
    '0x1249c510e066731FF14422500466A7102603da9e',
    '0x350196326AEAA9b98f1903fb5e8fc2686f85318C',
    '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32',
    '0x5aFE3855358E112B5647B952709E6165e1c1eEEe',
    '0x777C45BD0a2AF1dA5fe4a532AD6B207D3CEd8b2d',
    '0x7B50775383d3D6f0215A8F290f2C9e2eEBBEceb2',
    '0x81f8f0bb1cB2A06649E51913A151F0E7Ef6FA321',
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    '0xA6468eca7633246Dcb24E5599681767D27d1F978',
    '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
    '0xba100000625a3754423978a60c9317c58a424e3D',
    '0xcD4722B7c24C29e0413BDCd9e51404B4539D14aE',
    '0xD057B63f5E69CF1B929b356b579Cba08D7688048')),

eth AS (
SELECT
    balance / POWER(10, 18) AS balance,
    (SELECT price FROM ethereum.token_prices
    WHERE token_address = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    ORDER BY timestamp DESC LIMIT 1)
FROM ethereum.native_token_owners ento
WHERE ento.owner_address = '0xF5307a74d1550739ef81c6488DC5C7a6a53e5Ac2'),

tokens AS (
SELECT
    et.name,
    et.symbol,
    price,
    raw_balance / POWER(10, et.decimals) as balance,
    raw_balance / POWER(10, et.decimals) * price as usd_value,
    et.image_url,
    et.contract_address
FROM erc20s
JOIN ethereum.tokens et
ON erc20s.contract_address = et.contract_address
UNION
SELECT
    'Ethereum' AS name,
    'ETH' AS symbol,
    price,
    balance,
    balance * price AS usd_value,
    'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png' AS image_url,
    NULL AS contract_address
FROM eth)

SELECT
    name,
    symbol,
    ROUND(price, 2) AS price,
    ROUND(balance::text::numeric) AS balance,
    ROUND(usd_value::text::numeric) AS usd_value,
    ROUND((usd_value * 100 / (SELECT SUM(usd_value) FROM tokens))::text::numeric, 2) AS usd_percent,
    image_url,
    contract_address
FROM tokens
ORDER BY usd_value DESC NULLS LAST;
`
