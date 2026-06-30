export const LOAN_TYPES = {
  PERSONAL: 'Personal',
  HOME: 'Home',
  BUSINESS: 'Business',
};

export const INTEREST_RATES = {
  Personal: 10.5,
  Home: 8.5,
  Business: 14,
};

export const LOAN_LIMITS = {
  Personal: { min: 50000, max: 1000000 },
  Home: { min: 50000, max: 10000000 },
  Business: { min: 50000, max: 5000000 },
};

export const TENURE_OPTIONS = {
  Personal: [12, 24, 36, 48, 60],
  Home: [60, 120, 180, 240, 300, 360],
  Business: [12, 24, 36, 60, 84, 120],
};

export const LOAN_PURPOSES = {
  Personal: ['Medical', 'Education', 'Travel', 'Wedding', 'Other'],
  Home: ['Purchase', 'Construction', 'Renovation', 'Plot Purchase'],
  Business: ['Working Capital', 'Equipment', 'Expansion', 'Inventory'],
};

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

export const MAX_FILE_SIZE_MB = 5;
export const AUTO_SAVE_INTERVAL = 30000;
export const DRAFT_TTL_HOURS = 72;

export const STEP6_THRESHOLDS = {
  Personal: 500000,
  Business: 2000000,
};

export const PROCESSING_FEE = {
  percentage: 0.01,
  min: 2000,
  max: 25000,
};
export const DOCUMENT_TYPES = {
  PAN_CARD: 'panCard',
  AADHAAR_FRONT: 'aadhaarFront',
  AADHAAR_BACK: 'aadhaarBack',
  BANK_STATEMENT: 'bankStatement',
  PHOTOGRAPH: 'photograph',
};