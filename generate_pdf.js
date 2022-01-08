var html_to_pdf = require('html-pdf-node');
let options = { format: 'A4', path: 'resume.pdf', scale: 0.70, printBackground: true, margin: {
    top: 4,
    bottom: 8,
    left: 8,
    right: 8
} };
// Example of options with args //
// let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

let file = { url: "http://192.168.1.19:8887" };

html_to_pdf.generatePdf(file, options).then(pdfBuffer => {

});