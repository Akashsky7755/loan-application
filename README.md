# LendSwift - Multi-Step Loan Application Form

## Live Demo
🌐 https://loan-application-phi.vercel.app

## GitHub Repository
📁 https://github.com/Akashsky7755/loan-application

## Project Overview
Production-grade 8-step loan application form built for
LendSwift, a fictional Indian digital lending startup.
Handles 3 loan types with cross-step validation,
auto-save, and document upload.

## Features Implemented
- ✅ 8-step wizard form (Step 1-8)
- ✅ 3 loan types - Personal, Home, Business
- ✅ PAN/Aadhaar verification simulation
- ✅ PIN code auto-fill (city/state)
- ✅ Auto-save every 30 seconds (AES-256 encrypted)
- ✅ Resume application on page refresh
- ✅ Document upload with preview
- ✅ E-signature capture
- ✅ Pre-approval summary with EMI calculation
- ✅ Conditional Step 6 (Co-Applicant)
- ✅ Cross-step validation dependencies
- ✅ Mobile responsive design

## Tech Stack
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| React Hook Form | Form Management |
| Zustand | State Management |
| Tailwind CSS | Styling |
| Vite | Build Tool |
| Web Crypto API | Encryption |

## Setup Instructions
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Architecture Decisions

### 1. Wizard Pattern
Wizard component orchestrates all 8 steps with
navigation, validation gating, and progress tracking.

### 2. Zustand Store
Central store holds all form data across steps,
preventing data loss on step navigation.

### 3. React Hook Form
Used uncontrolled components internally for
performance optimization with 50+ fields.

### 4. Auto-Save
LocalStorage with AES-256-GCM encryption via
Web Crypto API. Saves every 30 seconds with
72-hour TTL and resume functionality.

## Project Structure

src/

├── components/

│   ├── steps/

│   │   ├── Step1LoanType.jsx

│   │   ├── Step2PersonalInfo.jsx

│   │   ├── Step3KYC.jsx

│   │   ├── Step4Address.jsx

│   │   ├── Step5Employment.jsx

│   │   ├── Step6CoApplicant.jsx

│   │   ├── Step7Documents.jsx

│   │   └── Step8Review.jsx

│   └── wizard/

│       └── Wizard.jsx

├── hooks/

│   ├── useAutoSave.js

│   └── useFormPersistence.js

└── store/

└── formStore.js


## Loan Types & Rules
| Loan Type | Max Amount | Tenure | Interest Rate |
|-----------|-----------|--------|---------------|
| Personal | ₹10,00,000 | 12-60 months | 10.5% p.a. |
| Home | ₹1,00,00,000 | 60-360 months | 8.5% p.a. |
| Business | ₹50,00,000 | 12-120 months | 14% p.a. |

## EMI Formula
EMI = P × r × (1+r)^n / ((1+r)^n – 1)
- P = Principal Amount
- r = Monthly Interest Rate
- n = Tenure in Months
## Validation Rules
- PAN: AAAAA9999A format with entity type check
- Aadhaar: 12 digits with Verhoeff checksum
- GST: 15-character format
- Mobile: 10 digits starting with 6-9