import { useState } from 'react';
import Step2PersonalInfo from '../steps/Step2PersonalInfo';
import Step1LoanType from '../steps/Step1LoanType';
import useFormStore from '../../store/formStore';

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

    const isStep6Active = () => {
        const { loanType, loanAmount } = formData.step1;
        if (loanType === 'Home') return true;
        if (loanType === 'Personal' && loanAmount > 500000) return true;
        if (loanType === 'Business' && loanAmount > 2000000) return true;
        return false;
    };

    const activeSteps = STEPS.filter(
        (step) => step.id !== 6 || isStep6Active()
    );

    const goNext = () => {
        const nextStep = currentStep + 1;
        if (!isStep6Active() && nextStep === 6) {
            setCurrentStep(7);
        } else {
            setCurrentStep(Math.min(nextStep, 8));
        }
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
            {/* Header */}
            <div className="bg-primary text-white py-4 px-6">
                <h1 className="text-2xl font-bold">LendSwift</h1>
                <p className="text-sm opacity-80">Loan Application</p>
            </div>

            {/* Progress Bar */}
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
                {/* Step Names */}
                <div className="flex justify-between mt-3">
                    {STEPS.map((step) => (
                        <div
                            key={step.id}
                            className={`text-xs text-center ${step.id === currentStep
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

            {/* Step Content */}
            <div className="max-w-2xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-primary mb-6">
                        Step {currentStep}:{' '}
                        {STEPS.find((s) => s.id === currentStep)?.title}
                    </h2>

                    {/* Placeholder - बाद में actual step components आएंगे */}
                    {currentStep === 1 && <Step1LoanType />}
                    {currentStep === 2 && <Step2PersonalInfo />}
                    {currentStep > 2 && (
                        <div className="text-gray-500 text-center py-12">
                            Step {currentStep} content coming soon...
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={goPrev}
                        disabled={currentStep === 1}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300"
                    >
                        Previous
                    </button>
                    <button
                        onClick={goNext}
                        disabled={currentStep === 8}
                        className="px-6 py-2 bg-primary text-white rounded-lg disabled:opacity-50 hover:opacity-90"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Wizard;