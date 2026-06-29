import { useRef } from 'react';
import Step1LoanType from '../steps/Step1LoanType';
import Step2PersonalInfo from '../steps/Step2PersonalInfo';
import Step3KYC from '../steps/Step3KYC';
import Step4Address from '../steps/Step4Address';
import Step5Employment from '../steps/Step5Employment';
import Step6CoApplicant from '../steps/Step6CoApplicant';
import Step7Documents from '../steps/Step7Documents';
import Step8Review from '../steps/Step8Review';
import useFormStore from '../../store/formStore';
import useAutoSave from '../../hooks/useAutoSave';
import useFormPersistence from '../../hooks/useFormPersistence';
import { useRef } from 'react';

const STEPS = [
  { id: 1, title: 'Loan Type' },
  { id: 2, title: 'Personal Info' },
  { id: 3, title: 'KYC' },
  { id: 4, title: 'Address' },
  { id: 5, title: 'Employment' },
  { id: 6, title: 'Co-Applicant' },
  { id: 7, title: 'Documents' },
  { id: 8, title: 'Review' },
];

const Wizard = () => {
  const { currentStep, setCurrentStep, formData } = useFormStore();
  const submitRef = useRef(null);

  // Auto-Save hook
  const { saveToStorage } = useAutoSave(formData, currentStep);

  // Resume Modal hook
  const { showResumeModal, draftInfo, handleResume, handleStartFresh } = useFormPersistence();

  const isStep6Active = () => {
    const loanType = formData.step1?.loanType;
    const loanAmount = Number(formData.step1?.loanAmount);
    if (loanType === 'Home') return true;
    if (loanType === 'Personal' && loanAmount > 500000) return true;
    if (loanType === 'Business' && loanAmount > 2000000) return true;
    return false;
  };

  const goNext = () => {
    if (submitRef.current) {
      submitRef.current.click();
    }
    setTimeout(() => {
      const nextStep = currentStep + 1;
      if (!isStep6Active() && nextStep === 6) {
        setCurrentStep(7);
      } else {
        setCurrentStep(Math.min(nextStep, 8));
      }
    }, 100);
  };

  const goPrev = () => {
    const prevStep = currentStep - 1;
    if (!isStep6Active() && prevStep === 6) {
      setCurrentStep(5);
    } else {
      setCurrentStep(Math.max(prevStep, 1));
    }
  };

  const progress = ((currentStep - 1) / 7) * 100;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ===== RESUME MODAL ===== */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              📋 Saved Application Found!
            </h2>
            <p className="text-gray-600 mb-2">
              You have a saved <strong>{draftInfo?.loanType}</strong> loan application.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Last saved: {draftInfo?.timestamp
                ? new Date(draftInfo.timestamp).toLocaleString()
                : 'Unknown'}
              {' '}(Step {draftInfo?.step})
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleResume}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90"
              >
                ▶️ Resume Application
              </button>
              <button
                onClick={handleStartFresh}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
              >
                🔄 Start Fresh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== HEADER ===== */}
      <div className="bg-primary text-white py-4 px-6">
        <h1 className="text-2xl font-bold">LendSwift</h1>
        <p className="text-sm opacity-80">Loan Application</p>
      </div>

      {/* ===== PROGRESS BAR ===== */}
      <div className="bg-white shadow px-6 py-4">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Step {currentStep} of 8</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-3">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={`text-xs text-center ${
                step.id === currentStep
                  ? 'text-primary font-bold'
                  : step.id < currentStep
                  ? 'text-accent'
                  : 'text-gray-400'
              }`}
            >
              {step.id}
            </div>
          ))}
        </div>
      </div>

      {/* ===== STEP CONTENT ===== */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-primary mb-6">
            Step {currentStep}:{' '}
            {STEPS.find((s) => s.id === currentStep)?.title}
          </h2>

          {currentStep === 1 && <Step1LoanType submitRef={submitRef} />}
          {currentStep === 2 && <Step2PersonalInfo submitRef={submitRef} />}
          {currentStep === 3 && <Step3KYC submitRef={submitRef} />}
          {currentStep === 4 && <Step4Address submitRef={submitRef} />}
          {currentStep === 5 && <Step5Employment submitRef={submitRef} />}
          {currentStep === 6 && <Step6CoApplicant submitRef={submitRef} />}
          {currentStep === 7 && <Step7Documents />}
          {currentStep === 8 && <Step8Review />}
        </div>

        {/* ===== NAVIGATION BUTTONS ===== */}
        <div className="flex justify-between mt-6">
          <button
            onClick={goPrev}
            disabled={currentStep === 1}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300"
          >
            Previous
          </button>
          {currentStep < 8 && (
            <button
              onClick={goNext}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90"
            >
              Next
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default Wizard;