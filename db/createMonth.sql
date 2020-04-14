INSERT INTO monthlist(monthname, monthnumber, years)
VALUES(
    ${monthname},
    ${monthnumber},
    ${years}
);

INSERT INTO homeexpenses(name, amount, notes, category, userid, fulldate)
SELECT fixedexpenses.name, fixedexpenses.amount, fixedexpenses.notes, fixedexpenses.category, 1, to_date(concat(${years}, ${monthnumber}, 01), 'YYYYMMDD')
FROM fixedexpenses
ORDER BY id;


SELECT * FROM monthlist
ORDER BY years, monthnumber ASC;