DELETE FROM category
WHERE id = $1;

SELECT * FROM category
WHERE userid = 18
ORDER BY categoryname ASC;