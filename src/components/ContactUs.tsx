import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CONTACT } from '../assets';

const schema = yup.object().shape({
  name: yup
  .string()
  .required('Name is required')
  .matches(/^[A-Za-z\s]+$/, 'Name should only contain letters and spaces'),

  type: yup
  .mixed()
  .test('is-array-or-undefined', 'Please select at least one type', value => {
    return Array.isArray(value) && value.length > 0;
  }),
  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit number'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});

export const ContactUs = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    console.log('Form submitted');
    reset();
  };

  return (
    <div id={id} className="w-[90%] mx-auto max-lg:px-0 px-0 md:px-20 py-10 md:text-[20px] text-[16px]">
<h2 className="md:text-[30px] text-[20px] font-bold text-center mb-4">Contact Us</h2>

      <p className="text-center text-custom-grey mb-10 max-w-[700px] mx-auto">
        We're talking about clean beauty gift sets, of course – and we've got a bouquet of beauties for yourself or someone you love.
      </p>

      <div className="flex flex-col md:flex-row gap-10">
        
        <div className="flex-1 space-y-6">
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-custom-green text-xl mt-1" />
            <div>
              <h4 className="font-semibold">Address</h4>
              <p>3245 Abbot Kinney BLVD - PH Venice, CA 124</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-custom-green text-xl mt-1" />
            <div>
              <h4 className="font-semibold">Mobile</h4>
              <p>9043312865</p>
              <p>6385560338</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaEnvelope className="text-custom-green text-xl mt-1" />
            <div>
              <h4 className="font-semibold">Email</h4>
              <p>hello@teecheap.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaClock className="text-custom-green text-xl mt-1" />
            <div>
              <h4 className="font-semibold">Opening Hour</h4>
              <p>Mon–Fri: 07:00 - 22:00</p>
              <p>Sat & Sun: 08:00 - 22:00</p>
            </div>
          </div>
        </div>

        
        <div className="flex-1">
          <h3 className="md:text-xl text-base font-semibold mb-6">Send a Message</h3>

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
                <input type="checkbox" value="Bulk" {...register("type")} />
                Bulk
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" value="Individual" {...register("type")} />
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
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
            </div>

            <div className="flex justify-center">
              <img
                src={CONTACT}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>

            <button
              type="submit"
              className="block w-full bg-yellow-200 text-custom-black font-semibold py-3 rounded-md hover:bg-yellow-300 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
