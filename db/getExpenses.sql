SELECT DISTINCT id, name, amount, ischecked, notes, category, extract(day FROM fulldate) as day, 
extract(month FROM fulldate) as month, userid, sum(amount) over (ORDER BY id) running_Total
FROM homeexpenses
WHERE userid = 1
AND extract(month FROM fulldate) = $1
AND extract(year FROM fulldate) = $2
ORDER BY id ASC;