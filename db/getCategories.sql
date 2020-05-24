SELECT * FROM category
WHERE userid = $1
ORDER BY categoryname ASC;