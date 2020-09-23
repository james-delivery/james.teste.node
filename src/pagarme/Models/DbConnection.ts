import pg from 'pg'

export default class DBConnection {
    private _connection: any

    constructor() {
        this._connection = this.connect()
    }

    async connect() {
        const client = new pg.Client()
        return client.connect()
    }

    getClient() {
        return this._connection
    }
}
