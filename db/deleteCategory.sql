DELETE FROM category
WHERE id = $1;

SELECT * FROM category
ORDER BY categoryname ASC;