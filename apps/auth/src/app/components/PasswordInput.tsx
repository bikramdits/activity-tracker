import React, { useState } from 'react';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface PasswordInputProps {
  label: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  name,
  onChange,
  onBlur,
  error = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ width: '100%' }} variant="outlined" error={error}>
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        name={name}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        sx={{ bgcolor: 'transparent' }}
      />
    </FormControl>
  );
};

export default PasswordInput;
