# WSD-project

Application for self-monitoring

# Link to application:
 
``
https://wsdapp1.herokuapp.com/
``

## Launching the server locally:

This tutorial assumes the use of Deno and databases in elephantSQL.

First, create a file called "config.env" in the root file of the application structure with the following lines filled with the correct database and port information:

```
export DATABASE_URL=*your database URL here*`
export PORT=*your port, probably 7777 here*
```

Then, launch the application in Git Bash with 

```
source config.env`
deno run --unstable --allow-read --allow-net --allow-env app.js`
```

## Preparing the databases
### User database
```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));
```
### Morning report database
```
CREATE TABLE morning_reports (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  hours_slept NUMERIC,
  sleep_quality INTEGER,
  mood INTEGER,
  user_id INTEGER REFERENCES users(id)
);
```
### Evening report database
```
CREATE TABLE evening_reports (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  sports_time NUMERIC,
  study_time NUMERIC,
  eating INTEGER,
  mood INTEGER,
  user_id INTEGER REFERENCES users(id)
);
```

### Other notes

- Duplicate evening or morning reports update the old report instead of removing the old one and making a new one
