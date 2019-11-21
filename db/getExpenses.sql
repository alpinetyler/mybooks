SELECT DISTINCT id, date, name, amount, ischecked, notes, category, fulldate, userid, sum(amount) over (ORDER BY id) running_Total
FROM homeexpenses
WHERE userid = 1
AND extract(month FROM fulldate) = extract (month FROM CURRENT_DATE)
AND extract(year FROM fulldate) = extract (year FROM CURRENT_DATE)
ORDER BY id ASC;