import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';

type ContactFormProps = {
  onClose?: () => void;
  screenshot?: string; // Add this line
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Name should only contain letters and spaces'),
  type: yup.string().required('Please select a type').oneOf(['Bulk', 'Individual']),
  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit number'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});

export const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Form submitted successfully!');
        reset();
        onClose?.(); // close modal if applicable
      } else {
        alert(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="w-full border border-custom-grey p-3 rounded-md focus:outline-none"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div className="flex gap-4 text-custom-grey flex-wrap">
        <label className="flex items-center gap-2">
          <input type="radio" value="Bulk" {...register("type")} />
          Bulk
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" value="Individual" {...register("type")} />
          Individual
        </label>
      </div>
      {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}

      <div>
        <input
          type="text"
          placeholder="Mobile Number"
          {...register("mobile")}
          className="w-full border border-custom-grey p-3 rounded-md focus:outline-none"
        />
        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Subject"
          {...register("subject")}
          className="w-full border border-custom-grey p-3 rounded-md focus:outline-none"
        />
        {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
      </div>

      <div>
        <textarea
          placeholder="Message"
          {...register("message")}
          className="w-full border border-custom-grey p-3 rounded-md h-32 resize-none focus:outline-none"
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        className="block w-full bg-yellow-200 text-custom-black font-semibold py-3 rounded-md hover:bg-yellow-300 transition"
      >
        Submit
      </button>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="mt-3 block w-full text-center text-red-500"
        >
          Cancel
        </button>
      )}
    </form>
  );
};