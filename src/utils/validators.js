// PAN Validation
export const validatePAN = (value) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (!panRegex.test(value)) return 'Invalid PAN format (e.g. ABCDE1234F)';
  const validTypes = ['P', 'C', 'H', 'A', 'B', 'G', 'J', 'L', 'F', 'T'];
  if (!validTypes.includes(value[3])) {
    return 'PAN 4th character must indicate entity type (P for Individual, C for Company, etc.)';
  }
  return true;
};

// Aadhaar Verhoeff Checksum
export const verhoeffValidate = (num) => {
  const d = [
    [0,1,2,3,4,5,6,7,8,9],
    [1,2,3,4,0,6,7,8,9,5],
    [2,3,4,0,1,7,8,9,5,6],
    [3,4,0,1,2,8,9,5,6,7],
    [4,0,1,2,3,9,5,6,7,8],
    [5,9,8,7,6,0,4,3,2,1],
    [6,5,9,8,7,1,0,4,3,2],
    [7,6,5,9,8,2,1,0,4,3],
    [8,7,6,5,9,3,2,1,0,4],
    [9,8,7,6,5,4,3,2,1,0],
  ];
  const p = [
    [0,1,2,3,4,5,6,7,8,9],
    [1,5,7,6,2,8,3,0,9,4],
    [5,8,0,3,7,9,6,1,4,2],
    [8,9,1,6,0,4,3,5,2,7],
    [9,4,5,3,1,2,6,8,7,0],
    [4,2,8,6,5,7,3,9,0,1],
    [2,7,9,3,8,0,6,4,1,5],
    [7,0,4,6,9,1,3,2,5,8],
  ];
  const digits = num.split('').reverse().map(Number);
  let check = 0;
  for (let i = 0; i < digits.length; i++) {
    check = d[check][p[i % 8][digits[i]]];
  }
  return check === 0;
};

export const validateAadhaar = (value) => {
  if (!/^\d{12}$/.test(value)) return 'Aadhaar must be 12 digits';
  if (!verhoeffValidate(value)) return 'Invalid Aadhaar number (checksum failed)';
  return true;
};

// EMI Calculator
export const calculateEMI = (principal, tenure, annualRate) => {
  const r = annualRate / 12 / 100;
  const emi = (principal * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1);
  return Math.round(emi);
};

// Indian number format
export const formatINR = (num) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
};

// GST Validation
export const validateGST = (value) => {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (!gstRegex.test(value)) return 'Invalid GST format (e.g. 27ABCDE1234F1Z5)';
  return true;
};

// Mobile validation
export const validateMobile = (value) => {
  if (!/^[6-9]\d{9}$/.test(value)) return 'Enter valid 10-digit mobile number starting with 6-9';
  return true;
};