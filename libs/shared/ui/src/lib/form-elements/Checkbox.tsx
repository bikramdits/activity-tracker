import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel, CheckboxProps as MuiCheckboxProps } from '@mui/material';

interface CheckboxProps extends MuiCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, ...props }) => {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          checked={checked}
          onChange={onChange}
          sx={{
            color: 'rgb(0 0 0 / 25%)', // Default color
            // width:'50px',
            '&.Mui-checked': {
              color: '#3C59D4', // Color when checked 
            }
          }}
          {...props}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
