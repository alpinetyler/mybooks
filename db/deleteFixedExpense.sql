DELETE FROM fixedexpenses
WHERE id = $1;

SELECT * FROM fixedexpenses
WHERE userid = $2
ORDER BY id ASC;