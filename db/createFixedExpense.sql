INSERT INTO fixedexpenses(name, amount, notes, category, userid)
VALUES(
${name},
${amount},
${notes},
${category},
${userid}
);

SELECT * FROM fixedexpenses
WHERE userid = ${userid}
ORDER BY id ASC;