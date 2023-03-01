import React, { forwardRef } from 'react';
import { TextField,
        OutlinedInput,
        InputAdornment,
        IconButton,
        Box
        } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface inputType{
    name: string;
    placeholder: string;
}

export const Input = forwardRef((props:inputType, ref) => {
    return (
        <TextField
            variant="outlined"
            inputRef={ref}
            fullWidth
            type='text'
            style={{marginTop: '.5rem', marginBottom: '1rem'}}
            {...props}
        ></TextField>
    );
});

export const Input2 = forwardRef((props:inputType, ref)=> {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Box>
        <OutlinedInput
            required={true}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
            fullWidth
            inputProps={{
                autoComplete: 'new-password',
                form: {
                    autoComplete: 'off',
                },
                placeholder: 'Enter password'
            }}
            style={{marginTop: '.5rem', marginBottom: '1rem'}}
            inputRef={ref}
            {...props}
        />
        </Box>
    );
    
})