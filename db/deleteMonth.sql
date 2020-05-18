DELETE FROM monthlist
WHERE id = $1;

SELECT * FROM monthlist
WHERE userid = 18
ORDER BY years, monthnumber ASC;