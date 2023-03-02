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

let recipeInfo:any = [];
store.getState().api1.forEach((element:any) => {
    let recipe = {
        'img': element.image,
        'title': element.title,
        'used': element.usedIngredientCount,
        'missed': element.missedIngredientCount
    }
    recipeInfo.push(recipe)
})

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
    },
];

export const Browse = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    
    console.log(store.getState().api1);
    console.log(store.getState().api2);
    console.log(recipeInfo)

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
                        <Button sx={{marginRight:'2rem'}} color="inherit" component={Link} to='/dashboard'>My Ingredients</Button>
                        <Button sx={{marginRight:'2rem'}} color="primary" variant="contained" onClick={logOut}>Sign Out</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{margin: '2.5rem 5rem 5rem 5rem'}}>
                <h1 style={{marginBottom: '2.5rem'}}>Browse Recipes</h1>
                <ImageList sx={{ width: 'inherit' }} cols={4}>
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