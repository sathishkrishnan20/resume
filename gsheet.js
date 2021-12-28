
const { GoogleSpreadsheet } = require('google-spreadsheet');
// const creds = require('./key.json'); 
  async function readResumeContents(req, res) {
    const creds = JSON.parse(Buffer.from(process.env.G_KEY, 'base64').toString('ascii'))
    const doc = new GoogleSpreadsheet('10xljBtYDCbZHUREYT2AN8694SvhWCvno8Xa1g8wkNvE');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // loads document properties and worksheets
    
    console.log(doc.title);
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    console.log(sheet.title);
    console.log(sheet.rowCount);
    
    res.send({
        title: sheet.title,
        rowCount: sheet.rowCount
    })
  }

module.exports = {
    readResumeContents
}