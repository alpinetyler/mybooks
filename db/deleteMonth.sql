DELETE FROM monthlist
WHERE id = $1;

SELECT * FROM monthlist
ORDER BY years, monthnumber ASC;