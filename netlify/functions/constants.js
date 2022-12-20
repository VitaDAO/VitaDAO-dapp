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

owned AS (
    SELECT
        contract_address,
        balance AS raw_balance,
        (SELECT price FROM ethereum.token_prices etp
            WHERE etp.token_address = contract_address
            ORDER BY timestamp DESC LIMIT 1) as price
    FROM ethereum.token_owners AS eto
    WHERE eto.owner_address = '0xF5307a74d1550739ef81c6488DC5C7a6a53e5Ac2' AND balance > 0
),

tokens AS (
    SELECT
        et.name,
        et.symbol,
        price,
        raw_balance / POWER(10, et.decimals) as balance,
        raw_balance / POWER(10, et.decimals) * price as usd_value,
        et.image_url
    FROM owned
    JOIN ethereum.tokens AS et
    ON owned.contract_address = et.contract_address
)

SELECT
    name,
    symbol,
    price,
    balance,
    usd_value,
    usd_value * 100 / (SELECT SUM(usd_value) FROM tokens) AS usd_percent,
    image_url
FROM tokens
WHERE usd_value >= 1
ORDER BY usd_value DESC;
`
