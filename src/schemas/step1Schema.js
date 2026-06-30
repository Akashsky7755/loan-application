// Step 1 Validation Schema
// Zod schema for loan type, amount, tenure, purpose

export const getStep1Schema = (loanType) => {
  const limits = {
    Personal: { min: 50000, max: 1000000 },
    Home: { min: 50000, max: 10000000 },
    Business: { min: 50000, max: 5000000 },
  };

  return {
    loanType: { required: 'Loan type is required' },
    loanAmount: {
      required: 'Loan amount is required',
      min: { value: 50000, message: 'Minimum ₹50,000' },
      max: {
        value: limits[loanType]?.max || 1000000,
        message: `Maximum ₹${(limits[loanType]?.max || 1000000).toLocaleString('en-IN')}`,
      },
    },
    loanTenure: { required: 'Tenure is required' },
    loanPurpose: { required: 'Purpose is required' },
  };
};