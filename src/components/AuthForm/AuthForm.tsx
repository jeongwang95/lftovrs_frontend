import React, {useState} from 'react';
import firebase from 'firebase/app';
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword } from 'firebase/auth'
import { 
    Box,
    Container,
    Button,
    Typography,
    Snackbar,
    Alert as MUIAlert,
    AlertProps,
    AlertTitle,
    CircularProgress
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { Input, Input2 } from '../sharedComponents';
import { styled } from '@mui/system';
import { useForm } from 'react-hook-form';

interface userProps {
    email?: any,
    password?: any,
    confirmPassword?: any
}

export const SignInForm = (props: userProps) => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({}); 
    const auth = getAuth();

    // onSubmit to grab user info from form
    const onSubmit = async (data:any, event: any) => {
        console.log(data.email)
        console.log(data.password)

        if (!data.password || !data.email) {
            document.querySelector<any>('.error').innerHTML = 'please fill in missing information'
        } else {
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user.uid)
                    localStorage.setItem('token',user.uid)
                    navigate('/dashboard');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    let errorMessage = error.message.replace('Firebase: Error (auth\/', '');
                    errorMessage = errorMessage.replaceAll('-', ' ');
                    errorMessage = errorMessage.replace(').', '');
                    if (errorMessage == 'internal error'){
                        errorMessage = 'account does not exist'
                    }
                    document.querySelector<any>('.error').innerHTML = errorMessage
            });
        }
    }
    

    return (
        <Box sx={{width: '30vw'}}>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='email'>Email Address</label>
                    <Input {...register('email')} name='email' placeholder='Enter email address' />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <Input2 {...register('password')} name='password' placeholder='Enter password' />
                </div>
                <Button sx={{width: '100%', marginTop: '3rem'}} type='submit' variant='contained' color='primary'>Sign In</Button>
                <p className='error'></p>
            </form>
        </Box>
    )
}

export const SignUpForm = (props: userProps) => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({}); 
    const auth = getAuth();

    // onSubmit to grab user info from form
    const onSubmit = async (data:any, event: any) => {
        console.log(data.email)
        console.log(data.password)
        console.log(data.confirmPassword)

        if (!data.password || !data.email) {
            document.querySelector<any>('.error').innerHTML = 'please fill in missing information'
        } else if (data.password != data.confirmPassword) {
            document.querySelector<any>('.error').innerHTML = 'password and confirmation password does not match'
        } else {
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user.uid)
                    localStorage.setItem('token',user.uid)
                    navigate('/dashboard');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    let errorMessage = error.message.replace('Firebase: Error (auth\/', '');
                    errorMessage = errorMessage.replaceAll('-', ' ');
                    errorMessage = errorMessage.replace(').', '');
                    errorMessage = errorMessage.replace('Firebase: ', '');
                    errorMessage = errorMessage.replace(' (auth/weak password', '');
                    document.querySelector<any>('.error').innerHTML = errorMessage
            });
        }
    }
    

    return (
        <Box sx={{width: '25vw'}}>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='email'>Email Address</label>
                    <Input {...register('email')} name='email' placeholder='Enter email address' />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <Input2 {...register('password')} name='password' placeholder='Enter password' />
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <Input2 {...register('confirmPassword')} name='confirmPassword' placeholder='Enter password' />
                </div>
                <Button sx={{width: '100%', marginTop: '1rem'}} type='submit' variant='contained' color='primary'>Create an Account</Button>
                <p className='error'></p>
            </form>
        </Box>
    )
}