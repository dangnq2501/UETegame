// import type { NextPage } from "next";
import React from "react";
import {
    Typography,
    Box,
    Button
}
    from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Image from "next/image";
import PropTypes from 'prop-types';

import GameMasterPlayerCard from "../GameMasterPlayerCard/GameMasterPlayerCard";

// Images
import users from '../../assets/images/users.png'
import city from '../../assets/images/city.gif'

const Leaderboard = ({data}) => {
    console.log('Leaderboard: ', data)

    return (
        <Box sx={{
            width: '80%',
            height: '400px',
            backgroundColor: 'rgba(36, 36, 36, 0.70)',
            borderRadius: '5px',
            marginTop: '4%'
        }} >
            <Box sx={{
                width: '100%',
                backgroundColor: 'rgba(36, 36, 36, 0.85)',
                display: 'flex',
                padding: '20px',
                justifyContent: 'space-between',
                borderRadius: '5px 5px 0px 0px'
            }} >
                <Box sx={{
                    display: 'flex',
                    gap: '16px'
                }} >
                    <Image src={users} width={24} height={24} style={{

                    }} />
                    <Typography variant='h6' sx={{
                        color: '#fff',
                        fontFamily: 'Poppins, sans-serif'
                    }}>
                         players
                    </Typography>
                </Box>
                {/* After finish game => This appear to let game master back to dashboard */}
                <Button
                    component='a'
                    href='/dashboard'
                    variant='outlined'
                    sx={{
                        border: '1px solid #E4E4E4',
                        color: '#fff',
                        '&:hover': {
                            borderColor: '#fff'
                        }
                    }}>
                    Back to Dashboard
                </Button>

            </Box>

            <Box sx={{
                padding: '16px 32px'
            }} >
                <Grid container sx={{ borderBottom: '1px solid #fff' }} >
                    <Grid xs={1}>
                        <Typography variant='h6' sx={{
                            fontFamily: 'Poppins, sans-serif',
                            color: '#fff'
                        }}>
                            Rank
                        </Typography>
                    </Grid>
                    <Grid xs={3}>
                        <Typography variant='h6' sx={{
                            fontFamily: 'Poppins, sans-serif',
                            color: '#fff'
                        }}>
                            Name
                        </Typography>
                    </Grid>
                    <Grid xs={2}>
                        <Typography variant='h6' sx={{
                            fontFamily: 'Poppins, sans-serif',
                            color: '#fff'
                        }}>
                            Points
                        </Typography>
                    </Grid>
                    <Grid xs={2}>
                        <Typography variant='h6' sx={{
                            fontFamily: 'Poppins, sans-serif',
                            color: '#fff'
                        }}>
                            Progress
                        </Typography>
                    </Grid>
                    <Grid xs={2}>
                        <Typography variant='h6' sx={{
                            fontFamily: 'Poppins, sans-serif',
                            color: '#fff'
                        }}>
                            Answered
                        </Typography>
                    </Grid>
                </Grid>

                <Box sx={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {console.log('ball: ',data)}
                    {data && data.map((item, index) => {
                        return (
                            <GameMasterPlayerCard data={item} key={index} />
                        )
                    })}
                </Box>


            </Box>

        </Box>
    )
};

export default Leaderboard;