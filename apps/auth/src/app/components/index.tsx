import React, { useContext, useState } from 'react';
import { google, facebook, Lock } from '@appname/assets';
import { useNavigate } from 'react-router-dom';
import { InputField, Checkbox } from '@appname/ui';
import SideWrapper from './SideWrapper';
import { LogInRequest } from '../types/authTypes';
import PasswordInput from './PasswordInput';
import { useLogin } from '../hooks/useAuth';
import Popup from './PopUp';
import { AuthContext } from '../context/AuthContext';
import { Formik, Form } from 'formik';
import { loginValidationSchema } from '../utils/schema/LoginValidationSchema';
import { showToast } from '@appname/ui';
import { Link } from '@mui/material';
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const { mutateAsync, error } = useLogin();
  const [showPopup, setShowPopup] = useState(false);
  const { login } = useContext(AuthContext);
  React.useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
      setRememberMe(true);
    }
  }, []);

  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe(event.target.checked);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = async (values: LogInRequest) => {
    try {
      const response = await mutateAsync({
        email: values.email,
        password: values.password,
      });
      login(response.data.token, response.data.user.id);
      showToast(`${response.message}`, 'success');
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', values.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      setTimeout(() => {
        navigate('/dashboard');
      }, 700);
    } catch (error) {
      showToast('Invalid login credentials', 'error');
    }
  };

  return (
    <SideWrapper className="flex ">
      <div className="max-h-screen w-full mx-auto my-0 flex justify-center  overflow-clip">
        <div className="w-full md:w-3/5 lg:w-3/5  p-4 md:p-16 flex justify-center flex-row flex-wrap">
          <Formik
            initialValues={{
              email: localStorage.getItem('rememberedEmail') || '',
              password: '',
            }}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            validateOnChange={true}
          >
            {({ values, handleChange, errors, touched, handleBlur }) => {
              return (
                <Form className=" form-container block w-11/12 ">
                  <div>
                    <h3 className="pb-4 md:pb-6 font-normal text-xl md:text-3xl lg:text-4xl xl:text-5xl mb-4">
                      Sign In
                    </h3>
                  </div>
                  <div className="mb-4 md:mb-6 h-12 md:h-16 relative">
                    <InputField
                      id="outlined-basic"
                      variant="outlined"
                      className="w-full"
                      type="text"
                      name="email"
                      value={values?.email}
                      onChange={handleChange}
                      label="Email"
                      onBlur={handleBlur}
                      error={touched.email && errors.email}
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-xs absolute">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div className=" mb-4 md:mb-6 h-12 md:h-16 relative  ">
                    <PasswordInput
                      name="password"
                      label="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && errors.password}
                    />
                    {errors.password && touched.password && (
                      <div className="text-red-500 text-xs absolute ">
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <div className="text-end -mt-5">
                    <Link
                      sx={{
                        textDecoration: 'none',
                        fontSize: '14px',
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate('/forgot')}
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="flex items-center mb-3">
                    <Checkbox
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                      label="Remember me"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full h-12 text-primary px-3 border border-primary rounded hover:bg-blue-200 text-base font-semibold"
                    >
                      Sign In
                    </button>
                  </div>
                  <Popup
                    show={showPopup}
                    onClose={handleClosePopup}
                    message={error?.message || 'An error occurred'}
                  />
                  <div className="mt-6 md:mt-10 relative w-full mb-10">
                    <span className="absolute -top-2 md:-top-3 left-1/2 transform -translate-x-1/2 bg-white w-36 md:w-40 text-center text-sm md:text-sm lg:text-lg xl:text-base">
                      Sign in to continue
                    </span>
                    <hr className="border-b border-slate-350" />
                  </div>
                  <div className="flex items-center justify-center gap-4 md:gap-6 mb-4 md:mb-10">
                    <div>
                      <img
                        src={google}
                        alt="google"
                        className="w-6  md:w-8 md:h-8 xl:w-10 xl:h-10"
                      />
                    </div>
                    <div>
                      <img
                        src={facebook}
                        alt="facebook"
                        className="w-6  md:w-8 md:h-8 xl:w-10 xl:h-10"
                      />
                    </div>
                    <div>
                      <img
                        src={Lock}
                        alt="lock"
                        className="w-6  md:w-8 md:h-8 xl:w-10 xl:h-10"
                      />
                    </div>
                  </div>
                  <div className="mt-6 md:mt-8 relative w-full mb-8">
                    <span className="absolute -top-2 md:-top-3 left-1/2 transform -translate-x-1/2 bg-white w-16 md:w-14 text-center text-sm md:text-base">
                      OR
                    </span>
                    <hr className="border-b border-slate-350" />
                  </div>
                  <div className="text-center">
                    <p className="text-primary text-sm md:text-base">
                      Single Sign-On
                    </p>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </SideWrapper>
  );
};

export default Login;
