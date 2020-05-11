INSERT INTO fixedexpenses(name, amount, notes, category, userid)
VALUES(
${name},
${amount},
${notes},
${category},
${userid}
);

SELECT * FROM fixedexpenses
WHERE userid = 1
ORDER BY id ASC;