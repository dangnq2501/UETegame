import * as React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
// import { useRouter } from 'next/router'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image'

import planet from '../../assets/images/planet.gif'
import flower from '../../assets/images/flower.png'
import gear from '../../assets/images/Gear.png'
import etherium from '../../assets/images/etherium.png'
import ellipse1 from '../../assets/images/Ellipse.png'
import ellipse2 from '../../assets/images/Ellipse2.png'
import ellipse3 from '../../assets/images/Ellipse3.png'

export const HeroSection = ({ loading, backgroundImg, title, description = null, isButton = false }) => {

    return (
        <Box component='section' className="HeroSection" id='hero_section' sx={(theme) => ({
            backgroundColor: '#013370',
        })}>
            <Container maxWidth='xl' sx={{ padding: '0 2% !important' }} >
                <Grid container>
                    <Grid xs={5}>
                        <Typography variant='h1'
                            sx={(theme) => ({
                                fontFamily: 'Inter, san-serif',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: '4rem',
                                pt: '16%',
                                // width: { md: '60%', xs: '70%' },
                                [theme.breakpoints.down("md")]: {
                                    fontSize: '3.5rem',
                                },
                                [theme.breakpoints.down("sm")]: {
                                    fontSize: '2rem',
                                },

                            })}
                        >
                            {title ? title : ''}
                        </Typography>
                        <Typography variant='body1'
                            sx={(theme) => ({
                                fontFamily: 'Inter, san-serif',
                                color: '#BDCADB',
                                fontSize: '1rem',
                                pt: 4,
                                // width: { md: '55%', xs: '76%' },
                                display: { md: 'block', xs: 'none' },
                            })}
                        >
                            {description ? description : ''}
                        </Typography>

                        {isButton && (
                            <Box sx={{
                                pt: "8%",
                                pb: "18%",
                            }}>
                                <Button
                                    variant='contained'
                                    endIcon={<ArrowForwardIcon />}
                                    sx={(theme) => ({
                                        borderRadius: '12px',
                                        background: 'var(--primary-101, linear-gradient(214deg, #0698F9 0%, #F906F9 100%))',
                                        fontFamily: 'Inter, san-serif',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        textTransform: 'capitalize',
                                        padding: '10px 16px',
                                        "&:hover": {
                                            backgroundColor: '#EDF2F7'
                                        },
                                        [theme.breakpoints.down("md")]: {
                                            fontSize: '0.5rem'
                                        },
                                    })}
                                >
                                    Sign Up Now
                                </Button>
                            </Box>
                        )}
                    </Grid>


                    <Grid xs={7} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        position: 'relative',
                        pt:6,
                        pb:6
                    }} >
                        <Image
                            src={planet}
                            width={450}
                            height={450}
                            alt='planet'
                            style = {{
                                marginTop:'24px'
                            }}
                        />
                        {/* Flower */}
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            transform: 'rotate(8deg)',
                            flexShrink: 0,
                        }} >
                            <Image
                                src={flower}
                                width={'100%'}
                                height={'100%'}
                                alt="flower"
                                style={{
                                    position: 'relative'
                                }}
                            />
                            <Image
                                src={ellipse1}
                                width={'100%'}
                                height={'100%'}
                                alt="flower"
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: '12px'
                                }}
                            />
                        </Box>
                        {/* Gear */}
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            flexShrink: 0,
                        }}>
                            <Image
                                src={gear}
                                width={'100%'}
                                height={'100%'}
                                alt="gear"
                                style={{
                                    position:'relative'
                                }}
                            />
                            <Image
                                src={ellipse2}
                                width={'100%'}
                                height={'100%'}
                                alt="flower"
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0
                                }}
                            />
                        </Box>
                        {/* Etherium */}
                        <Box sx={{
                            position: 'absolute',
                            bottom: '-48px',
                            right: 0,
                            transform: 'rotate(-2.091deg)',
                            flexShrink: 0,
                        }}>
                            <Image
                                src={etherium}
                                width={'100%'}
                                height={'100%'}
                                alt="etherium"
                                style={{
                                    position: 'relative',
                                }}
                            />
                            <Image
                                src={ellipse3}
                                width={'100%'}
                                height={'100%'}
                                alt="flower"
                                style={{
                                    position: 'absolute',
                                    bottom: '-36px',
                                    left:0,
                                }}
                            />
                        </Box>

                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
