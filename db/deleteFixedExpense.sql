DELETE FROM fixedexpenses
WHERE id = $1;

SELECT * FROM fixedexpenses
WHERE userid = 18
ORDER BY id ASC;