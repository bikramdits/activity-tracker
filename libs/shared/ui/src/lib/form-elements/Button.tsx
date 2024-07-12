import React from 'react';
import MuiButton from '@mui/material/Button';
import { SxProps } from '@mui/system';

interface ButtonProps {
  children: React.ReactNode;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  tailwindClasses?: string;
  sx?: SxProps;
  onClick?:()=>void
  id?: string;
  variant?: 'filled' | 'outlined' | 'standard';
  type?:'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ children, color , tailwindClasses, sx,onClick , id ,type }) => {
  return (
    <MuiButton
      color={color}
      className={tailwindClasses}
      sx={sx}
      onClick={onClick}
      id={id}
      type={type}
    >
      {children}
    </MuiButton>
  );
};

export default Button;