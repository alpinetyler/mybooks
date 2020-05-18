INSERT INTO fixedexpenses(name, amount, notes, category, userid)
VALUES(
${name},
${amount},
${notes},
${category},
18
);

SELECT * FROM fixedexpenses
WHERE userid = 18
ORDER BY id ASC;