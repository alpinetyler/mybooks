SELECT category, SUM(amount)
FROM homeexpenses
WHERE userid = 1
AND extract(month FROM fulldate) = $1
AND extract(year FROM fulldate) = $2
GROUP BY category