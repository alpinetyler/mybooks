INSERT INTO monthlist(monthname, monthnumber, years, userid)
VALUES(
    ${monthname},
    ${monthnumber},
    ${years},
    ${userid}
);

INSERT INTO homeexpenses(name, amount, notes, category, userid, fulldate)
SELECT fixedexpenses.name, fixedexpenses.amount, fixedexpenses.notes, fixedexpenses.category, fixedexpenses.userid, to_date(concat(${years}, ${monthnumber}, 01), 'YYYYMMDD')
FROM fixedexpenses
WHERE fixedexpenses.userid = ${userid}
ORDER BY id;


SELECT * FROM monthlist
WHERE userid = ${userid}
ORDER BY years, monthnumber ASC;