// Step 3 KYC Validation Schema
// PAN and Aadhaar validation rules

export const step3Schema = {
  panNumber: {
    required: 'PAN number is required',
    pattern: {
      value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      message: 'Invalid PAN format (e.g. ABCDE1234F)',
    },
  },
  aadhaarNumber: {
    required: 'Aadhaar number is required',
    pattern: {
      value: /^\d{12}$/,
      message: 'Aadhaar must be 12 digits',
    },
  },
  aadhaarConsent: {
    required: 'Consent is required to proceed',
  },
};