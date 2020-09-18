UPDATE monthlist
SET monthname = ${monthname},
monthnumber = ${monthnumber},
years = ${years},
userid = ${userid},
beginningbalance = ${beginningbalance}
WHERE id = ${id};

SELECT * FROM monthlist
WHERE userid = ${userid}
ORDER BY id ASC;