# LendSwift Architecture Documentation

## Wizard Pattern
The Wizard component maintains step registry and handles:
- Step navigation (next/prev)
- Step visibility logic (Step 6 conditional)
- Progress tracking
- Auto-save integration

## State Management (Zustand)
Central store holds formData for all 8 steps.
Data persists across step navigation without prop drilling.

## Auto-Save Flow
1. useAutoSave hook runs every 30 seconds
2. Form state serialized to JSON
3. Encrypted with AES-256-GCM via Web Crypto API
4. Stored in LocalStorage with metadata
5. On page load, useFormPersistence checks for saved draft
6. Resume/Start Fresh modal shown if draft exists

## Cross-Step Dependencies
- Step 1 loanType → Step 5 employment validation
- Step 1 loanAmount → Step 6 visibility
- Step 1 loanType → Step 6 visibility (Home always shows)
- Step 5 employmentType → Step 7 document requirements
- Step 5 income → Step 8 EMI ratio check

## EMI Formula
EMI = P × r × (1+r)^n / ((1+r)^n – 1)
- P = Principal
- r = Monthly rate (annual/12/100)
- n = Tenure months