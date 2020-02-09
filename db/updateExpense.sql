UPDATE homeexpenses
SET name = ${name},
amount = ${amount},
ischecked = ${ischecked},
notes = ${notes},
category = ${category},
fulldate = ${fulldate}
WHERE id = ${id};

SELECT DISTINCT id, date, name, amount, ischecked, notes, category, extract(day FROM fulldate) as day, 
extract(month FROM fulldate) as month, userid, sum(amount) over (ORDER BY id) running_Total
FROM homeexpenses
WHERE userid = 1
AND extract(month FROM fulldate) = extract (month FROM CURRENT_DATE)
AND extract(year FROM fulldate) = extract (year FROM CURRENT_DATE)
ORDER BY id ASC;