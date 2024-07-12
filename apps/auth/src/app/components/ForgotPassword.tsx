import { useState } from 'react';
import { InputField } from '@appname/ui';
import SideWrapper from './SideWrapper';
import { useForgotPassword } from '../hooks/useAuth';
import { ForgotPasswordRequest } from '../types/authTypes';
import Popup from './PopUp';
import { Formik, Form } from 'formik';
import { ForgotPasswordValidationSchema } from '../utils/schema/ForgotPasswordSchema';
import { showToast } from '@appname/ui';
import { useNavigate } from 'react-router-dom';

const Forgotpassword = () => {
  const { mutateAsync, error } = useForgotPassword();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleSubmit = async (values: ForgotPasswordRequest) => {
    try {
      const response = await mutateAsync({
        email: values.email,
      });
      if (response.statusCode === 200) {
        showToast(`${response.message}`, 'success');
        setTimeout(() => {
          navigate('/');
        }, 700);
      } else if (response.statusCode === 400) {
        showToast('Email is not exist in our database.', 'error');
      }
    } catch (error) {
      showToast(`${error}`, 'error');
    }
  };
  return (
    <SideWrapper className="flex">
      <div className="min-h-screen w-full mx-auto my-0 flex justify-center font-poppins">
        <div className="w-3/5 lg:w-3/5 p-16 flex justify-center mt-20 flex-row flex-wrap">
          <div className="block w-full ">
            <div className="mb-6 text-3xl text-center font-bold">
              <h1>Forgot Password</h1>
            </div>
            <div className="mb-4 font-normal text-gray-600">
              Please enter your email address and we'll send you instructions on
              how to reset your password.
            </div>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={ForgotPasswordValidationSchema}
              onSubmit={handleSubmit}
              validateOnChange={true}
            >
              {({ values, handleChange, errors, touched, handleBlur }) => {
                return (
                  <Form>
                    <div>
                      <InputField
                        id="email1"
                        variant="outlined"
                        className="w-full"
                        type="text"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Email "
                        error={touched.email && errors.email}
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-500 text-sm absolute">
                          {errors.email}
                        </div>
                      )}
                    </div>
                    <div className="mt-8 text-center">
                      <button
                        type="submit"
                        className="w-full h-12 text-primary px-3 border border-primary rounded hover:bg-blue-200 text-base font-semibold"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <Popup
              show={showPopup}
              onClose={handleClosePopup}
              message={error?.message || 'An error occurred'}
            />
          </div>
        </div>
      </div>
    </SideWrapper>
  );
};

export default Forgotpassword;
