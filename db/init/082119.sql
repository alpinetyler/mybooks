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