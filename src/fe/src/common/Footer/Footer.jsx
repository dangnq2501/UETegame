import * as React from 'react';
import { Container, Typography, Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router'
import { FacebookOutlined } from '@ant-design/icons';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Image from 'next/image'

// Images
import face from '../../assets/images/facebook.png'
import insta from '../../assets/images/instagram.png'
import tele from '../../assets/images/tele.png'

export const Footer = () => {
    const removeRoutes = ['/join','/login','/register']
    const router = useRouter()

    if (!removeRoutes.includes(router.pathname)) {
        return (
            <Box component="footer" sx={{ background: '#013370' }}>
                <Container maxWidth='xl'>
                    <Box sx={(theme) => ({
                        pt: '4%',
                        pb: '2%',
                        [theme.breakpoints.down("md")]: {
                            pb: '4%'
                        },
                    })} >
                        <Box sx={{ display: 'flex' }}>
                            <Grid container sx={{ width: '100%' }}>
                                <Grid xs={4}>
                                    <Typography component='a' href='/' variant='h4' sx={(theme) => ({
                                        fontFamily: 'Andy, sans-serif',
                                        fontWeight: 700,
                                        textDecoration: 'none',
                                        fontSize: '3rem',
                                        color: '#FFFFFF',
                                        [theme.breakpoints.down("md")]: {
                                            fontSize: '2rem',
                                        },
                                        [theme.breakpoints.down("sm")]: {
                                            fontSize: '1.5rem',
                                        },
                                    })}>
                                        UETegame
                                    </Typography>
                                    <Typography variant='body1' sx={{ color: '#BDCADB' }}>
                                        The world’s first website capable of generating RPG game from test file such as pdf, docx.!
                                    </Typography>
                                </Grid>

                                <Grid xs={8} sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end'
                                }} >
                                    <Typography variant='body1' sx={{ color: '#fff', fontWeight: 'bold' }} >
                                        Join our comunity
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        gap: '16px',
                                        paddingTop: '16px'
                                    }}
                                    >
                                        <Image
                                            src={face}
                                            width={20}
                                            height={20}
                                            alt='face'
                                        />
                                        <Image
                                            src={insta}
                                            width={20}
                                            height={20}
                                            alt='insta'
                                        />
                                        <Image
                                            src={tele}
                                            width={20}
                                            height={20}
                                            alt='tele'
                                        />
                                    </Box>
                                </Grid>
                            </Grid>


                        </Box>

                    </Box>
                    <Box sx={{
                        borderTop: '0.5px solid #11315B'
                    }}>
                        <Box sx={(theme) => ({
                            display: 'flex',
                            justifyContent: 'space-between',
                            py: '2%',
                            [theme.breakpoints.down("md")]: {
                                pt: '3%'
                            },
                        })}>
                            <Typography variant='body2'
                                sx={(theme) => ({
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '0.875rem',
                                    fontWeight: '400',
                                    color: '#D9DBE1',
                                    [theme.breakpoints.down("md")]: {
                                        fontSize: '0.65rem',
                                    },
                                })}
                            >
                                © 2024 UET-egame. All rights reserved
                            </Typography>
                            <Box component='a' href='https://www.facebook.com/profile.php?id=100080046103796' target={'_blank'}>
                                <FacebookOutlined spin={true} style={{ color: '#D9DBE1' }} />
                            </Box>
                        </Box>

                    </Box>
                </Container>
            </Box>
        );
    }
}
