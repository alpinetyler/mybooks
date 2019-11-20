INSERT INTO homeexpenses(name, date, amount, ischecked, notes, category)
VALUES(
${name},
${date},
${amount},
${ischecked},
${notes},
${category}
);

SELECT DISTINCT id, date, name, amount, ischecked, notes, category, sum(amount) over (ORDER BY id) running_Total
FROM homeexpenses
ORDER BY id ASC;