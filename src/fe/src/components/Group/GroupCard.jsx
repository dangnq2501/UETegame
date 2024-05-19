import React from "react";
import {
    Typography,
    Box,
    Button,
    Container,
}
    from '@mui/material';

import Image from "next/image";

// Icons
import PeopleIcon from '@mui/icons-material/People';

import image1 from '../../assets/images/login_bg.jpg'

const GroupCard = ({ data }) => {
    console.log('Group Card Data: ', data)
    if (data) {
        return (
            <Box sx={{
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.60)',
                display: 'flex',
                padding: '12px',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '16px',
                marginBottom: '16px'
            }} >
                <Box sx={{ display: 'flex', gap: '24px', alignItems: 'center' }} >
                    <Image
                        src={image1}
                        width={80}
                        height={80}
                        style={{
                            objectFit: 'cover',
                            aspectRatio: '1/1',
                            width: '80px',
                            height: 'auto',
                            borderRadius: '12px'
                        }}
                    />
                    <Box>
                        <Typography variant='body1' sx={{
                            color: '#11315B',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 'bold',
                        }} >
                            {data.name ? data.name : 'Blank'}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            gap: '8px'
                        }} >
                            <PeopleIcon />
                            <Typography variant="body2" sx={{
                                color: '#9D9BB9',
                                fontFamily: 'Poppins, sans-serif',
                            }} >
                                {data.description ? data.description : 'Blank'}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Button
                    component='a'
                    href={`/group/${data.groupId}`}
                    variant='outlined'
                    sx={{
                        borderRadius: '8px',
                        border: '2px solid #BDCADB',
                        fontFamily: 'Poppins, sans-serif',
                        color: '#11315B',
                        padding: '10px 20px',
                        height: 'fit-content'
                    }} >
                    Enter
                </Button>

            </Box>
        )
    }

}

export default GroupCard;