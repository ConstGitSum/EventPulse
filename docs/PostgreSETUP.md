Start by installing [PostgreSQL](http://www.postgresql.org/) from the official [download page](http://www.postgresql.org/download/).

We&rsquo;ll be using [Knex](http://knexjs.org/) to interact with our database. Knex is a SQL query builder that we can use with PostgreSQL to handle migrations, manage the schema, and query the database.

We need to create two new databases, one for developing and the other for testing. Open [psql](http://www.postgresql.org/docs/9.5/static/app-psql.html) in the terminal, and create a new database:

        $ psql
        psql (9.4.5)
        Type "help" for help.

        # CREATE DATABASE event_pulse;
        CREATE DATABASE
        # CREATE DATABASE event_pulse_test;
        CREATE DATABASE
        # \q
