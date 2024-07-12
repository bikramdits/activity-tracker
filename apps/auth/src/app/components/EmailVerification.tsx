import * as React from 'react';
import { Input as BaseInput } from '@mui/base/Input';
import { Box, styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import SideWrapper from './SideWrapper';
import { VerifyOTPRequest, VerifyOTPResponse } from '../types/authTypes';
import { useVerifyEmail } from '../hooks/useAuth';
import Popup from './PopUp';
import { ToastContainer, toast } from 'react-toastify';

function OTP({
  separator,
  length,
  value,
  onChange,
}: {
  separator: React.ReactNode;
  length: number;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputRefs = React.useRef<HTMLInputElement[]>(
    new Array(length).fill(null)
  );

  const focusInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case ' ':
        event.preventDefault();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case 'Delete':
        event.preventDefault();
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });

        break;
      case 'Backspace':
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }

        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;

      default:
        break;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter].value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    onChange((prev) => {
      const otpArray = prev.split('');
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join('');
    });
    if (currentValue !== '') {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    currentIndex: number
  ) => {
    selectInput(currentIndex);
  };

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes('text/plain')) {
      let pastedText = clipboardData.getData('text/plain');
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter].value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split('');

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? ' ';
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(''));
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <BaseInput
            slots={{
              input: InputElement,
            }}
            aria-label={`Digit ${index + 1} of OTP`}
            slotProps={{
              input: {
                ref: (ele) => {
                  inputRefs.current[index] = ele!;
                },
                onKeyDown: (event) => handleKeyDown(event, index),
                onChange: (event) => handleChange(event, index),
                onClick: (event) => handleClick(event, index),
                onPaste: (event) => handlePaste(event, index),
                value: value[index] ?? '',
              },
            }}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

export default function EmailVerification({ email }: { email: string }) {
  const [otp, setOtp] = React.useState(' ');

  const navigate = useNavigate();
  const { mutateAsync, error } = useVerifyEmail();
  const [showPopup, setShowPopup] = React.useState(false);

  const request: VerifyOTPRequest = {
    email: email,
    otp: parseInt(otp),
  };
  const handleEmailVerify = async () => {
    try {
      const response: VerifyOTPResponse = await mutateAsync(request);
      if (response.statusCode === 200) {
        navigate('/reset');
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      setShowPopup(true);
    }
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <SideWrapper className="flex">
      <ToastContainer />
      <div className="min-h-screen w-full mx-auto my-0 flex justify-center font-poppins">
        <div className="w-3/5 p-16 flex justify-center  mt-20 flex-row flex-wrap">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
              padding: '10px',
              marginBottom: '0.5rem',
            }}
          >
            <div className="flex flex-col items-center justify-center text-center space-y-2 mb-6">
              <div className="font-semibold text-3xl mb-4">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email </p>
              </div>
            </div>
            
            <div className="flex justify-center mb-6 ">
              <OTP
                separator={<span>-</span>}
                value={otp}
                onChange={setOtp}
                length={4}
              />
            </div>
            <div className="flex flex-col space-y-5">
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleEmailVerify}
                  className="flex flex-row cursor-pointer items-center justify-center text-center w-40 border rounded outline-none py-2 bg-blue-700 border-none text-white text-sm shadow-sm"
                >
                  Verify Account
                </button>
              </div>
              <Popup
                show={showPopup}
                onClose={handleClosePopup}
                message={error?.message || 'An error occurred'}
              />

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't receive code?</p>{' '}
                <p className="flex flex-row items-center">Resend OTP</p>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </SideWrapper>
  );
}

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const InputElement = styled('input')(
  ({ theme }) => `
  width: 40px;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === 'dark' ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
