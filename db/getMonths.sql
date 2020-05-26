SELECT * FROM monthlist
WHERE userid = $1
ORDER BY years, monthnumber ASC;