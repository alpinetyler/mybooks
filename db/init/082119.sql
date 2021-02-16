CREATE TABLE homeexpenses(
id SERIAL PRIMARY KEY,
name VARCHAR,
date VARCHAR,
amount DECIMAL,
ischecked VARCHAR,
notes  VARCHAR,
category VARCHAR,
fulldate, DATE,
userid, INTEGER
);


CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    categoryname VARCHAR,
    userid INTEGER
);

CREATE TABLE monthList(
    id SERIAL PRIMARY KEY,
    monthName VARCHAR,
    monthNumber INT,
    years INT,
    userid INT,
    beginningbalance NUMERIC(15,7)
);




INSERT INTO homeexpenses
          (fulldate,
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

-- How to See table structur: select column_name, data_type, character_maximum_length, column_default, is_nullable
-- from INFORMATION_SCHEMA.COLUMNS where table_name = 'monthlist';