import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface PageSizeOption {
  label: string;
  value: string;
}

interface PageSizeSelectProps {
  options: PageSizeOption[];
  defaultValue: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PageSizeSelect: React.FC<PageSizeSelectProps> = ({
  options,
  defaultValue,
  onChange,
}) => {
  return (
    <TextField
      id="outlined-select-page-size"
      select
      label="Page Size"
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default PageSizeSelect;
