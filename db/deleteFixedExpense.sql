DELETE FROM fixedexpenses
WHERE id = $1;

SELECT * FROM fixedexpenses
WHERE userid = 1
ORDER BY id ASC;