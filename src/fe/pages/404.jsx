import * as React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Image from 'next/image';

import { SEO } from '../components/SEO';

// Images
import bg3 from '../assets/images/bg3.jpg'

const Custom404 = () => {
    return (
        <>
            <SEO
                url={`${'https://UETegame.games'}/404`}
                openGraphType="website"
                schemaType="article"
                title={`404 - Not Found`}
                description={"Uh oh, you have found the outer land!"}
                image={"https://images.unsplash.com/photo-1656312193617-b8d43d0b9535?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"}
            />
            <Box component='section' sx={(theme) => ({
                backgroundColor: '##F0F4FF',
            })}>
                <Container maxWidth='xl' sx={{ padding: '6% 2% !important' }} >
                    <Grid container spacing={8} sx={{}}>
                        <Grid xs={6} sx={{ display: 'flex', justifyContent: 'center' }} >
                            <Image src={bg3} alt='background' style={{
                                aspectRatio: '1/1',
                                width: '80%',
                                height: 'auto',
                                objectFit: 'cover',
                                borderRadius: '12px'
                            }} />
                        </Grid>
                        <Grid xs={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                            <Typography variant='h1' sx={{
                                color: '#1E1E1E',
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 'bold',
                                fontSize: '128px'
                            }}>
                                404
                            </Typography>
                            <Typography variant='h4' sx={{
                                color: '#013370',
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 'bold',
                                paddingTop: '72px',
                                paddingBottom: '32px'
                            }}>
                                Uh oh, outer land.
                            </Typography>
                            <Typography variant='body1' sx={{
                                color: '#6E84AB',
                                fontFamily: 'Poppins, sans-serif',
                                textAlign: 'center',
                                paddingBottom: '32px'
                            }} >
                                We've explored deep and wide, <br />
                                but we can't find the page you were looking for.
                            </Typography>

                            <Button
                                component='a'
                                href='/'
                                variant='contained'
                                sx={{
                                    backgroundColor: '#0698F9',
                                    color: '#fff',
                                    padding: '10px 24px',
                                    borderRadius: '0px'
                                }}
                            >
                                Navigate back home
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>

    )
}

export default Custom404;
