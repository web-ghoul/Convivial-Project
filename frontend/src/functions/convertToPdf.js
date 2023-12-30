import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactDOM from 'react-dom';

const convertToPdf = async (component, fileName) => {
  const container = document.body.appendChild(document.createElement('div'));
  ReactDOM.render(component, container);

  const images = container.querySelectorAll('img');
  const promises = [];

  images.forEach((img) => {
    const promise = new Promise((resolve) => {
      // Create a new Image to handle the online URL
      const image = new Image();
      image.onload = resolve;
      image.onerror = resolve;
      image.src = img.src; // Set the source to the online URL
    });
    promises.push(promise);
  });

  await Promise.all(promises);

  const canvas = await html2canvas(container, {
    scale: 2,
  });

  const pdf = new jsPDF({
    unit: 'mm',
    format: 'a4',
    orientation: 'portrait',
  });

  const imgData = canvas.toDataURL('image/png');
  pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);

  pdf.save(fileName);
};

export default convertToPdf;
