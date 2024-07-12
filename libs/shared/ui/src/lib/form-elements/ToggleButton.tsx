import * as React from 'react';
import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface Option {
  value: string;
  label: string|undefined;
}

interface ToggleButtonProps {
  options: Option[];
  value: string;
  onChange: (newAlignment: string) => void;
  exclusive?: boolean;
  color?: 'primary' | 'secondary' | 'standard';
  buttonStyles?: React.CSSProperties;
  activeClassName?: string;
  inactiveClassName?: string;
  hoverColor?: string; // New prop for hover color
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  options,
  value,
  onChange,
  exclusive = true,
  color = 'primary',
  buttonStyles = {},
  activeClassName = '!bg-[#3c59d4] !text-white',
  inactiveClassName = '!border-0 !text-[#3c59d4]',
  hoverColor = '#cae2ff', // Default hover color
}) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (!newAlignment) {
      return;
    }

    onChange(newAlignment);
  };

  return (
    <MuiToggleButtonGroup
      color={color}
      value={value}
      onChange={handleChange}
      exclusive={exclusive}
    >
      {options.map((option) => (
        <MuiToggleButton
          key={option.value}
          value={option.value}
          sx={{
            fontSize: '12px',
            textTransform: 'capitalize',
            ...buttonStyles,
            '&:hover': { 
              backgroundColor: hoverColor,
              borderColor: hoverColor, 
            },
          }}
          className={
            value === option.value ? activeClassName : inactiveClassName
          }
        >
          {option.label}
        </MuiToggleButton>
      ))}
    </MuiToggleButtonGroup>
  );
};

export default ToggleButton;
