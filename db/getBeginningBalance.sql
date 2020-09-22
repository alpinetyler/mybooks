SELECT beginningbalance FROM monthlist
WHERE userid = $1
AND monthnumber = $2
AND years = $3
