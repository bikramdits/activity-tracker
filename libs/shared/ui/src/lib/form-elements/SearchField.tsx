
import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

interface SearchFieldProps {
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  tailwindClasses?: string;
  sx?: object;
}

export const SearchField: React.FC<SearchFieldProps> = ({ placeholder = 'Search...', value, onChange, tailwindClasses, sx }) => {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant="outlined"
      className={tailwindClasses}
      sx={sx}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;
