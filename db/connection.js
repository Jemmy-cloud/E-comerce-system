exports.openConnection = () => {
    const knex = require('knex')({
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'Salah123',
            database: 'online_Market'
        }
    });

    return knex
}