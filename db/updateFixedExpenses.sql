UPDATE fixedexpenses
SET name = ${name},
amount = ${amount},
notes = ${notes},
category = ${category},
userid = ${userid}
WHERE id = ${id};

SELECT * FROM fixedexpenses
WHERE userid = 18
ORDER BY id ASC;