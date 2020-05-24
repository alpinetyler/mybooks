select distinct id, name, date, amount, ischecked, notes, category, userid, sum(amount) over (ORDER BY id) running_Total
from homeexpenses
WHERE category = 'reserve'
AND userid = $1
ORDER BY id ASC;