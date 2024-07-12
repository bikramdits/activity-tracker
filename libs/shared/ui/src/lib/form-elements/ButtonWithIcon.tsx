import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface ButtonwithIconProps {
    children: string;
    icon?: React.ReactNode;
    sx?: React.CSSProperties;
    bgColor?: string;
    noBorder?: boolean;
    onClick?: () => void;
}

export const ButtonWithIcon = ({
    children,
    icon,
    sx,
    onClick,
    bgColor,
    noBorder,
}: ButtonwithIconProps) => {
    return (
        <Stack spacing={2} direction="row">
            <Button
                variant="outlined"
                className="h-11 w-136 border-btn-color "
                sx={{
                    backgroundColor: bgColor,

                    borderColor: noBorder ? 'transparent' : '#3f51b5',
                    color: bgColor ? '#fff' : '#3f51b5',
                    '&:hover': {
                        backgroundColor: bgColor,
                        borderColor: noBorder ? 'transparent' : '#3f51b5',
                    },
                    ...sx,
                }}
                onClick={onClick}
            >
                {icon && <span className="mr-2  text-btn-color">{icon}</span>}
                <span className="text-sm ">{children}</span>
            </Button>
        </Stack>
    );
}
export default ButtonWithIcon;
