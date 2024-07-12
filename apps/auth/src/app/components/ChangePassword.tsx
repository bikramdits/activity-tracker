import { useState } from 'react';
import PasswordInput from './PasswordInput';
import { useChangePassword } from '../hooks/useAuth';
import { ChangePasswordRequest } from '../types/authTypes';
import Popup from './PopUp';
import { Formik, Form } from 'formik';
import { ChangePasswordValidationSchema } from '../utils/schema/ChangePasswordSchema';
import { showToast } from '@appname/ui';
import { ToastContainer } from 'react-toastify';

const ChangePassword = () => {
  const { mutateAsync, error } = useChangePassword();
  const [showPopup, setShowPopup] = useState(false);

  const handlePasswordChange = async (values: ChangePasswordRequest) => {
    try {
      const response = await mutateAsync({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      if (response.statusCode === 200) {
        showToast(`${response.message}`, 'success');
      } else if (response.statusCode === 400) {
        showToast(`${response.errorRes}`, 'error');
      }
    } catch (error) {
      setShowPopup(true);
    }
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen w-full mx-auto my-0 flex justify-center font-poppins">
      <ToastContainer />
      <div className="w-full sm:w-3/5 p-6 md:p-16 flex justify-center mt-20 flex-row flex-wrap relative">
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          validationSchema={ChangePasswordValidationSchema}
          onSubmit={handlePasswordChange}
          validateOnChange={true}
        >
          {({ values, handleChange, errors, touched, handleBlur }) => {
            return (
              <Form className="block w-full lg:w-3/5 md:w-3/6 sm:w-2/4">
                <div className="mb-6 text-3xl text-center w-full font-bold">
                  <h1>Change Password</h1>
                </div>
                <div className="mb-8">
                  <PasswordInput
                    name="oldPassword"
                    label="Old Password"
                    value={values.oldPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.oldPassword && errors.oldPassword}
                  />
                  {errors.oldPassword && touched.oldPassword && (
                    <div className="text-red-500 text-sm absolute">
                      {errors.oldPassword}
                    </div>
                  )}
                </div>
                <div className="mb-12">
                  <PasswordInput
                    name="newPassword"
                    label="New Password"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.newPassword && errors.newPassword}
                  />
                  {errors.newPassword && touched.newPassword && (
                    <div className="text-red-500 text-sm absolute">
                      {errors.newPassword}
                    </div>
                  )}
                </div>
                <div className="mb-8">
                  <PasswordInput
                    name="confirmNewPassword"
                    label="Confirm New Password"
                    value={values.confirmNewPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.confirmNewPassword && errors.confirmNewPassword
                    }
                  />
                  {errors.confirmNewPassword && touched.confirmNewPassword && (
                    <div className="text-red-500 text-sm absolute">
                      {errors.confirmNewPassword}
                    </div>
                  )}
                </div>
                <div className="mb-4 font-normal text-gray-600">
                  Hint: Password should be minimum 8 characters with letters,
                  numbers and special characters.
                </div>
                <div className="mt-6 text-center">
                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Change password
                  </button>
                </div>
                <Popup
                  show={showPopup}
                  onClose={handleClosePopup}
                  message={error?.message || 'An error occurred'}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;
