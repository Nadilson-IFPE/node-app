module.exports = {
    type: 'sqlite',
    database: './src/database/db.sqlite',
    cli: {
        migrationDir: './src/database/migrations'
    }
}