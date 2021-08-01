const fs = require('fs');
var data = JSON.parse(fs.readFileSync('./database/data.json').toString())
var datadir = __dirname + '/../database/data.json'
module.exports = async (client) => {
    console.log('[Data Handlers]', 'Pushing data into client...')
    client.data = data
    client.updateData = async () => {
        try {
            fs.writeFileSync(datadir, JSON.stringify(client.data, null, 4), {
                mode: 0o666,
            })
        } catch (e) {
            console.error('[Data Handlers] ERROR: Failed to update data. Additional info: ' + e)
        }
    }
    console.log('[Data Handlers]', 'Push data complete.')
}