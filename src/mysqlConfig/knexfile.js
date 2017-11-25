module.exports = {

    development: {

        migrations: { tableName: 'knex_migrations' },
        seeds: { tableName: './seeds' },

        client: 'mysql',
        connection: {

            host: '192.168.99.100',

            user: 'root',
            password: 'password',

            database: 'wschat',
            charset: 'utf8',

        }

    }

};
