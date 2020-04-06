SELECT category, SUM(amount)
FROM homeexpenses
WHERE extract(month FROM fulldate) = 4 AND
extract(year from fulldate) = 2020
group by category