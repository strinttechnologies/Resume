import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    try {
        // 1. Capture the element as a canvas
        // scale: 2 for better resolution
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false
        });

        const imgData = canvas.toDataURL('image/png');

        // 2. Initialize PDF
        // A4 dimensions: 210mm x 297mm
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // 3. Calculate image dimensions to fit PDF
        // We want to fit independent of screen size, so we rely on the aspect ratio
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // 4. Add image to PDF
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        // 5. Save
        pdf.save('resume.pdf');
    } catch (err) {
        console.error("Failed to generate PDF", err);
        alert("Failed to generate PDF. Check console for details.");
    }
};
