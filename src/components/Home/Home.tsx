import React from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';
import heroLogo from '../../assets/images/lftovrs_light.png';
import footerLogo from '../../assets/images/lftovrs_dark.png';
import filler from '../../assets/images/formfiller.png';
import bodyImg1 from '../../assets/images/example1.png';
import bodyImg2 from '../../assets/images/example2.png';
import dish1 from '../../assets/images/dish1.png';
import dish2 from '../../assets/images/dish2.png';
import dish3 from '../../assets/images/dish3.png';
import dish4 from '../../assets/images/dish4.png';
import dish5 from '../../assets/images/dish5.png';
import { SignUpForm } from '../../components';

interface Props{
    title: string;
}

// Beginning of Styling:
const Root = styled("div")({
    padding: 0,
    margin: 0,
})

// Hero Section:
const Hero = styled("div")({
    backgroundColor: '#ECEFEE'
})

const HeroContainer = styled("div")({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2rem 4rem 2rem 4rem',
    alignItems: 'center'
})

const HeroContainer2 = styled("div")({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
})

const HeroLogo = styled("img")({
    height: '3rem'
})

const HeroBody = styled("div")({
    marginRight: '5rem',
    paddingTop: '2rem'
})

const HeroImg = styled("img")({
    height: '20rem',
    marginRight: '3rem'
})

// Body Section:
const BodyContainer = styled("div")({
    display: 'flex',
    justifyContent: 'space-evenly',
})

const BodyImg = styled("img")({
    height: '35rem',
    width: '35rem',
    marginBottom: '2rem'
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

// generate random dish image for hero section
let dishes = [dish1, dish2, dish3, dish4, dish5];
let size = dishes.length
let x = Math.floor(size*Math.random())

export const Home = ( props:Props) => {
    return (
        <Root>
            <Hero>
                <HeroContainer>
                    <HeroLogo src={`${heroLogo}`} alt='logo' />
                    <Button variant='contained' color='primary' component={Link} to='/signin'>Sign In</Button>
                </HeroContainer>
                
                <HeroContainer>
                    <HeroBody>
                        <h1 id="hero-header">Waste Less. Create More.</h1>
                        <p id="hero-body">You love trying new recipes. However, you don't know what to do with your leftover ingredients. Do you just throw them away? No! 
                            With lftovrs you can store all of your leftover ingredients, and find new recipes that can use those ingredients!</p>
                        <HeroContainer2>
                            <Button sx={{border: '.15rem solid'}} variant="outlined" color='success' href="#body-header">Learn More</Button>
                            <HeroImg src={dishes[x]} alt="food image" />
                        </HeroContainer2>
                    </HeroBody>

                    <div className='signup'>
                        <h1 style={{textAlign: 'center', marginBottom:'2rem'}}>Create an Account Today!</h1>
                        <SignUpForm />
                    </div>
                </HeroContainer>
            </Hero>

            <div id='main'>
                <h1 id='body-header'>How It Works</h1>
                <BodyContainer>
                    <div className="body">
                        <BodyImg src={`${bodyImg1}`} />
                        <h3 className='body-text body-text-steps' style={{color: '#689780'}}>Step 1:</h3>
                        <h2 className='body-text'>Add your leftover ingredients.</h2>
                        <p className='body-text'>You can add any leftover ingredients you have in your home, and delete them once you used them. To update your leftover ingredients list, click "Edit List". 
                            Once you have entered all of your ingredients, click "Browse" on the top right corner of the page to browse recipes.</p>
                    </div>
                    <div className="body">
                        <BodyImg src={`${bodyImg2}`} />
                        <h3 className='body-text body-text-steps' style={{color: '#689780'}}>Step 2:</h3>
                        <h2 className='body-text'>Browse recipes.</h2>
                        <p className='body-text'>In the browse section, you can view all of the recipes you can make with your ingredients. Sometimes, you won't have every ingredients you need for a recipe, but fear not! 
                            The browse page will still show recipes that has the highest ingredients match, so you can decide if the recipes is still doable with missing ingredients.</p>
                    </div>
                </BodyContainer>
            </div>

            <FooterContainer>
                <FooterLogo src={`${footerLogo}`} alt='logo' />
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
        </Root>
    )
}