import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useFormStore from '../../store/formStore';

const Step3KYC = () => {
  const { formData, updateStepData } = useFormStore();
  const [panStatus, setPanStatus] = useState('idle');
  const [aadhaarStatus, setAadhaarStatus] = useState('idle');

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: formData.step3,
  });

  const onSubmit = (data) => updateStepData('step3', data);

  // PAN Validation
  const validatePAN = (value) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(value)) return 'Invalid PAN format (e.g. ABCDE1234F)';
    const validTypes = ['P', 'C', 'H', 'A', 'B', 'G', 'J', 'L', 'F', 'T'];
    if (!validTypes.includes(value[3])) return 'PAN 4th character must indicate entity type (P for Individual, C for Company, etc.)';
    return true;
  };

  // Aadhaar Verhoeff Checksum
  const verhoeffValidate = (num) => {
    const d = [
      [0,1,2,3,4,5,6,7,8,9],
      [1,2,3,4,0,6,7,8,9,5],
      [2,3,4,0,1,7,8,9,5,6],
      [3,4,0,1,2,8,9,5,6,7],
      [4,0,1,2,3,9,5,6,7,8],
      [5,9,8,7,6,0,4,3,2,1],
      [6,5,9,8,7,1,0,4,3,2],
      [7,6,5,9,8,2,1,0,4,3],
      [8,7,6,5,9,3,2,1,0,4],
      [9,8,7,6,5,4,3,2,1,0],
    ];
    const p = [
      [0,1,2,3,4,5,6,7,8,9],
      [1,5,7,6,2,8,3,0,9,4],
      [5,8,0,3,7,9,6,1,4,2],
      [8,9,1,6,0,4,3,5,2,7],
      [9,4,5,3,1,2,6,8,7,0],
      [4,2,8,6,5,7,3,9,0,1],
      [2,7,9,3,8,0,6,4,1,5],
      [7,0,4,6,9,1,3,2,5,8],
    ];
    const inv = [0,4,3,2,1,9,8,7,6,5];
    const digits = num.split('').reverse().map(Number);
    let check = 0;
    for (let i = 0; i < digits.length; i++) {
      check = d[check][p[i % 8][digits[i]]];
    }
    return check === 0;
  };

  const validateAadhaar = (value) => {
    if (!/^\d{12}$/.test(value)) return 'Aadhaar must be 12 digits';
    if (!verhoeffValidate(value)) return 'Invalid Aadhaar number (checksum failed)';
    return true;
  };

  // Simulate verification
  const simulateVerification = (type, value) => {
    if (type === 'pan') {
      if (validatePAN(value) !== true) return;
      setPanStatus('verifying');
      setTimeout(() => setPanStatus('verified'), 1500);
    } else {
      if (validateAadhaar(value) !== true) return;
      setAadhaarStatus('verifying');
      setTimeout(() => setAadhaarStatus('verified'), 1500);
    }
  };

  return (
    <form onChange={handleSubmit(onSubmit)} className="flex flex-col gap-6">

      {/* PAN Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          PAN Number <span className="text-error">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            {...register('panNumber', {
              required: 'PAN number is required',
              validate: validatePAN,
            })}
            onBlur={(e) => simulateVerification('pan', e.target.value.toUpperCase())}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary uppercase"
            placeholder="ABCDE1234F"
            maxLength={10}
          />
          {panStatus === 'verifying' && (
            <span className="flex items-center text-warning text-sm">⏳ Verifying...</span>
          )}
          {panStatus === 'verified' && (
            <span className="flex items-center text-accent text-sm">✅ Verified</span>
          )}
        </div>
        {errors.panNumber && <p className="text-error text-sm mt-1" role="alert">{errors.panNumber.message}</p>}
      </div>

      {/* Aadhaar Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Aadhaar Number <span className="text-error">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            {...register('aadhaarNumber', {
              required: 'Aadhaar number is required',
              validate: validateAadhaar,
            })}
            onBlur={(e) => simulateVerification('aadhaar', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter 12-digit Aadhaar number"
            maxLength={12}
          />
          {aadhaarStatus === 'verifying' && (
            <span className="flex items-center text-warning text-sm">⏳ Verifying...</span>
          )}
          {aadhaarStatus === 'verified' && (
            <span className="flex items-center text-accent text-sm">✅ Verified</span>
          )}
        </div>
        {errors.aadhaarNumber && <p className="text-error text-sm mt-1" role="alert">{errors.aadhaarNumber.message}</p>}
      </div>

      {/* Aadhaar Consent */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('aadhaarConsent', {
              required: 'You must provide consent to proceed',
            })}
            className="mt-1 accent-primary"
          />
          <span className="text-sm text-gray-700">
            I consent to the use of my Aadhaar number for KYC verification as per UIDAI guidelines.
            I understand that my Aadhaar data will be used only for identity verification purposes.
            <span className="text-error"> *</span>
          </span>
        </label>
        {errors.aadhaarConsent && <p className="text-error text-sm mt-2" role="alert">{errors.aadhaarConsent.message}</p>}
      </div>

      {/* Voter ID (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Voter ID (Optional)
        </label>
        <input
          type="text"
          {...register('voterId', {
            pattern: { value: /^[A-Z]{3}[0-9]{7}$/, message: 'Format: 3 letters + 7 digits (e.g. ABC1234567)' },
          })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary uppercase"
          placeholder="ABC1234567 (optional)"
          maxLength={10}
        />
        {errors.voterId && <p className="text-error text-sm mt-1" role="alert">{errors.voterId.message}</p>}
      </div>

    </form>
  );
};

export default Step3KYC;