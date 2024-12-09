
const sheetId = '10xljBtYDCbZHUREYT2AN8694SvhWCvno8Xa1g8wkNvE';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const query = encodeURIComponent('Select *')


function multiLineParser(data) {
    return data.split('\n')
}

 function booleanParser(data) {
   return data === 'TRUE' ? true : false
 }
 function numberParser(data) {
   return Number(data)
 }
  

 
async function getContents() {
    
    const mapper = {
        descriptionPoints: multiLineParser.bind(this),
        rolesAndResponsibilities: multiLineParser.bind(this),
        isLeft: booleanParser.bind(this),
        percentage: numberParser.bind(this),
    }

    const summaryList = await getSheetsData('SummaryList');
    const expList = await getSheetsData('WorkExp', mapper);
    const ownProjectsList = await getSheetsData('ownProjects', mapper);
    const achievementsList = await getSheetsData('keyAchievemnts');
    const educationList = await getSheetsData('educationList');
    const skillsList = await getSheetsData('skillsList');
    return {
        summaryList,
        expList,
        ownProjectsList,
        achievementsList,
        educationList,
        skillsList,
    }
}

async function getSheetsData(sheetName, customParser = {}) {
    const url = `${base}&sheet=${sheetName}&tq=${query}`
    const jsonData = await fetchNetworkData(url);
    const { headers, rows } = getHeadersAndRows(jsonData.table);
    return getDataFromRows(headers, rows, customParser)
}

function fetchNetworkData(url) {
    return new Promise((resolve, reject)=> {
        fetch(url)
        .then(res => res.text())
        .then(rep => {
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            resolve(jsonData);
        })
    })
}

function getHeadersAndRows(data) {
    const rows = [];
    const headers = [];
    let isLabelPresent = false;
    data.cols.forEach((heading) => {
        if (heading.label) {
            isLabelPresent = true;
            headers.push(heading.label);
        }
    })
    

    data.rows.forEach((rowData, index) => {
        const row = [];
        rowData.c.forEach((v) => { 
            if(index === 0 && isLabelPresent === false)
                headers.push(v.v);
            else { 
                row.push(v.v)   
            }
        });
        if (row.length)
            rows.push(row);
    })
    return { headers, rows }
}

 
function getDataFromRows(headers, rows, customParser) {
    const data = [];
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      const obj = {}
      for (let hIndex = 0; hIndex < headers.length; hIndex++) {
        const key = headers[hIndex];
        obj[key] = customParser[key] ? customParser[key](row[hIndex]) : row[hIndex];
      }
      data.push(obj); 
    }
    return data;
  }

