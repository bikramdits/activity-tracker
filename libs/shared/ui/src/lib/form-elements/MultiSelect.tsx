import React, { useState, useRef, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Typography,
  ListItemText,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface Option {
  label: string;
  value: string;
}

interface MultipleSelectWithPlaceholderProps {
  options: Option[];
  label: string;
  placeholder: string;
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
  isMultiple?: boolean;
  showCheckIcon?: boolean;
}

const MultipleSelect: React.FC<MultipleSelectWithPlaceholderProps> = ({
  options,
  label,
  placeholder,
  value,
  onChange,
  isMultiple = true,
  showCheckIcon = true,
}) => {
  const [menuWidth, setMenuWidth] = useState<number | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    onChange(
      typeof value === 'string' ? value?.split(',') : (value as string[])
    );
  };

  const updateMenuWidth = () => {
    if (selectRef.current) {
      const width = selectRef.current.clientWidth;
      setMenuWidth(width);
    }
  };

  const handleOpen = () => {
    updateMenuWidth();
  };

  useEffect(() => {
    updateMenuWidth();
  }, [value]);

  useEffect(() => {
    const handleResize = () => {
      updateMenuWidth();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <FormControl fullWidth variant="outlined" ref={selectRef}>
      <InputLabel id="multiple-select-label" className="!text-[#666]" shrink>
        {label}
      </InputLabel>
      <Select
        labelId="multiple-select-label"
        multiple={isMultiple}
        value={value}
        onChange={handleChange}
        input={<OutlinedInput notched label={label} />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return (
              <Typography className="!text-[#999] !text-base">
                {placeholder}
              </Typography>
            );
          }

          const displayed = (selected as string[])
            .map((val) => options.find((option) => option.value === val)?.label)
            .filter((label) => label !== undefined) as string[];

          if (displayed.length > 2) {
            return `${displayed.slice(0, 2).join(', ')}...`;
          }

          return displayed.join(', ');
        }}
        displayEmpty
        onOpen={handleOpen}
        MenuProps={{
          PaperProps: {
            style: {
              width: menuWidth !== null ? `${menuWidth}px` : 'auto',
              maxHeight: '200px', // Adjust the height as needed
            },
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
            autoFocus
            placeholder="Search..."
            fullWidth
            onChange={(e) => {
              e.stopPropagation();
              setSearchQuery(e.target.value);
            }}
            value={searchQuery}
            onClick={(e) => e.stopPropagation()} // Prevent Select from closing
          />
        </MenuItem>
        {filteredOptions?.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            className="hover:text-[#3c59d4] text-base"
          >
            <ListItemText
              sx={{ textWrap: 'wrap' }}
              primary={option.label}
              className={value.includes(option.value) ? 'text-[#3c59d4]' : ''}
            />
            {showCheckIcon && value.includes(option.value) && (
              <CheckIcon className="text-[#3c59d4]" />
            )}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelect;
