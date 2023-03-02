import * as React from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    IconButton
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { getAuth, signOut } from 'firebase/auth';
import logo from '../../assets/images/lftovrs_dark.png';
import { store } from '../../redux/store';

//Styling:

// Navbar Section
const NavLogo = styled("img")({
    height: '2.5rem'
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

let recipes = JSON.parse(localStorage.getItem(localStorage.getItem('token') || '') || '[]');

export const Browse = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    const logOut = async () => {
        await signOut(auth);
        navigate('/');
    }

    console.log(recipes)

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
                        <Button sx={{marginRight:'2rem'}} color="inherit" component={Link} to='/dashboard'>My Ingredients</Button>
                        <Button sx={{marginRight:'2rem'}} color="primary" variant="contained" onClick={logOut}>Sign Out</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{margin: '2.5rem 5rem 5rem 5rem'}}>
                <h1 style={{marginBottom: '2.5rem'}}>Browse Recipes</h1>
                <ImageList sx={{ width: 'inherit', marginTop: '2rem' }} cols={4}>
                    {recipes.map((item:any) => (
                        <ImageListItem key={item.img}>
                        <img
                            src={`${item.img}?w=450&h=450&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=450&h=450&fit=crop&auto=format&dpr=2 3x`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.title}
                            subtitle={`used: ${item.used}, missing: ${item.missed}`}
                            actionIcon={
                                <IconButton
                                    onClick={()=> window.open(`${item.url}`)}
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
    );
}