
const { GoogleSpreadsheet } = require('google-spreadsheet');
// const creds = require('./key.json'); 
  async function readResumeContents(req, res) {
    const creds = JSON.parse(Buffer.from(process.env.G_KEY, 'base64').toString('ascii'))
    const doc = new GoogleSpreadsheet('10xljBtYDCbZHUREYT2AN8694SvhWCvno8Xa1g8wkNvE');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // loads document properties and worksheets
    
    const mapper = {
      descriptionPoints: multiLineParser.bind(this)
    }
    const summaryList = await getSheetsData(doc, 0);
    const expList = await getSheetsData(doc, 1, mapper);
    const ownProjectsList = await getSheetsData(doc, 2, mapper);
    const achievementsList = await getSheetsData(doc, 3);
    const educationList = await getSheetsData(doc, 4);
    res.send({
      summaryList,
      expList,
      ownProjectsList,
      achievementsList,
      educationList
    })
  }
function multiLineParser(data) {
   return data.split('\n')
}
  
async function getSheetsData(doc, sheetIndex, customParser = {}) {
  const summarySheet = doc.sheetsByIndex[sheetIndex]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  const summarySheetRowData = await summarySheet.getRows();
  return getDataFromRows(summarySheet.headerValues, summarySheetRowData, customParser)
}  
function getDataFromRows(headers, rows, customParser) {
  const data = [];
  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];
    const obj = {}
    for (let hIndex = 0; hIndex < headers.length; hIndex++) {
      const key = headers[hIndex];
      obj[key] = customParser[key] ? customParser[key](row[key]) : row[key]
    }
    data.push(obj); 
  }
  return data;
} 
module.exports = {
    readResumeContents
}