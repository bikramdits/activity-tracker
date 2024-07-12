import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  SelectChangeEvent,
} from '@mui/material';

interface OptionType {
  [key: string]: any; // This allows any additional properties
}

interface MultiSelectFormControlProps<T extends OptionType> {
  options: T[];
  label: any;
  placeholder: string;
  value: string[] | string;
  onChange: (event: SelectChangeEvent<string[] | string>) => void;
  className?: string;
  isMultiple?: boolean;
  showCheckIcon?: boolean;
  idKey: string;
  nameKey: (option: T) => string; // Updated to accept a function
}

const MultiSelectFormControl = <T extends OptionType>({
  options = [],
  label,
  placeholder,
  value,
  onChange,
  className,
  isMultiple = true,
  showCheckIcon = true,
  idKey,
  nameKey,
}: MultiSelectFormControlProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredOptions = options.filter((option) =>
    nameKey(option).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the number of items to display in the dropdown
  const displayItemsCount = Math.max(filteredOptions.length, 5);

  return (
    <FormControl fullWidth className={className} variant="outlined">
      <InputLabel id={`${label}-label`} shrink>
        {label}
      </InputLabel>
      <Select
        name={label}
        labelId={`${label}-label`}
        id={`${label}-select`}
        multiple={isMultiple}
        value={value}
        onChange={onChange}
        renderValue={(selected) =>
          isMultiple
            ? (selected as string[])
                .map((val) =>
                  options.find((option: T) => option[idKey] === val)
                    ? nameKey(
                        options.find((option: T) => option[idKey] === val) as T
                      )
                    : ''
                )
                .join(', ')
            : options.find((option: T) => option[idKey] === selected)
            ? nameKey(
                options.find((option: T) => option[idKey] === selected) as T
              )
            : ''
        }
        displayEmpty
        label={label}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200, // Adjust this value as needed
            },
          },
        }}
        sx={{
          height: '55px',
          '.MuiSelect-select': {
            overflowY: 'hidden',
            display: 'flex',
            alignItems: 'center',
            height: '55px',
          },
        }}
      >
        <MenuItem
          disableTouchRipple
          onKeyDown={(e) => e.stopPropagation()}
          disableRipple
          sx={{ bgcolor: 'transparent' }}
        >
          <TextField
            placeholder="Search..."
            fullWidth
            variant="standard"
            value={searchTerm}
            onChange={handleSearchChange}
            onClick={(event) => event.stopPropagation()} // Prevent closing the dropdown when clicking the search box
          />
        </MenuItem>
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {filteredOptions.slice(0, displayItemsCount).map((option: T) => (
          <MenuItem
            key={option[idKey]}
            value={option[idKey]}
            sx={{
              color: (value as string[]).includes(option[idKey])
                ? '#3c59d4'
                : 'inherit',
            }}
          >
            {nameKey(option)}
            {isMultiple &&
              showCheckIcon &&
              (value as string[]).includes(option[idKey]) && (
                <Box
                  component="span"
                  sx={{ marginLeft: 'auto', color: '#3c59d4' }}
                >
                  ✓
                </Box>
              )}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectFormControl;
