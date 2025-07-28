import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'; // ✅ Import toast
import 'react-toastify/dist/ReactToastify.css';

type ContactFormProps = {
  screenshot?: string;
  requireScreenshot?: boolean;
  onClose?: () => void;
  pdfUrl?: string;
  pdfBlob: Blob;
  onSubmitted: () => void;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Name should only contain letters and spaces'),
  type: yup
    .string()
    .required('Please select a type')
    .oneOf(['Bulk', 'Individual'], 'Invalid type selected'),
  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit number'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});

export const ContactForm = ({
  screenshot,
  onClose,
  requireScreenshot = false,
  pdfUrl,
  onSubmitted,
}: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const [image, setImage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false); // ✅ Track submission state

useEffect(() => {
  if (requireScreenshot) {
    const img = screenshot || localStorage.getItem('estimationScreenshot');
    if (img) setImage(img); // ✅ this sets it to show <img />
  }
}, [requireScreenshot, screenshot]);


const onSubmit = async (data: any) => {
  try {
    setSubmitting(true);

    if (image && requireScreenshot) {                                                                                         
      data.screenshot = image;
    }
    if (pdfUrl) {
      data.pdfUrl = pdfUrl;
    }

    const response = await fetch('http://localhost:3000/api/contact/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    // 🛠 FIX: read text first
    const responseText = await response.text();

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (err) {
      result = {};
    }

    if (response.ok) {
      toast.success('Form submitted successfully!', { autoClose: 3000 });
      reset();
      setImage(null);
      onClose?.();
      onSubmitted();
    } else {
      toast.error(result?.message || 'Submission failed', { autoClose: 3000 });
    }
  } catch (error) {
    console.error('❌ Network or fetch error:', error);
    toast.error('An error occurred during submission.', { autoClose: 3000 });
  } finally {
    setSubmitting(false);
  }
};



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative">
      {onClose && (
  <button
    type="button"
    onClick={onClose}
    className="absolute -top-11 right-2 text-black text-2xl font-bold z-10"
    aria-label="Close"
  >
    ×
  </button>
)}


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

      {requireScreenshot && image && (
        <>
          <p>Attached Screenshot of Estimation:</p>
          <img
            src={image}
            alt="Estimation Screenshot"
            className="max-w-full max-h-[300px] rounded border"
          />
        </>
      )}

      <button
        type="submit"
        disabled={submitting} // ✅ Disable during submit
        className={`block w-full font-semibold py-3 rounded-md transition ${
          submitting
            ? 'bg-yellow-100 text-gray-600 cursor-not-allowed'
            : 'bg-yellow-200 text-custom-black hover:bg-yellow-300'
        }`}
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
