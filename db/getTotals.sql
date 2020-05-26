SELECT category, SUM(amount)
FROM homeexpenses
WHERE extract(month FROM fulldate) = $1
AND extract(year from fulldate) = $2
AND userid = $3
group by category
ORDER BY SUM DESC