import html2pdf from 'html2pdf.js';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const convertToPdf = (component , fileName) => {
  const element = React.cloneElement(component);
  const htmlContent = ReactDOMServer.renderToString(element);

  const pdfOptions = {
    margin: 10,
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };
  const pdf = html2pdf().from(htmlContent).set(pdfOptions).outputPdf();
  pdf.save()
};

export default convertToPdf;
