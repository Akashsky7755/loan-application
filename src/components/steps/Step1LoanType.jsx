import { useForm } from 'react-hook-form';
import useFormStore from '../../store/formStore';

const Step1LoanType = ({ submitRef }) => {
  const { formData, updateStepData } = useFormStore();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: formData.step1,
  });

  const loanType = watch('loanType');

  const getLoanAmountMax = () => {
    if (loanType === 'Personal') return 1000000;
    if (loanType === 'Home') return 10000000;
    if (loanType === 'Business') return 5000000;
    return 1000000;
  };

  const getTenureOptions = () => {
    if (loanType === 'Personal') return [12, 24, 36, 48, 60];
    if (loanType === 'Home') return [60, 120, 180, 240, 300, 360];
    if (loanType === 'Business') return [12, 24, 36, 60, 84, 120];
    return [12, 24, 36];
  };

  const getLoanPurposes = () => {
    if (loanType === 'Personal') return ['Medical', 'Education', 'Travel', 'Wedding', 'Other'];
    if (loanType === 'Home') return ['Purchase', 'Construction', 'Renovation', 'Plot Purchase'];
    if (loanType === 'Business') return ['Working Capital', 'Equipment', 'Expansion', 'Inventory'];
    return [];
  };

  const onSubmit = (data) => {
    updateStepData('step1', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

      {/* Loan Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Loan Type <span className="text-error">*</span>
        </label>
        <div className="flex gap-4">
          {['Personal', 'Home', 'Business'].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={type}
                {...register('loanType', { required: 'Loan type is required' })}
                className="accent-primary"
              />
              <span className="text-gray-700">{type} Loan</span>
            </label>
          ))}
        </div>
        {errors.loanType && (
          <p className="text-error text-sm mt-1" role="alert">{errors.loanType.message}</p>
        )}
      </div>

      {/* Loan Amount */}
      {loanType && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Amount (INR) <span className="text-error">*</span>
          </label>
          <input
            type="number"
            {...register('loanAmount', {
              required: 'Loan amount is required',
              min: { value: 50000, message: 'Minimum amount is ₹50,000' },
              max: { value: getLoanAmountMax(), message: `Maximum ₹${getLoanAmountMax().toLocaleString('en-IN')}` },
            })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter loan amount"
          />
          {errors.loanAmount && (
            <p className="text-error text-sm mt-1" role="alert">{errors.loanAmount.message}</p>
          )}
        </div>
      )}

      {/* Loan Tenure */}
      {loanType && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Tenure <span className="text-error">*</span>
          </label>
          <select
            {...register('loanTenure', { required: 'Tenure is required' })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select tenure</option>
            {getTenureOptions().map((month) => (
              <option key={month} value={month}>{month} months</option>
            ))}
          </select>
          {errors.loanTenure && (
            <p className="text-error text-sm mt-1" role="alert">{errors.loanTenure.message}</p>
          )}
        </div>
      )}

      {/* Loan Purpose */}
      {loanType && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Purpose <span className="text-error">*</span>
          </label>
          <select
            {...register('loanPurpose', { required: 'Purpose is required' })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select purpose</option>
            {getLoanPurposes().map((purpose) => (
              <option key={purpose} value={purpose}>{purpose}</option>
            ))}
          </select>
          {errors.loanPurpose && (
            <p className="text-error text-sm mt-1" role="alert">{errors.loanPurpose.message}</p>
          )}
        </div>
      )}

      {/* Referral Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Referral Code (Optional)
        </label>
        <input
          type="text"
          {...register('referralCode', {
            pattern: { value: /^[a-zA-Z0-9]{6,10}$/, message: 'Must be 6-10 alphanumeric characters' },
          })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter referral code (optional)"
        />
        {errors.referralCode && (
          <p className="text-error text-sm mt-1" role="alert">{errors.referralCode.message}</p>
        )}
      </div>

      {/* Hidden Submit Button */}
      <button type="submit" ref={submitRef} className="hidden" />

    </form>
  );
};

export default Step1LoanType;