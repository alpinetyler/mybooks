INSERT INTO homeexpenses
          ( fulldate,
          name,
          amount,
          category,
          userid
          )
     SELECT ${fulldate},
           name,
          amount,
          category,
          ${userid}
      FROM fixedexpenses 