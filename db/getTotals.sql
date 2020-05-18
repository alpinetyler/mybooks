SELECT category, SUM(amount)
FROM homeexpenses
WHERE extract(month FROM fulldate) = 5 AND
extract(year from fulldate) = 2020
AND userid = 18
group by category
ORDER BY SUM DESC