module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://master:password@localhost:5432/home',
        pool: {
            min: 1,
            max: 10,
        },
        migrations: {
            directory: './db/migrations',
            tableName: 'deviceMigrations',
        }
    }
}