import { useForm } from 'react-hook-form';
import useFormStore from '../../store/formStore';
import { useForm } from 'react-hook-form';

const Step6CoApplicant = ({ submitRef }) => {
  const { formData, updateStepData } = useFormStore();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: formData.step6,
  });

  const onSubmit = (data) => updateStepData('step6', data);
  const hasCoApplicant = watch('hasCoApplicant');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

      {/* Co-Applicant Required Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800 font-medium">
          ℹ️ Co-applicant is required based on your loan type/amount.
        </p>
      </div>

      {/* Has Co-Applicant */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Do you have a Co-Applicant? <span className="text-error">*</span>
        </label>
        <div className="flex gap-4">
          {['Yes', 'No'].map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-blue-50 flex-1 justify-center">
              <input
                type="radio"
                value={option}
                {...register('hasCoApplicant', { required: 'Please select an option' })}
                className="accent-primary"
              />
              <span className="font-medium">{option}</span>
            </label>
          ))}
        </div>
        {errors.hasCoApplicant && (
          <p className="text-error text-sm mt-1" role="alert">{errors.hasCoApplicant.message}</p>
        )}
      </div>

      {/* Co-Applicant Details */}
      {hasCoApplicant === 'Yes' && (
        <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold text-primary">Co-Applicant Details</h3>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              {...register('coApplicantName', { required: 'Name is required' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              placeholder="Co-applicant full name"
            />
            {errors.coApplicantName && (
              <p className="text-error text-sm mt-1" role="alert">{errors.coApplicantName.message}</p>
            )}
          </div>

          {/* Relationship */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relationship <span className="text-error">*</span>
            </label>
            <select
              {...register('relationship', { required: 'Relationship is required' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              <option value="">Select relationship</option>
              <option value="Spouse">Spouse</option>
              <option value="Parent">Parent</option>
              <option value="Sibling">Sibling</option>
              <option value="Business Partner">Business Partner</option>
            </select>
            {errors.relationship && (
              <p className="text-error text-sm mt-1" role="alert">{errors.relationship.message}</p>
            )}
          </div>

          {/* PAN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PAN Number <span className="text-error">*</span>
            </label>
            <input
              type="text"
              {...register('coApplicantPAN', {
                required: 'PAN is required',
                pattern: {
                  value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                  message: 'Invalid PAN format (e.g. ABCDE1234F)',
                },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white uppercase"
              placeholder="ABCDE1234F"
              maxLength={10}
            />
            {errors.coApplicantPAN && (
              <p className="text-error text-sm mt-1" role="alert">{errors.coApplicantPAN.message}</p>
            )}
          </div>

          {/* Monthly Income */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Income (INR) <span className="text-error">*</span>
            </label>
            <input
              type="number"
              {...register('coApplicantIncome', {
                required: 'Income is required',
                min: { value: 0, message: 'Cannot be negative' },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              placeholder="Co-applicant monthly income"
            />
            {errors.coApplicantIncome && (
              <p className="text-error text-sm mt-1" role="alert">{errors.coApplicantIncome.message}</p>
            )}
          </div>

          {/* Consent */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('coApplicantConsent', {
                  required: 'Co-applicant consent is required',
                })}
                className="mt-1 accent-primary"
              />
              <span className="text-sm text-gray-700">
                I confirm that the co-applicant has given consent to apply jointly for this loan
                and authorizes LendSwift to verify their details and check credit bureau records.
              </span>
            </label>
            {errors.coApplicantConsent && (
              <p className="text-error text-sm mt-1" role="alert">{errors.coApplicantConsent.message}</p>
            )}
          </div>
        </div>
      )}

      {/* No Co-Applicant Message */}
      {hasCoApplicant === 'No' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            ⚠️ Note: Without a co-applicant, your loan eligibility may be limited.
            The final approval depends on your individual income and credit score.
          </p>
        </div>
      )}
      <button type="submit" ref={submitRef} className="hidden" />
    </form>
  );
};

export default Step6CoApplicant;