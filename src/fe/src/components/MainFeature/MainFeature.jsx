import * as React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Image from 'next/image';
import AspectRatio from '@mui/joy/AspectRatio';

// Image
import gameplay from '../../assets/images/gameplay.png'
import boss from '../../assets/images/boss.jpg'
import eyeball from '../../assets/images/eyeball.png'
import metalworm from '../../assets/images/metalworm.png'
import gun from '../../assets/images/gun.png'
import wizard from '../../assets/images/wizard.png'
import dcd from '../../assets/images/double-caret-down.png'

const MainFeature = () => {

    return (
        <Box
            component='section'
            className='MainFeatureSection'
            id='main_feature_section'
            sx={(theme) => ({
                pt: 12,
                pb: 12
            })}
        >
            <Container maxWidth='xl' sx={{ padding: '0 2% !important' }} >
                <Typography variant='h2'
                    className='MainFeatureTitle'
                    sx={(theme) => ({
                        textAlign: 'center',
                        backgroundClip: 'text',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 600,
                    })}
                >
                    Gamify Your <br />
                    Learning Experience
                </Typography>
                <Grid container rowSpacing={16} sx={{ pt: 6 }} >
                    {/* First Row */}

                    <Grid container>
                        <Grid xs={6} sx={{
                            paddingRight: '2%',
                            // paddingTop: '2%',
                            // paddingBottom: '2%',
                        }}>
                            <div style={{
                                borderRadius: '12px',
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '20px 20px 30px 0px rgba(124, 65, 154, 0.10)',
                                border: '16px solid #fff'
                            }} >
                                <Image
                                    src={gameplay}
                                    width={572}
                                    height={400}
                                    alt='gameplay'
                                    style={{
                                        width: '-webkit-fill-available',
                                        layout: 'fill',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                        </Grid>

                        <Grid xs={6}
                            sx={{
                                padding: '0 4%',
                                margin: 'auto'
                            }}
                        >
                            <Typography variant='h4' sx={(theme) => ({
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 600,
                                fontStyle: 'normal',
                            })}
                            >
                                Convert exam to Pixel Game
                            </Typography>
                            <Typography variant='body1' sx={(theme) => ({
                                fontFamily: 'Poppins, sans-serif',
                                color: '#64609F',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                pt: 2
                            })}
                            >
                                Frustrated because of boring paper exam? Try our Game-like exam to enhance your learning experience
                            </Typography>
                            <Button
                                variant='outlined'
                                sx={{
                                    textTransform: 'capitalize',
                                    color: '#013370',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 'bold',
                                    mt: 4,
                                    padding: '8px 20px',
                                    borderRadius: '12px'
                                }}
                            >
                                Try Now!
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Second Row */}

                    <Grid container>
                        <Grid xs={6}
                            sx={{
                                paddingRight: '4%',
                                margin: 'auto'
                            }}
                        >
                            <Typography variant='h4' sx={(theme) => ({
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 600,
                                fontStyle: 'normal',
                            })}
                            >
                                Fight boss and compete with other players
                            </Typography>
                            <Typography variant='body1' sx={(theme) => ({
                                fontFamily: 'Poppins, sans-serif',
                                color: '#64609F',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                pt: 2
                            })}
                            >
                                Fight monsters with other players! Become the first player to kill the boss in order to recieve more point and rewards.
                            </Typography>
                            <Button
                                variant='outlined'
                                sx={{
                                    textTransform: 'capitalize',
                                    color: '#013370',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 'bold',
                                    mt: 4,
                                    padding: '8px 20px',
                                    borderRadius: '12px'
                                }}
                            >
                                Join Now!
                            </Button>
                        </Grid>
                        <Grid xs={6} sx={{
                            paddingRight: '2%',
                            // paddingTop: '2%',
                            // paddingBottom: '2%',
                        }}>
                            <Grid container spacing={6} sx={{ justifyContent: 'center' }}>
                                <Grid xs={7}>
                                    <div style={{
                                        aspectRatio: 'auto 1/1',
                                        width: '330px',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        boxShadow: '20px 20px 30px 0px rgba(124, 65, 154, 0.10)',
                                    }}>
                                        <Image
                                            src={boss}
                                            width={330}
                                            height={330}
                                            alt='boss'
                                            // layout="fill"
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>

                                </Grid>
                                <Grid xs={5} >
                                    <div style={{
                                        aspectRatio: '1 / 1',
                                        // height: '100%',
                                        width: '170px',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        marginTop: '24px',
                                        marginBottom: '48px',
                                        boxShadow: '20px 20px 30px 0px rgba(124, 65, 154, 0.10)',
                                    }}>
                                        <Image
                                            src={eyeball}
                                            width={170}
                                            height={170}
                                            alt='eyeball'
                                            style={{
                                                objectFit: 'cover',
                                                background: 'rgba(215, 214, 220, 0.20'
                                            }}
                                        />
                                    </div>
                                    <div style={{
                                        aspectRatio: '1 / 1',
                                        // height: '100%',
                                        width: '125px',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        boxShadow: '20px 20px 30px 0px rgba(124, 65, 154, 0.10)',
                                    }}>
                                        <Image
                                            src={metalworm}
                                            width={125}
                                            height={125}
                                            alt='metalworm'
                                            style={{
                                                objectFit: 'cover',
                                                background: 'rgba(215, 214, 220, 0.20'
                                            }}
                                        />
                                    </div>

                                </Grid>
                            </Grid>


                        </Grid>
                    </Grid>

                    {/* Third Row */}
                    <Grid container>
                        <Grid xs={6} sx={{
                            paddingRight: '2%',
                            // paddingTop: '2%',
                            // paddingBottom: '2%',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <Box style={{
                                borderRadius: '12px',
                                overflow: 'hidden',
                                background: '#fff',
                                padding: '16px',
                                boxShadow: '20px 20px 30px 0px rgba(124, 65, 154, 0.10)',
                                width: 'fit-content',
                                height: 'min-content',
                                marginTop: '10%'
                            }}>
                                <Image
                                    src={gun}
                                    width={250}
                                    height={250}
                                    alt='gun'
                                    objectFit='contain'
                                    style={{
                                        background: '#f9f8ff',
                                        borderRadius: '12px',
                                        objectFit: 'contain'
                                    }}
                                />
                                <Typography
                                    variant='body1'
                                    sx={{
                                        fontWeight: 'bold',
                                        fontFamily: 'Poppins, sans-serif',
                                        paddingBottom: '2px',
                                        paddingTop: '6px',
                                        fontSize: '14px'
                                    }}
                                >
                                    Laze Gun
                                </Typography>
                                <Typography
                                    variant='body1'
                                    sx={{
                                        color: '#6E84AB',
                                        fontWeight: 400,
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '14px'
                                    }}
                                >
                                    100 coins
                                </Typography>
                            </Box>
                            <Box style={{
                                borderRadius: '12px',
                                overflow: 'hidden',
                                background: '#fff',
                                padding: '16px',
                                boxShadow: '20px 20px 30px 0px rgba(124, 65, 154, 0.10)',
                                width: 'fit-content',
                                height: 'min-content'
                            }}>
                                <Image
                                    src={wizard}
                                    width={250}
                                    height={250}
                                    alt='wizard'
                                    objectFit='contain'
                                    style={{
                                        background: '#f9f8ff',
                                        borderRadius: '12px',
                                        objectFit: 'contain'
                                    }}
                                />
                                <Typography
                                    variant='body1'
                                    sx={{
                                        fontWeight: 'bold',
                                        fontFamily: 'Poppins, sans-serif',
                                        paddingBottom: '2px',
                                        paddingTop: '6px',
                                        fontSize: '14px'
                                    }}
                                >
                                    Wizard Skin
                                </Typography>
                                <Typography
                                    variant='body1'
                                    sx={{
                                        color: '#6E84AB',
                                        fontWeight: 400,
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '12px'
                                    }}
                                >
                                    289 coins
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid xs={6}
                            sx={{
                                padding: '0 4%',
                                margin: 'auto'
                            }}
                        >
                            <Typography variant='h4' sx={(theme) => ({
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 600,
                                fontStyle: 'normal',
                            })}
                            >
                                Customize your own character
                            </Typography>
                            <Typography variant='body1' sx={(theme) => ({
                                fontFamily: 'Poppins, sans-serif',
                                color: '#64609F',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                pt: 2
                            })}
                            >
                                Use point and reward you got from previous game to buy skin and other item to personalize your own character.
                            </Typography>
                            <Button
                                variant='outlined'
                                sx={{
                                    textTransform: 'capitalize',
                                    color: '#013370',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 'bold',
                                    mt: 4,
                                    padding: '8px 20px',
                                    borderRadius: '12px'
                                }}
                            >
                                Discover more!
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '4%'
                }}
                >
                    <Image
                        src={dcd}
                        alt='arrow'
                        objectFit='contain'
                    />
                </Box>
            </Container>
        </Box>

    )
}

export default MainFeature;
