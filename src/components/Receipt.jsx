import React from 'react';

const Receipt = ({ formData, photoPreview }) => {
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
            ` : '<div class="float-right ml-4 md:ml-6 mb-4 md:mb-6"><p class="text-gray-500 italic">No ID Photo Uploaded</p></div>'}
            <div>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Name:</strong> ${formData.name || 'N/A'}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Email:</strong> ${formData.email || 'N/A'}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Phone:</strong> ${formData.phone || 'N/A'}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Address:</strong> ${formData.address || 'N/A'}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Date of Birth:</strong> ${formData.dob || 'N/A'}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Course:</strong> ${formData.course || 'N/A'}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Semester:</strong> ${formData.semester || 'N/A'}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Fee Type:</strong> ${formData.feeType || 'N/A'}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Roll Number:</strong> ${formData.rollNumber || 'N/A'}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Payment Method:</strong> ${formData.paymentMethod || 'N/A'}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Fee Amount:</strong> ₹${getFeeAmount(formData)}</p>
              <p class="text-base md:text-lg"><strong class="inline-block w-28 md:w-36">Status:</strong> ${formData.paymentMethod === "UPI" ? "Paid" : "Verify your payment At college and stamp your {RECEIPT}"}</p>
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
    <div className="flex justify-center mt-6">
      <button
        onClick={openReceiptInNewPage}
        className="bg-green-500 text-white py-2 px-4 rounded shadow-lg hover:bg-green-600 transition duration-300"
      >
        Print Payment Receipt
      </button>
    </div>
  );
};

// Fee calculation logic
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