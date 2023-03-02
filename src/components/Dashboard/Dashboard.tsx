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
    DialogTitle,
    ImageList,
    ImageListItem,
    ImageListItemBar,
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { getAuth, signOut } from 'firebase/auth';
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

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        author: '@bkristastucchio',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
        author: '@rollelflex_graphy726',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        author: '@helloimnik',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        author: '@nolanissac',
    }
];

export const Dashboard = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const auth = getAuth();
    const navigate = useNavigate();


    // Handle Dialog Open/Close
    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    }

    const handleDialogClickClose = () => {
        setDialogOpen(false);
    }

    const logOut = async () => {
        await signOut(auth);
        navigate('/');
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
                        <Button sx={{marginRight:'2rem'}} color="primary" variant="contained" onClick={logOut}>Sign Out</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{height: '80rem', margin: '2.5rem 5rem 5rem 5rem'}}>
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

                <Box sx={{marginTop: '5rem'}}>
                    <h1>Quick Picks</h1>
                    <ImageList sx={{ width: 'inherit', marginTop: '2rem' }} cols={4}>
                        {itemData.map((item:any) => (
                            <ImageListItem key={item.img}>
                            <img
                                src={`${item.img}?w=450&h=450&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=450&h=450&fit=crop&auto=format&dpr=2 3x`}
                                alt={item.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.title}
                                subtitle={`hello`}
                                actionIcon={
                                    <IconButton
                                        onClick={()=> window.open('https://stackoverflow.com/')}
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${item.title}`}
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
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