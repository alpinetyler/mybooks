INSERT INTO homeexpenses(name, date, amount, category, class)
VALUES(
'WalMart',
'2019-08-21',
'46.55',
'groceries',
null
);


INSERT INTO category(categoryname)
VALUES(
    'groceries'
);

INSERT INTO monthlist(monthname, monthnumber, years)
VALUES(
    'January',
    1,
    2020
)

INSERT INTO fixedexpenses(name, amount, category)
VALUES(
'Chase',
'1604.00',
'mortgage'
);

INSERT INTO homeexpenses(name, amount, notes, category, userid)
SELECT name, amount, notes, category, userid FROM fixedexpenses