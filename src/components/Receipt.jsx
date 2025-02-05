import React from 'react';
import jsPDF from 'jspdf';

const Receipt = ({ formData, photoPreview }) => {
  const saveReceiptAsPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Admission Receipt', 20, 20);
    doc.setFontSize(16);

    if (photoPreview) {
      doc.addImage(photoPreview, 'JPEG', 150, 20, 40, 40); // Add photo preview
    }

    const receiptContent = `
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Address: ${formData.address}
      Date of Birth: ${formData.dob}
      Course: ${formData.course}
      Semester: ${formData.semester}
      Fee Type: ${formData.feeType}
      Roll Number: ${formData.rollNumber}
      Payment Method: ${formData.paymentMethod}
      Fee Amount: ₹${getFeeAmount(formData)}
      Status: ${formData.paymentMethod === "UPI" ? "Paid" : "Unpaid"}
      ${formData.paymentMethod !== "UPI" ? "Please verify and submit your fee at the college clerk's office. Thank you." : ""}
    `;
    
    doc.setFontSize(12);
    doc.text(receiptContent, 20, 50);
    doc.save('receipt.pdf');
  };

  const openReceiptInNewPage = () => {
    const newWindow = window.open('', '_blank');
    const content = `
      <html>
        <head>
          <title>Admission Receipt</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              background-color: #f9f9f9;
            }
          </style>
        </head>
        <body class="p-4 md:p-10">
          <h1 class="text-2xl md:text-3xl font-bold text-center mb-5 uppercase">Admission Receipt</h1>
          <div class="bg-white p-4 md:p-6 rounded-lg shadow-md max-w-full md:max-w-lg mx-auto">
            ${photoPreview ? `
              <div class="float-right ml-4 md:ml-6 mb-4 md:mb-6">
                <img src="${photoPreview}" alt="ID Preview" class="w-24 h-24 md:w-32 md:h-32 rounded-lg shadow-md"/>
              </div>
            ` : ''}
            <div>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Name:</strong> ${formData.name}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Email:</strong> ${formData.email}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Phone:</strong> ${formData.phone}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Address:</strong> ${formData.address}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Date of Birth:</strong> ${formData.dob}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Course:</strong> ${formData.course}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Semester:</strong> ${formData.semester}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Fee Type:</strong> ${formData.feeType}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Roll Number:</strong> ${formData.rollNumber}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Payment Method:</strong> ${formData.paymentMethod}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Fee Amount:</strong> ₹${getFeeAmount(formData)}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Status:</strong> ${formData.paymentMethod === "UPI" ? "Paid" : "Unpaid"}</p>
            </div>
            <div class="clear-both"></div>
            <p class="text-red-600 font-bold text-center mt-5">
              ${formData.paymentMethod !== "UPI" ? "Please verify and submit your fee at the college clerk's office. Thank you." : ""}
            </p>
            <div class="border-dashed border-2 border-gray-400 h-20 md:h-24 mt-6 flex items-center justify-center text-gray-500 italic">
              College Stamp (After Verification and Fee Submission)
            </div>
          </div>
        </body>
      </html>
    `;
    newWindow.document.write(content);
    newWindow.document.close();
  };

  return (
    <div>
      <button onClick={saveReceiptAsPdf} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition duration-300">
        Save as PDF
      </button>
      <button onClick={openReceiptInNewPage} className="mt-4 ml-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg hover:bg-green-600 transition duration-300">
        Open in New Page
      </button>
    </div>
  );
};

const getFeeAmount = (formData) => {
  if (formData.course === "BCA") {
    return formData.feeType === "Subsidized" ? 7000 : 14000;
  }
  if (formData.course === "MCA") {
    return formData.feeType === "Subsidized" ? 20000 : 40000;
  }
  return 0;
};

export default Receipt;
