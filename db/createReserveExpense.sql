INSERT INTO homeexpenses(name, date, amount, ischecked, notes, category, userid)
VALUES(
${name},
${date},
${amount},
${ischecked},
${notes},
${category},
18
);

select distinct id, name, date, amount, ischecked, notes, category, userid, sum(amount) over (ORDER BY id) running_Total
from homeexpenses
WHERE category = 'reserve'
AND userid = 18
ORDER BY id ASC;