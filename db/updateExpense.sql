UPDATE homeexpenses
SET name = ${name},
date = ${date},
amount = ${amount},
ischecked = ${ischecked},
notes = ${notes},
category = ${category}
WHERE id = ${id};

SELECT DISTINCT id, date, name, amount, ischecked, notes, category, sum(amount) over (ORDER BY id) running_Total
FROM homeexpenses
ORDER BY id ASC;