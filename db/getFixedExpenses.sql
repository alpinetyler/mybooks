SELECT DISTINCT name, amount, notes, category, userid
FROM fixedexpenses
WHERE userid = 1
ORDER BY id ASC;