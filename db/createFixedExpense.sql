INSERT INTO fixedexpenses(name, amount, notes, category, userid)
VALUES(
${name},
${amount},
${notes},
${category},
${userid}
);

SELECT name, amount, notes, category, userid
FROM fixedexpenses
WHERE userid = 1
ORDER BY id ASC;