import { TextField as MuiTextField } from '@mui/material';

export const MultilineTextField = ({
  id,
  label,
  maxRows,
  className,
  onChange,
  name,
  value,
  error = false,
  ...props
}: {
  id: string;
  label: any;
  maxRows: number;
  className: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value:string | undefined;
  name:string;
  error?: any;
}) => {
  return (
    <MuiTextField
      id={id}
      label={label}
      multiline
      maxRows={maxRows}
      className={className}
      variant="outlined"
      name={name}
      error={error}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
};

export default MultilineTextField;
