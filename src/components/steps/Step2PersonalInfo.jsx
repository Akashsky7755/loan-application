import { useForm } from 'react-hook-form';
import useFormStore from '../../store/formStore';
import { useForm } from 'react-hook-form';

const Step2PersonalInfo = ({ submitRef }) => {
  const { formData, updateStepData } = useFormStore();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: formData.step2,
  });

  const onSubmit = (data) => updateStepData('step2', data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name (as per PAN) <span className="text-error">*</span>
        </label>
        <input
          type="text"
          {...register('fullName', {
            required: 'Full name is required',
            minLength: { value: 2, message: 'Minimum 2 characters' },
            maxLength: { value: 100, message: 'Maximum 100 characters' },
            pattern: { value: /^[a-zA-Z\s.]+$/, message: 'Only letters, spaces and periods allowed' },
          })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your full name"
        />
        {errors.fullName && <p className="text-error text-sm mt-1" role="alert">{errors.fullName.message}</p>}
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date of Birth <span className="text-error">*</span>
        </label>
        <input
          type="date"
          {...register('dateOfBirth', {
            required: 'Date of birth is required',
            validate: (value) => {
              const dob = new Date(value);
              const today = new Date();
              const age = today.getFullYear() - dob.getFullYear();
              const monthDiff = today.getMonth() - dob.getMonth();
              const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())
                ? age - 1 : age;
              if (actualAge < 21) return 'Minimum age is 21 years';
              if (actualAge > 65) return 'Maximum age is 65 years';
              return true;
            },
          })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.dateOfBirth && <p className="text-error text-sm mt-1" role="alert">{errors.dateOfBirth.message}</p>}
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gender <span className="text-error">*</span>
        </label>
        <div className="flex gap-6">
          {['Male', 'Female', 'Other'].map((g) => (
            <label key={g} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={g}
                {...register('gender', { required: 'Gender is required' })}
                className="accent-primary"
              />
              <span>{g}</span>
            </label>
          ))}
        </div>
        {errors.gender && <p className="text-error text-sm mt-1" role="alert">{errors.gender.message}</p>}
      </div>

      {/* Marital Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Marital Status <span className="text-error">*</span>
        </label>
        <select
          {...register('maritalStatus', { required: 'Marital status is required' })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </select>
        {errors.maritalStatus && <p className="text-error text-sm mt-1" role="alert">{errors.maritalStatus.message}</p>}
      </div>

      {/* Father's Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Father's Name <span className="text-error">*</span>
        </label>
        <input
          type="text"
          {...register('fatherName', {
            required: "Father's name is required",
            pattern: { value: /^[a-zA-Z\s.]+$/, message: 'Only letters allowed' },
          })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter father's name"
        />
        {errors.fatherName && <p className="text-error text-sm mt-1" role="alert">{errors.fatherName.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email <span className="text-error">*</span>
        </label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' },
          })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-error text-sm mt-1" role="alert">{errors.email.message}</p>}
      </div>

      {/* Mobile Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mobile Number <span className="text-error">*</span>
        </label>
        <input
          type="tel"
          {...register('mobile', {
            required: 'Mobile number is required',
            pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit mobile number starting with 6-9' },
          })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter 10-digit mobile number"
          maxLength={10}
        />
        {errors.mobile && <p className="text-error text-sm mt-1" role="alert">{errors.mobile.message}</p>}
      </div>

      {/* Alternate Mobile */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Alternate Mobile (Optional)
        </label>
        <input
          type="tel"
          {...register('alternateMobile', {
            pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit mobile number' },
            validate: (value) => {
              const mobile = watch('mobile');
              if (value && value === mobile) return 'Alternate mobile must differ from primary';
              return true;
            },
          })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter alternate mobile (optional)"
          maxLength={10}
        />
        {errors.alternateMobile && <p className="text-error text-sm mt-1" role="alert">{errors.alternateMobile.message}</p>}
      </div>

      {/* Hidden Submit Button */}
      <button type="submit" ref={submitRef} className="hidden" />

    </form>
  );
};

export default Step2PersonalInfo;