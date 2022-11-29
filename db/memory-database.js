const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const loadData = require('../db-scripts/base-data')

module.exports = async function db ({ test = false }){
    try {
        const mongo = await MongoMemoryServer.create()
        const uri = mongo.getUri()

        ;(async () => {
            await mongoose.connect(uri, {})
            console.log(
                '« Connected to In-Memory database. Loading base data... »'
            )

            if (!test) {
                console.log('« ...Loading base data... »')
                await loadData()
                console.log('« Base data loaded to In-Memory database! »')
            }
        })()
    } catch (e) {
        console.log('ERROR', e)
    }
}
