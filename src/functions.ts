//import PdfPrinter = require('pdfmake');
import PdfPrinter from 'pdfmake';
import * as vfsFont from 'pdfmake/build/vfs_fonts.js';
import * as pdfInterfaces from 'pdfmake/interfaces';
import * as fs from 'fs';

const logic = () => {

  const fonts = {
    Roboto: {
        normal: new Buffer(vfsFont.pdfMake.vfs['Roboto-Regular.ttf'], 'base64'),
        bold: new Buffer(vfsFont.pdfMake.vfs['Roboto-Medium.ttf'], 'base64'),
        italics: new Buffer(vfsFont.pdfMake.vfs['Roboto-Italic.ttf'], 'base64'),
        bolditalics: new Buffer(vfsFont.pdfMake.vfs['Roboto-MediumItalic.ttf'], 'base64')
      }
    };

    const documentDefinition = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      footer: (currentPage: number, pageCount: number) => {
          return {
              columns: [
                  {
                      text: `${ currentPage.toString() } / ${ pageCount }`,
                      alignment: 'right'
                  }
              ]
          }
      },
      content: [
      ],
      styles: {
          footer: {
              margin: [48, 0, 48, 0]
          }
      }
    } as pdfInterfaces.TDocumentDefinitions;

    const printer: PdfPrinter = new PdfPrinter(fonts);
    const pdfDoc: PDFKit.PDFDocument = printer.createPdfKitDocument(documentDefinition);
    pdfDoc.pipe(fs.createWriteStream(`document_${Math.floor(Math.random() * 20)}.pdf`));
    pdfDoc.end();
};

export default logic;
