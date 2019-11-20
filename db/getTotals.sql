SELECT category, 
sum(amount)
FROM homeexpenses
GROUP BY category;