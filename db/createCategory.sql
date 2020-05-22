INSERT INTO category(categoryname, userid)
VALUES(
${categoryname},
${userid}
);

SELECT * FROM category
WHERE userid = ${userid}
ORDER BY categoryname ASC;