select distinct id, name, date, amount, ischecked, notes, category, userid, sum(amount) over (ORDER BY id) running_Total
from homeexpenses
WHERE category = 'reserve'
ORDER BY id ASC;