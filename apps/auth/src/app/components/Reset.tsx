import { useState } from 'react';
import PasswordInput from './PasswordInput';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { logo } from '@appname/assets';
import Popup from './PopUp';
import { useReset } from '../hooks/useAuth';
import { Formik, Form } from 'formik';
import { ResetPasswordValidationSchema } from '../utils/schema/ResetPasswordSchema';
import { showToast } from '@appname/ui';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
interface ResetStates {
  password: string;
  confirmPassword: string;
}
const Reset = ({ email }: { email: string }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const { mutateAsync, error } = useReset();

  const navigate = useNavigate();
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const token = searchParams.get('token');
  const validatePassword = (password: string) => {
    const criteria =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return criteria.test(password);
  };
  const passwordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    handleChange: (e: React.ChangeEvent<any>) => void
  ) => {
    handleChange(e);
    setIsCheckboxChecked(validatePassword(e.target.value));
  };
  const handleSubmit = async (values: ResetStates) => {
    try {
      if (values.password !== values.confirmPassword) {
        showToast('Password did not matched', 'error');
      } else if (values.password === values.confirmPassword) {
        const response = await mutateAsync({
          password: values?.password,
          resetToken: token,
        });
        if (response.message) {
          showToast(`${response.message}`, 'success');
          setTimeout(() => {
            navigate('/');
          }, 700);
        }
      }
    } catch (error) {
      showToast(`${error}`, 'error');
    }
  };

  return (
    <div className="min-h-screen w-full mx-auto my-0 flex justify-center font-poppins">
      <div className="w-full sm:w-3/5 p-6 md:p-16 flex justify-center mt-20 flex-row flex-wrap relative">
        <div className="absolute -top-4 w-52">
          <img className="w-44" src={logo} alt="img1" />
        </div>
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={ResetPasswordValidationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
        >
          {({ values, handleChange, errors, touched, handleBlur }) => {
            return (
              <Form className="block w-full lg:w-3/5 md:w-3/6 sm:w-2/4">
                <div className="mb-6 text-3xl text-center w-full font-bold">
                  <h1>Reset Password</h1>
                </div>
                <div className="mb-8 relative">
                  <PasswordInput
                    name="password"
                    label="Password"
                    value={values.password}
                    onChange={(e) => passwordChange(e, handleChange)}
                    onBlur={handleBlur}
                    error={touched.password && errors.password}
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm absolute ">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="mb-8 relative">
                  <PasswordInput
                    name="confirmPassword"
                    label="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.confirmPassword && errors.confirmPassword}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-red-500 text-sm absolute ">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <div className="flex mt-6">
                  {isCheckboxChecked ? (
                    <CheckIcon className="text-[green]" />
                  ) : (
                    <ClearIcon className="text-red-500" />
                  )}
                  <div className="ml-1 text-justify text-gray-600 ">
                    Password must be at least 8 characters long and include at
                    least one uppercase letter, one lowercase letter, one
                    number, and one special character.
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Reset password
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

export default Reset;
