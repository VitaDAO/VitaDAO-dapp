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

export const stats = `
SELECT
    et.supply / POWER(10, et.decimals) as circulating,
    prices.price * (et.supply / POWER(10, et.decimals)) as market_cap
FROM ethereum.tokens et
JOIN
    (SELECT
        token_address,
        price
    FROM ethereum.token_prices etp
    WHERE etp.token_address = '0x81f8f0bb1cB2A06649E51913A151F0E7Ef6FA321'
    ORDER BY timestamp desc limit 1) as prices
ON prices.token_address = et.contract_address
WHERE et.contract_address = '0x81f8f0bb1cB2A06649E51913A151F0E7Ef6FA321';
`

export const tokens = `
WITH balances AS (
    SELECT
        balance,
        et.name,
        et.symbol,
        et.decimals,
        et.image_url as src,
        (SELECT price FROM ethereum.token_prices tp
            WHERE tp.token_address = eto.contract_address
            ORDER BY timestamp desc limit 1) as price
    FROM ethereum.token_owners eto
    JOIN ethereum.tokens et ON eto.contract_address = et.contract_address
    WHERE  owner_address='0xF5307a74d1550739ef81c6488DC5C7a6a53e5Ac2' AND balance > 0
) SELECT
    name,
    symbol,
    (balance / POWER(10, decimals)) AS balance,
        COALESCE((balance / POWER(10, decimals) * price), 0) AS usd_value,
    price,
    src
  FROM balances
  ORDER BY usd_value DESC;
`
