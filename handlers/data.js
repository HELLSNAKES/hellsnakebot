const fs = require('fs');
var data = JSON.parse(fs.readFileSync('./database/data.json').toString())
var datadir = __dirname + '/../database/data.json'
module.exports = async (client) => {
    console.log('Pushing data into client...')
    client.data = data
    client.updateData = async () => {
        fs.writeFileSync(datadir, JSON.stringify(client.data, null, 4))
    }
    console.log('Push data complete.')
}