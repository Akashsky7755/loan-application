import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useFormStore from '../../store/formStore';
import { useForm } from 'react-hook-form';

const PIN_DATA = {
  '110001': { city: 'New Delhi', state: 'Delhi', postOffice: 'Connaught Place' },
  '400001': { city: 'Mumbai', state: 'Maharashtra', postOffice: 'Mumbai GPO' },
  '560001': { city: 'Bengaluru', state: 'Karnataka', postOffice: 'Bengaluru GPO' },
  '600001': { city: 'Chennai', state: 'Tamil Nadu', postOffice: 'Chennai GPO' },
  '700001': { city: 'Kolkata', state: 'West Bengal', postOffice: 'Kolkata GPO' },
  '500001': { city: 'Hyderabad', state: 'Telangana', postOffice: 'Hyderabad GPO' },
  '380001': { city: 'Ahmedabad', state: 'Gujarat', postOffice: 'Ahmedabad GPO' },
  '302001': { city: 'Jaipur', state: 'Rajasthan', postOffice: 'Jaipur GPO' },
  '226001': { city: 'Lucknow', state: 'Uttar Pradesh', postOffice: 'Lucknow GPO' },
  '800001': { city: 'Patna', state: 'Bihar', postOffice: 'Patna GPO' },
};

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal',
];

const Step4Address = ({ submitRef }) => {
  const { formData, updateStepData } = useFormStore();
  const [sameAsPermanent, setSameAsPermanent] = useState(false);
  const [pinLoading, setPinLoading] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: formData.step4,
  });

  const onSubmit = (data) => updateStepData('step4', data);

  const residenceType = watch('residenceType');
  const yearsAtAddress = watch('yearsAtAddress');

  const handlePinLookup = (pin) => {
    if (pin.length === 6) {
      setPinLoading(true);
      setTimeout(() => {
        const data = PIN_DATA[pin];
        if (data) {
          setValue('city', data.city);
          setValue('state', data.state);
          setValue('postOffice', data.postOffice);
        }
        setPinLoading(false);
      }, 800);
    }
  };

  const handleSameAsPermanent = (checked) => {
    setSameAsPermanent(checked);
    if (checked) {
      const current = watch();
      setValue('permAddressLine1', current.addressLine1);
      setValue('permAddressLine2', current.addressLine2);
      setValue('permPinCode', current.pinCode);
      setValue('permCity', current.city);
      setValue('permState', current.state);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

      <h3 className="font-semibold text-gray-700 text-lg">Current Address</h3>

      {/* Address Line 1 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address Line 1 <span className="text-error">*</span>
        </label>
        <input
          type="text"
          {...register('addressLine1', {
            required: 'Address is required',
            minLength: { value: 5, message: 'Minimum 5 characters' },
          })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="House/Flat No, Street Name"
        />
        {errors.addressLine1 && <p className="text-error text-sm mt-1" role="alert">{errors.addressLine1.message}</p>}
      </div>

      {/* Address Line 2 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address Line 2 (Optional)
        </label>
        <input
          type="text"
          {...register('addressLine2')}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Landmark, Area"
        />
      </div>

      {/* PIN Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          PIN Code <span className="text-error">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            {...register('pinCode', {
              required: 'PIN code is required',
              pattern: { value: /^\d{6}$/, message: 'PIN code must be 6 digits' },
            })}
            onChange={(e) => handlePinLookup(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter 6-digit PIN code"
            maxLength={6}
          />
          {pinLoading && <span className="flex items-center text-warning text-sm">⏳</span>}
        </div>
        {errors.pinCode && <p className="text-error text-sm mt-1" role="alert">{errors.pinCode.message}</p>}
      </div>

      {/* City & State (auto-filled) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City <span className="text-error">*</span>
          </label>
          <input
            type="text"
            {...register('city', { required: 'City is required' })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-blue-50"
            placeholder="Auto-filled from PIN"
          />
          {errors.city && <p className="text-error text-sm mt-1" role="alert">{errors.city.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State <span className="text-error">*</span>
          </label>
          <select
            {...register('state', { required: 'State is required' })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select state</option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.state && <p className="text-error text-sm mt-1" role="alert">{errors.state.message}</p>}
        </div>
      </div>

      {/* Residence Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Residence Type <span className="text-error">*</span>
        </label>
        <select
          {...register('residenceType', { required: 'Residence type is required' })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select type</option>
          <option value="Owned">Owned</option>
          <option value="Rented">Rented</option>
          <option value="Company">Company Provided</option>
          <option value="Family">Family Owned</option>
        </select>
        {errors.residenceType && <p className="text-error text-sm mt-1" role="alert">{errors.residenceType.message}</p>}
      </div>

      {/* Rent Amount (conditional) */}
      {residenceType === 'Rented' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Rent Amount <span className="text-error">*</span>
          </label>
          <input
            type="number"
            {...register('rentAmount', { required: 'Rent amount is required' })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter monthly rent"
          />
          {errors.rentAmount && <p className="text-error text-sm mt-1" role="alert">{errors.rentAmount.message}</p>}
        </div>
      )}

      {/* Years at Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Years at Current Address <span className="text-error">*</span>
        </label>
        <input
          type="number"
          {...register('yearsAtAddress', {
            required: 'Required',
            min: { value: 0, message: 'Cannot be negative' },
            max: { value: 50, message: 'Maximum 50 years' },
          })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Years at current address"
        />
        {errors.yearsAtAddress && <p className="text-error text-sm mt-1" role="alert">{errors.yearsAtAddress.message}</p>}
      </div>

      {/* Same as Permanent Address */}
      <div className="border-t pt-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={sameAsPermanent}
            onChange={(e) => handleSameAsPermanent(e.target.checked)}
            className="accent-primary"
          />
          <span className="text-sm font-medium text-gray-700">
            Permanent address same as current address
          </span>
        </label>
      </div>

      {/* Permanent Address (conditional) */}
      {!sameAsPermanent && (
        <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700">Permanent Address</h3>
          <input
            type="text"
            {...register('permAddressLine1', { required: !sameAsPermanent ? 'Required' : false })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Permanent Address Line 1"
          />
          <input
            type="text"
            {...register('permAddressLine2')}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Permanent Address Line 2 (Optional)"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              {...register('permPinCode')}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="PIN Code"
              maxLength={6}
            />
            <input
              type="text"
              {...register('permCity')}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="City"
            />
          </div>
          <select
            {...register('permState')}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select State</option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}
      <button type="submit" ref={submitRef} className="hidden" />

    </form>
  );
};

export default Step4Address;