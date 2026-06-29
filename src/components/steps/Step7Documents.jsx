import { useState } from 'react';
import useFormStore from '../../store/formStore';
import { useState } from 'react';

const Step7Documents = () => {
  const { formData, updateStepData } = useFormStore();
  const loanType = formData.step1?.loanType;
  const employmentType = formData.step5?.employmentType;

  const [documents, setDocuments] = useState(formData.step7?.documents || {});
  const [signature, setSignature] = useState(formData.step7?.signature || null);
  const [errors, setErrors] = useState({});

  // कौन से documents required हैं
  const getRequiredDocs = () => {
    const docs = [
      { id: 'panCard', label: 'PAN Card Copy', accept: '.pdf,.jpg,.png', maxMB: 5 },
      { id: 'aadhaarFront', label: 'Aadhaar Card (Front)', accept: '.pdf,.jpg,.png', maxMB: 5 },
      { id: 'aadhaarBack', label: 'Aadhaar Card (Back)', accept: '.pdf,.jpg,.png', maxMB: 5 },
      { id: 'bankStatement', label: 'Bank Statement (Last 6 months)', accept: '.pdf', maxMB: 10 },
      { id: 'photograph', label: 'Passport Size Photograph', accept: '.jpg,.png', maxMB: 2 },
    ];

    if (employmentType === 'Salaried') {
      docs.push({ id: 'salarySlip1', label: 'Salary Slip (Month 1)', accept: '.pdf', maxMB: 5 });
      docs.push({ id: 'salarySlip2', label: 'Salary Slip (Month 2)', accept: '.pdf', maxMB: 5 });
      docs.push({ id: 'salarySlip3', label: 'Salary Slip (Month 3)', accept: '.pdf', maxMB: 5 });
    }

    if (employmentType === 'Self-Employed' || employmentType === 'Business Owner') {
      docs.push({ id: 'itr1', label: 'ITR (Year 1)', accept: '.pdf', maxMB: 5 });
      docs.push({ id: 'itr2', label: 'ITR (Year 2)', accept: '.pdf', maxMB: 5 });
    }

    if (loanType === 'Home') {
      docs.push({ id: 'propertyDocs', label: 'Property Documents', accept: '.pdf', maxMB: 10 });
    }

    if (loanType === 'Business') {
      docs.push({ id: 'businessReg', label: 'Business Registration Certificate', accept: '.pdf', maxMB: 5 });
      docs.push({ id: 'gstReturn1', label: 'GST Return (Quarter 1)', accept: '.pdf', maxMB: 5 });
      docs.push({ id: 'gstReturn2', label: 'GST Return (Quarter 2)', accept: '.pdf', maxMB: 5 });
    }

    return docs;
  };

  // File upload handle करें
  const handleFileUpload = (docId, file, maxMB) => {
    if (!file) return;

    // Size check
    if (file.size > maxMB * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [docId]: `File size must be under ${maxMB}MB` }));
      return;
    }

    setErrors(prev => ({ ...prev, [docId]: null }));

    const reader = new FileReader();
    reader.onload = (e) => {
      const newDocs = {
        ...documents,
        [docId]: {
          name: file.name,
          size: (file.size / 1024).toFixed(1) + ' KB',
          data: e.target.result,
          type: file.type,
        }
      };
      setDocuments(newDocs);
      updateStepData('step7', { documents: newDocs, signature });
    };
    reader.readAsDataURL(file);
  };

  // File remove करें
  const handleRemove = (docId) => {
    const newDocs = { ...documents };
    delete newDocs[docId];
    setDocuments(newDocs);
    updateStepData('step7', { documents: newDocs, signature });
  };

  // Signature handle करें
  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setSignature(ev.target.result);
      updateStepData('step7', { documents, signature: ev.target.result });
    };
    reader.readAsDataURL(file);
  };

  const requiredDocs = getRequiredDocs();

  return (
    <div className="flex flex-col gap-6">

      {/* Document Checklist */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-700 font-medium">
          📋 {requiredDocs.length} documents required for your{' '}
          {loanType} Loan application
        </p>
      </div>

      {/* Documents List */}
      {requiredDocs.map((doc) => (
        <div key={doc.id} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              {doc.label} <span className="text-red-500">*</span>
            </label>
            {/* Status Badge */}
            {documents[doc.id] ? (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                ✅ Uploaded
              </span>
            ) : (
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                ⏳ Pending
              </span>
            )}
          </div>

          {/* File uploaded दिखाएं */}
          {documents[doc.id] ? (
            <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  📄 {documents[doc.id].name}
                </p>
                <p className="text-xs text-gray-500">{documents[doc.id].size}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(doc.id)}
                className="text-red-500 text-sm hover:text-red-700"
              >
                ✕ Remove
              </button>
            </div>
          ) : (
            /* Upload area */
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
              <p className="text-gray-400 text-sm mb-2">
                📁 Click to upload ({doc.accept}) — Max {doc.maxMB}MB
              </p>
              <input
                type="file"
                accept={doc.accept}
                onChange={(e) => handleFileUpload(doc.id, e.target.files[0], doc.maxMB)}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          )}

          {errors[doc.id] && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors[doc.id]}
            </p>
          )}
        </div>
      ))}

      {/* E-Signature Section */}
      <div className="border-2 border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">
          ✍️ E-Signature <span className="text-red-500">*</span>
        </h3>

        {signature ? (
          <div className="flex flex-col gap-3">
            <img
              src={signature}
              alt="Your signature"
              className="border rounded-lg max-h-32 object-contain bg-white p-2"
            />
            <button
              type="button"
              onClick={() => {
                setSignature(null);
                updateStepData('step7', { documents, signature: null });
              }}
              className="text-red-500 text-sm hover:text-red-700 text-left"
            >
              ✕ Clear Signature
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <p className="text-gray-500 text-sm mb-3">
                Upload your signature image (JPG/PNG)
              </p>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleSignatureUpload}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700"
              />
            </div>
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Upload Progress</span>
          <span>{Object.keys(documents).length}/{requiredDocs.length} documents</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${(Object.keys(documents).length / requiredDocs.length) * 100}%` }}
          />
        </div>
      </div>

    </div>
  );
};

export default Step7Documents;