DELETE FROM category
WHERE id = $1;

SELECT * FROM category
WHERE userid = $2
ORDER BY categoryname ASC;