SELECT DISTINCT id, name, amount, ischecked, notes, category, date, userid, fulldate, sum(amount) over (ORDER BY id) running_Total
FROM homeexpenses
WHERE userid = $3
AND extract(month FROM fulldate) = $1
AND extract(year FROM fulldate) = $2
ORDER BY id ASC;