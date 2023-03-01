import React from 'react';
import { 
    Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import signinPoster from '../../assets/images/signin.png';
import { SignInForm } from '../../components';

interface UserProps { 
    email?: any,
    password?: any
}

export const SignIn = (props:UserProps) => {

    return (
        <Box>
            <div className="split left">
                <div className="centered">
                    <img src={signinPoster} alt="Sign In Image" />  
                </div>
            </div>

            <div className="split right">
                <div className="centered">
                    <h1>Welcome Back!</h1>
                    <p className='create-acc'>Don't have an account? <Link to='/' style={{color: '#689780'}}>Create an account</Link></p>
                    <SignInForm />
                </div>
            </div> 
        </Box>

    )
}

