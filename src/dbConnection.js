const knex = require('knex');

function makeDbConnection() {
    return knex({
        client: 'pg',
        connection: 'postgres://master:password@localhost:5432/home',
        searchPath: ['device'],
        pool: { 
            min: 0,
            max: 4
        }
    });
}

module.exports = makeDbConnection;