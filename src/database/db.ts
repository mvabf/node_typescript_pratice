import knex from 'knex';

const db = knex({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password:'S*ucram123',
        database: 'api_typescript'
    }
});

export default db;