import { create } from 'zustand';
import { create } from 'zustand';

const useFormStore = create((set) => ({
  currentStep: 1,
  formData: {
    step1: {},
    step2: {},
    step3: {},
    step4: {},
    step5: {},
    step6: {},
    step7: {},
    step8: {},
  },

  setCurrentStep: (step) => set({ currentStep: step }),

  updateStepData: (step, data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [step]: { ...state.formData[step], ...data },
      },
    })),

  resetForm: () =>
    set({
      currentStep: 1,
      formData: {
        step1: {}, step2: {}, step3: {},
        step4: {}, step5: {}, step6: {},
        step7: {}, step8: {},
      },
    }),
}));

export default useFormStore;