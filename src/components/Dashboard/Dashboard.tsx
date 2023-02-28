import React, {useState} from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Box,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle 
} from "@mui/material";
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logo from '../../assets/images/lftovrs_dark.png';
import { DataTable, NewIngredientForm } from '../../components';

//Styling:

// Navbar Section
const NavLogo = styled("img")({
    height: '2.5rem'
})

// Body Section
const BodyHeader = styled("div")({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2.5rem'
})

// Footer Section
const FooterContainer = styled("div")({
    backgroundColor: '#324E40',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem 8rem 2rem 4rem'
})

const FooterContainer2 = styled("div")({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
})

const FooterLogo = styled("img")({
    height: '2.5rem'
})
// End of Styling

export const Dashboard = () => {
    const [dialogOpen, setDialogOpen] = useState(false);

    // Handle Dialog Open/Close
    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    }

    const handleDialogClickClose = () => {
        setDialogOpen(false);
    }

    return (
        <Box>
            <AppBar sx={{height: '5.5rem'}} position="static" color="secondary">
                <Toolbar sx={{display:'flex', justifyContent:'space-between', marginTop:'.5rem'}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        component={Link} to='/dashboard'
                        sx={{ mr: 2, marginLeft: '2rem' }}
                    >
                        <NavLogo src={`${logo}`} alt='logo' />    
                    </IconButton>
                    <Box>
                        <Button sx={{marginRight:'2rem'}} color="inherit" component={Link} to='/browse'>Browse</Button>
                        <Button sx={{marginRight:'2rem'}} color="primary" variant="contained" component={Link} to='/signout'>Sign Out</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{height: '50rem', margin: '2.5rem 5rem 5rem 5rem'}}>
                <BodyHeader>
                    <h1>My Ingredients</h1>
                    <Button onClick={handleDialogClickOpen} variant='contained'>Add</Button>
                </BodyHeader>

                <Dialog open={dialogOpen} onClose={handleDialogClickClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add New Ingredient</DialogTitle>
                    <DialogContent>
                        <NewIngredientForm />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick = {handleDialogClickClose} color="primary">Cancel</Button>
                    </DialogActions>
                </Dialog>

                <DataTable />
            </Box>

            <FooterContainer>
                <FooterLogo src={`${logo}`} alt='logo' />
                <div className='footer'>
                    <h2>Contact Us:</h2>
                    <FooterContainer2>
                        <EmailIcon />
                        <p className='contact'>lftovrs.support@example.com</p>
                    </FooterContainer2>
                    <FooterContainer2>
                        <LinkedInIcon />
                        <a className='contact' href='https://www.linkedin.com/in/jeongwang/' target="_blank">LinkedIn</a>
                    </FooterContainer2>       
                </div>
            </FooterContainer>
        </Box>
        
    )
}