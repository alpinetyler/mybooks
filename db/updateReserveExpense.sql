UPDATE homeexpenses
SET name = ${name},
date = ${date},
amount = ${amount},
ischecked = ${ischecked},
notes = ${notes},
category = 'reserve'
WHERE id = ${id};

select distinct id, name, date, amount, ischecked, notes, category, userid, sum(amount) over (ORDER BY id) running_Total
from homeexpenses
WHERE category = 'reserve'
AND userid = ${userid}
ORDER BY id DESC;