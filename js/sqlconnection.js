const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:nazhslonyarazZz@localhost:5432/Chattting')

module.exports = { db };