UPDATE homeexpenses
SET name = ${name},
date = ${date},
amount = ${amount},
ischecked = ${ischecked},
notes = ${notes},
category = ${category}
WHERE id = ${id};

SELECT DISTINCT id, date, name, amount, ischecked, notes, category, userid, sum(amount) over (ORDER BY id) running_Total
FROM homeexpenses
WHERE userid = ${userid}
AND extract(month FROM fulldate) = extract (month FROM CURRENT_DATE)
AND extract(year FROM fulldate) = extract (year FROM CURRENT_DATE)
ORDER BY id DESC;