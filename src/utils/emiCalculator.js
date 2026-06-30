// EMI Calculator Utility
// Standard reducing-balance EMI formula
// Used in Step 8 pre-approval summary

export const INTEREST_RATES = {
  Personal: 10.5,
  Home: 8.5,
  Business: 14,
};

export const calculateEMI = (amount, tenure, loanType) => {
  const annualRate = INTEREST_RATES[loanType] || 10.5;
  const r = annualRate / 12 / 100;
  const emi = (amount * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1);
  return Math.round(emi);
};

export const calculateTotalAmount = (emi, tenure) => Math.round(emi * tenure);

export const calculateTotalInterest = (totalAmount, principal) => totalAmount - principal;

export const calculateProcessingFee = (amount) => {
  return Math.min(Math.max(amount * 0.01, 2000), 25000);
};

export const formatINR = (num) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
};