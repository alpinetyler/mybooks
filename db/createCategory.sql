INSERT INTO category(categoryname)
VALUES(
${categoryname}
);

SELECT * FROM category
ORDER BY categoryname ASC;