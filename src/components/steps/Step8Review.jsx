import { useState } from 'react';
import useFormStore from '../../store/formStore';

const Step8Review = () => {
  const { formData } = useFormStore();
  const [consents, setConsents] = useState({
    accuracy: false,
    creditCheck: false,
    termsConditions: false,
    communications: false,
  });
  const [submitted, setSubmitted] = useState(false);

  // EMI Calculate करें
  const calculateEMI = () => {
    const amount = Number(formData.step1?.loanAmount) || 0;
    const tenure = Number(formData.step1?.loanTenure) || 12;
    const loanType = formData.step1?.loanType;

    let annualRate = 10.5;
    if (loanType === 'Home') annualRate = 8.5;
    if (loanType === 'Business') annualRate = 14;

    const r = annualRate / 12 / 100;
    const emi = (amount * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1);
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - amount;
    const processingFee = Math.min(Math.max(amount * 0.01, 2000), 25000);

    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      processingFee: Math.round(processingFee),
      annualRate,
    };
  };

  // Indian number format
  const formatINR = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const emiData = calculateEMI();

  // Application Reference Number
  const refNumber = `LS${Date.now().toString().slice(-8)}`;

  // सभी consents checked हैं?
  const allConsentsChecked = Object.values(consents).every(Boolean);

  const handleSubmit = () => {
    if (!allConsentsChecked) return;
    setSubmitted(true);
  };

  // Success Modal
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-6">
        <div className="text-6xl">🎉</div>
        <h2 className="text-2xl font-bold text-green-600">Application Submitted!</h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center w-full">
          <p className="text-gray-600 mb-2">Your Application Reference Number</p>
          <p className="text-2xl font-bold text-green-700">{refNumber}</p>
        </div>
        <p className="text-gray-500 text-sm text-center">
          We will contact you within 2-3 business days on your registered
          mobile number and email.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Pre-Approval Summary Card */}
      <div className="bg-blue-600 text-white rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">📊 Pre-Approval Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-blue-200 text-xs">Loan Amount</p>
            <p className="font-bold text-lg">
              {formatINR(formData.step1?.loanAmount || 0)}
            </p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Tenure</p>
            <p className="font-bold text-lg">
              {formData.step1?.loanTenure || 0} months
            </p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Interest Rate</p>
            <p className="font-bold text-lg">{emiData.annualRate}% p.a.</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Monthly EMI</p>
            <p className="font-bold text-lg">{formatINR(emiData.emi)}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Total Amount</p>
            <p className="font-bold">{formatINR(emiData.totalAmount)}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Processing Fee</p>
            <p className="font-bold">{formatINR(emiData.processingFee)}</p>
          </div>
        </div>
      </div>

      {/* Step 1 Review */}
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">📋 Loan Details</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500">Loan Type</p>
            <p className="font-medium">{formData.step1?.loanType || '-'}</p>
          </div>
          <div>
            <p className="text-gray-500">Purpose</p>
            <p className="font-medium">{formData.step1?.loanPurpose || '-'}</p>
          </div>
        </div>
      </div>

      {/* Step 2 Review */}
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">👤 Personal Details</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500">Full Name</p>
            <p className="font-medium">{formData.step2?.fullName || '-'}</p>
          </div>
          <div>
            <p className="text-gray-500">Date of Birth</p>
            <p className="font-medium">{formData.step2?.dateOfBirth || '-'}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{formData.step2?.email || '-'}</p>
          </div>
          <div>
            <p className="text-gray-500">Mobile</p>
            <p className="font-medium">{formData.step2?.mobile || '-'}</p>
          </div>
        </div>
      </div>

      {/* Step 3 Review */}
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">🪪 KYC Details</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500">PAN Number</p>
            <p className="font-medium">
              {formData.step3?.panNumber
                ? `XXXXX${formData.step3.panNumber.slice(-5)}`
                : '-'}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Aadhaar</p>
            <p className="font-medium">
              {formData.step3?.aadhaarNumber
                ? `XXXXXXXX${formData.step3.aadhaarNumber.slice(-4)}`
                : '-'}
            </p>
          </div>
        </div>
      </div>

      {/* Step 4 Review */}
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">🏠 Address Details</h3>
        </div>
        <div className="text-sm">
          <p className="text-gray-500">Current Address</p>
          <p className="font-medium">
            {formData.step4?.addressLine1 || '-'},{' '}
            {formData.step4?.city || '-'},{' '}
            {formData.step4?.state || '-'} -{' '}
            {formData.step4?.pinCode || '-'}
          </p>
        </div>
      </div>

      {/* Step 5 Review */}
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">💼 Employment Details</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500">Employment Type</p>
            <p className="font-medium">{formData.step5?.employmentType || '-'}</p>
          </div>
          <div>
            <p className="text-gray-500">
              {formData.step5?.employmentType === 'Salaried'
                ? 'Monthly Salary'
                : 'Monthly Income'}
            </p>
            <p className="font-medium">
              {formatINR(
                formData.step5?.monthlyNetSalary ||
                formData.step5?.monthlyIncome || 0
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Documents Status */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">📁 Documents</h3>
        <div className="text-sm">
          {formData.step7?.documents &&
          Object.keys(formData.step7.documents).length > 0 ? (
            <div className="flex flex-col gap-2">
              {Object.entries(formData.step7.documents).map(([key, doc]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>{doc.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-red-500">No documents uploaded</p>
          )}
        </div>
      </div>

      {/* E-Signature Display */}
      {formData.step7?.signature && (
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3">✍️ E-Signature</h3>
          <img
            src={formData.step7.signature}
            alt="Applicant signature"
            className="border rounded max-h-24 object-contain bg-white p-2"
          />
        </div>
      )}

      {/* 4 Consent Checkboxes */}
      <div className="border rounded-lg p-4 flex flex-col gap-4">
        <h3 className="font-semibold text-gray-800">📝 Declarations & Consent</h3>

        {[
          {
            key: 'accuracy',
            text: 'I confirm that all information provided in this application is true, accurate and complete to the best of my knowledge.',
          },
          {
            key: 'creditCheck',
            text: 'I authorise LendSwift to check my credit score via CIBIL/Equifax for the purpose of this loan application.',
          },
          {
            key: 'termsConditions',
            text: 'I have read and agree to the Terms & Conditions and Privacy Policy of LendSwift.',
          },
          {
            key: 'communications',
            text: 'I consent to receive communications (SMS, Email, WhatsApp) regarding this loan application and related offers.',
          },
        ].map((consent) => (
          <label
            key={consent.key}
            className="flex items-start gap-3 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={consents[consent.key]}
              onChange={(e) =>
                setConsents((prev) => ({
                  ...prev,
                  [consent.key]: e.target.checked,
                }))
              }
              className="mt-1 w-4 h-4"
            />
            <span className="text-sm text-gray-700">{consent.text}</span>
          </label>
        ))}
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!allConsentsChecked}
        className={`w-full py-4 rounded-lg font-bold text-white text-lg transition-all ${
          allConsentsChecked
            ? 'bg-green-600 hover:bg-green-700 shadow-lg'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        {allConsentsChecked
          ? '🚀 Submit Application'
          : '⚠️ Please accept all declarations'}
      </button>

    </div>
  );
};

export default Step8Review;