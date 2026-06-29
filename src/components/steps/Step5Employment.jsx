import { useForm } from 'react-hook-form';
import useFormStore from '../../store/formStore';

const Step5Employment = ({ submitRef }) => {
  const { formData, updateStepData } = useFormStore();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: formData.step5,
  });

  const onSubmit = (data) => updateStepData('step5', data);
  const employmentType = watch('employmentType');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

      {/* Employment Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Employment Type <span className="text-error">*</span>
        </label>
        <div className="flex flex-col gap-3">
          {['Salaried', 'Self-Employed', 'Business Owner'].map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer p-3 border rounded-lg hover:bg-blue-50">
              <input
                type="radio"
                value={type}
                {...register('employmentType', { required: 'Employment type is required' })}
                className="accent-primary"
              />
              <span className="font-medium">{type}</span>
            </label>
          ))}
        </div>
        {errors.employmentType && <p className="text-error text-sm mt-1" role="alert">{errors.employmentType.message}</p>}
      </div>

      {/* Years of Experience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Years of Experience <span className="text-error">*</span>
        </label>
        <input
          type="number"
          {...register('yearsOfExperience', {
            required: 'Required',
            min: { value: 0, message: 'Cannot be negative' },
            max: { value: 50, message: 'Maximum 50 years' },
          })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Total years of work experience"
        />
        {errors.yearsOfExperience && <p className="text-error text-sm mt-1" role="alert">{errors.yearsOfExperience.message}</p>}
      </div>

      {/* SALARIED fields */}
      {employmentType === 'Salaried' && (
        <div className="flex flex-col gap-4 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-primary">Salaried Details</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              {...register('companyName', { required: 'Company name is required' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              placeholder="Enter company name"
            />
            {errors.companyName && <p className="text-error text-sm mt-1" role="alert">{errors.companyName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Designation <span className="text-error">*</span>
            </label>
            <input
              type="text"
              {...register('designation', { required: 'Designation is required' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              placeholder="Your job designation"
            />
            {errors.designation && <p className="text-error text-sm mt-1" role="alert">{errors.designation.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Net Salary (INR) <span className="text-error">*</span>
            </label>
            <input
              type="number"
              {...register('monthlyNetSalary', {
                required: 'Salary is required',
                min: { value: 15000, message: 'Minimum salary is ₹15,000' },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              placeholder="Monthly net salary"
            />
            {errors.monthlyNetSalary && <p className="text-error text-sm mt-1" role="alert">{errors.monthlyNetSalary.message}</p>}
          </div>
        </div>
      )}

      {/* SELF-EMPLOYED fields */}
      {employmentType === 'Self-Employed' && (
        <div className="flex flex-col gap-4 bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-accent">Self-Employed Details</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              {...register('businessName', { required: 'Business name is required' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              placeholder="Your business name"
            />
            {errors.businessName && <p className="text-error text-sm mt-1" role="alert">{errors.businessName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Type <span className="text-error">*</span>
            </label>
            <select
              {...register('businessType', { required: 'Business type is required' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              <option value="">Select type</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Consultant">Consultant</option>
              <option value="Doctor">Doctor/Medical</option>
              <option value="Lawyer">Lawyer/Legal</option>
              <option value="CA">CA/Accountant</option>
              <option value="Other">Other Professional</option>
            </select>
            {errors.businessType && <p className="text-error text-sm mt-1" role="alert">{errors.businessType.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Income (INR) <span className="text-error">*</span>
            </label>
            <input
              type="number"
              {...register('monthlyIncome', {
                required: 'Monthly income is required',
                min: { value: 15000, message: 'Minimum ₹15,000' },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              placeholder="Average monthly income"
            />
            {errors.monthlyIncome && <p className="text-error text-sm mt-1" role="alert">{errors.monthlyIncome.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Turnover (INR) <span className="text-error">*</span>
            </label>
            <input
              type="number"
              {...register('annualTurnover', {
                required: 'Annual turnover is required',
                min: { value: 300000, message: 'Minimum ₹3,00,000' },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              placeholder="Annual turnover"
            />
            {errors.annualTurnover && <p className="text-error text-sm mt-1" role="alert">{errors.annualTurnover.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years in Business <span className="text-error">*</span>
            </label>
            <input
              type="number"
              {...register('yearsInBusiness', {
                required: 'Required',
                min: { value: 2, message: 'Minimum 2 years' },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              placeholder="Years in business"
            />
            {errors.yearsInBusiness && <p className="text-error text-sm mt-1" role="alert">{errors.yearsInBusiness.message}</p>}
          </div>
        </div>
      )}

      {/* BUSINESS OWNER fields */}
      {employmentType === 'Business Owner' && (
        <div className="flex flex-col gap-4 bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-semibold text-warning">Business Owner Details</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              {...register('businessName', { required: 'Business name is required' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              placeholder="Registered business name"
            />
            {errors.businessName && <p className="text-error text-sm mt-1" role="alert">{errors.businessName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Type <span className="text-error">*</span>
            </label>
            <select
              {...register('businessType', { required: 'Required' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              <option value="">Select type</option>
              <option value="Proprietorship">Proprietorship</option>
              <option value="Partnership">Partnership</option>
              <option value="Private Limited">Private Limited</option>
              <option value="Public Limited">Public Limited</option>
              <option value="LLP">LLP</option>
            </select>
            {errors.businessType && <p className="text-error text-sm mt-1" role="alert">{errors.businessType.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GST Number <span className="text-error">*</span>
            </label>
            <input
              type="text"
              {...register('gstNumber', {
                required: 'GST number is required',
                pattern: { value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, message: 'Invalid GST format' },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white uppercase"
              placeholder="27ABCDE1234F1Z5"
              maxLength={15}
            />
            {errors.gstNumber && <p className="text-error text-sm mt-1" role="alert">{errors.gstNumber.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Turnover (INR) <span className="text-error">*</span>
            </label>
            <input
              type="number"
              {...register('annualTurnover', {
                required: 'Required',
                min: { value: 300000, message: 'Minimum ₹3,00,000' },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              placeholder="Annual business turnover"
            />
            {errors.annualTurnover && <p className="text-error text-sm mt-1" role="alert">{errors.annualTurnover.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years in Business <span className="text-error">*</span>
            </label>
            <input
              type="number"
              {...register('yearsInBusiness', {
                required: 'Required',
                min: { value: 2, message: 'Minimum 2 years' },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              placeholder="Years in business"
            />
            {errors.yearsInBusiness && <p className="text-error text-sm mt-1" role="alert">{errors.yearsInBusiness.message}</p>}
          </div>
        </div>
      )}
       <button type="submit" ref={submitRef} className="hidden" />
    </form>
  );
};

export default Step5Employment;