import React from 'react';
import { TextField } from '@mui/material';

interface InputFieldProps {
  id: string;
  label: any;
  variant: 'filled' | 'outlined' | 'standard';
  className: string;
  type: 'text' | 'number' | 'date' | 'textarea';
  value: string | number | null | undefined;
  name: string;
  error?: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  variant,
  className,
  type,
  value,
  name,
  onChange,
  error = false,
  ...props
}) => {
  const inputLabelProps = type === 'date' ? { shrink: true } : {};

  return (
    <TextField
      id={id}
      label={label}
      variant={variant}
      className={className}
      type={type !== 'textarea' ? type : 'text'}
      multiline={type === 'textarea'}
      value={value !== null ? value : ''}
      name={name}
      onChange={onChange}
      InputLabelProps={inputLabelProps} 
      error={error}
      {...props}
    />
  );
};

export default InputField;
