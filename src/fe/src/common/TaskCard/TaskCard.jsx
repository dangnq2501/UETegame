// import type { NextPage } from "next";
import React from "react";
import {
    Typography,
    Box,
} from '@mui/material';
import Image from "next/image";

// Images
import wizard_staff from '../../assets/images/wizard_staff.png'

const TaskCard = ({ img_src, title, description }) => {


    return (
        <Box sx={{
            display: 'flex',
            backgroundColor: '#fff',
            padding: '12px',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.25)',
            borderRadius: '5px',
            cursor:'pointer',
            // transition:'0.3s',
            // transitionTimingFunction: 'ease-in',
            // '&:hover':{
            //     opacity:'0'
            // }
        }}>
            <Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold', fontFamily: 'Poppins,sans-serif' }}>
                    {title}
                </Typography>
                <Typography variant='body1' sx={{ fontFamily: 'Poppins, sans-serif' }}>
                    {description}
                </Typography>
            </Box>
            <Image src={img_src ? img_src : wizard_staff} alt='present' style={{
                aspectRatio: '1/1',
                height: 'auto',
                width: '64px'
            }} />
        </Box>
    )
}

export default TaskCard