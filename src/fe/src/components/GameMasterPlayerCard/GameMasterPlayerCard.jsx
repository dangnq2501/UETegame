// import type { NextPage } from "next";
import React from "react";
import {
    Typography,
    Box,
    Avatar,
    LinearProgress
}
    from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import PropTypes from 'prop-types';

// Images
import users from '../../assets/images/users.png'
import city from '../../assets/images/city.gif'

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 2 }}>
                <LinearProgress variant="determinate" {...props} sx={{
                    height: '24px',
                    borderRadius: '10px',
                    backgroundColor: 'transparent',
                    border: '1px solid #E4E4E4',
                    '& > span': {
                        backgroundColor: '#FF2626'
                    }
                }} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body1" color="#fff">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

const GameMasterPlayerCard = ({data}) => {
    console.log('GMP Data: ',data)

    return (
        <Grid container sx={{ backgroundColor: '#373737', padding: '8px', borderRadius:'10px' }} >
            <Grid xs={1} sx={{ display: 'flex', alignItems: 'center' }} >
                <Typography variant='body1' sx={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#fff'
                }}>
                    {data.rank ? data.rank : 1}
                </Typography>
            </Grid>
            <Grid xs={3} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }} >
                <Avatar src={data.ava_src ? data.ava_src : city} alt='ava' />
                <Typography variant='body1' sx={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#fff'
                }}>
                    {data.user.uname ? data.user.uname : 'Nhat Minh'}
                </Typography>
            </Grid>
            <Grid xs={2} sx={{ display: 'flex', alignItems: 'center' }} >
                <Typography variant='body1' sx={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#fff'
                }}>
                    {data.points ? data.points : 0}
                </Typography>
            </Grid>
            <Grid xs={2} sx={{ display: 'flex', alignItems: 'center' }} >
                <Box sx={{ width: '80%' }}>
                    <LinearProgressWithLabel value={data.progress ? data.progress : 0} />
                </Box>

            </Grid>
            <Grid xs={2} sx={{ display: 'flex', alignItems: 'center' }} >
                <Typography variant='body1' sx={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#fff'
                }}>
                    {`${data.totCnt ? data.totCnt : 0}/${data.qNum ? data.qNum : 1}`}
                </Typography>
            </Grid>
        </Grid>

    )
};

export default GameMasterPlayerCard;