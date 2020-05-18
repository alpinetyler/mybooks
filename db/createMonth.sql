INSERT INTO monthlist(monthname, monthnumber, years, userid)
VALUES(
    ${monthname},
    ${monthnumber},
    ${years},
    18
);

INSERT INTO homeexpenses(name, amount, notes, category, userid, fulldate)
SELECT fixedexpenses.name, fixedexpenses.amount, fixedexpenses.notes, fixedexpenses.category, 18, to_date(concat(${years}, ${monthnumber}, 01), 'YYYYMMDD')
FROM fixedexpenses
ORDER BY id;


SELECT * FROM monthlist
WHERE userid = 18
ORDER BY years, monthnumber ASC;