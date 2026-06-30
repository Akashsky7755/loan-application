// Step 5 Validation Schema
// Conditional schema based on employment type

export const getSalariedSchema = () => ({
  companyName: { required: 'Company name is required' },
  designation: { required: 'Designation is required' },
  monthlyNetSalary: {
    required: 'Salary is required',
    min: { value: 15000, message: 'Minimum ₹15,000' },
  },
});

export const getSelfEmployedSchema = () => ({
  businessName: { required: 'Business name is required' },
  businessType: { required: 'Business type is required' },
  monthlyIncome: { required: 'Monthly income is required' },
  annualTurnover: {
    required: 'Annual turnover is required',
    min: { value: 300000, message: 'Minimum ₹3,00,000' },
  },
  yearsInBusiness: {
    required: 'Required',
    min: { value: 2, message: 'Minimum 2 years' },
  },
});

export const getBusinessOwnerSchema = () => ({
  businessName: { required: 'Business name is required' },
  gstNumber: { required: 'GST number is required' },
  annualTurnover: {
    required: 'Required',
    min: { value: 300000, message: 'Minimum ₹3,00,000' },
  },
});