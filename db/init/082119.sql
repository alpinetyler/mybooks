CREATE TABLE homeexpenses(
id SERIAL PRIMARY KEY,
name VARCHAR,
date DATE,
amount DECIMAL,
ischecked BOOLEAN,
notes  VARCHAR,
category VARCHAR,

);

CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    categoryname VARCHAR
);

CREATE TABLE monthList(
    id SERIAL PRIMARY KEY,
    monthName VARCHAR,
    monthNumber INT,
    years INT
);

CREATE TABLE homeexpenses(
id SERIAL PRIMARY KEY,
name VARCHAR,
date DATE,
amount DECIMAL,
ischecked BOOLEAN,
notes  VARCHAR,
category VARCHAR,

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