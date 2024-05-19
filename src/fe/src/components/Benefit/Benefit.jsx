import * as React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Image from 'next/image';

// Images
import school_work from '../../assets/images/school-work.png'
import health_fitness from '../../assets/images/health-fitness.png'
import much_more from '../../assets/images/much-more.png'
import dcdw from '../../assets/images/double-caret-down-white.png'

const Benefit = () => {

    return (
        <Box
            component='section'
            className='MainFeatureSection'
            id='benefit_section'
            sx={(theme) => ({
                pt: 12,
                pb: 12,
                backgroundColor: '#21204A'
            })}
        >
            <Container maxWidth='xl' sx={{ padding: '0 2% !important' }} >
                <Typography variant='h2'
                    sx={(theme) => ({
                        textAlign: 'center',
                        backgroundClip: 'text',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 600,
                        color: '#fff'
                    })}
                >
                    UETegame Helps You
                </Typography>

                <Grid container sx={{ paddingTop: '8%' }} >
                    <Grid xs={4} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                    >
                        <Image
                            src={school_work}
                            width={272}
                            height={272}
                            alt='school work'
                            style={{

                            }}
                        />

                        <Typography
                            variant='h5'
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 'bold',
                                color: '#fff',
                                textAlign: 'center',
                                paddingTop: '24px'
                            }}
                        >
                            Generate Game From File
                        </Typography>

                        <Typography
                            variant='body1'
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                color: '#fff',
                                textAlign: 'center',
                                paddingTop: '12px',
                                paddingLeft: '8%',
                                paddingRight: '8%'
                            }}
                        >
                            Tự động quét các câu hỏi và câu trả lời từ file câu hỏi của giáo viên và tạo 1 RPG game cho học sinh tham gia tương tác.
                        </Typography>
                    </Grid>

                    <Grid xs={4} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                    >
                        <Image
                            src={health_fitness}
                            width={272}
                            height={272}
                            alt='school work'
                            style={{

                            }}
                        />

                        <Typography
                            variant='h5'
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 'bold',
                                color: '#fff',
                                textAlign: 'center',
                                paddingTop: '24px'
                            }}
                        >
                            Keep Your Motivation
                        </Typography>

                        <Typography
                            variant='body1'
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                color: '#fff',
                                textAlign: 'center',
                                paddingTop: '12px',
                                paddingLeft: '8%',
                                paddingRight: '8%'
                            }}
                        >
                            Bằng cách tạo ra một trò chơi mang tính tương tác, cạnh tranh cao và khả năng tùy chỉnh nhân vật để tạo động lực cho người chơi học tập một cách hiệu quả.
                        </Typography>

                    </Grid>

                    <Grid xs={4} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                    >
                        <Image
                            src={much_more}
                            width={272}
                            height={272}
                            alt='school work'
                            style={{

                            }}
                        />

                        <Typography
                            variant='h5'
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 'bold',
                                color: '#fff',
                                textAlign: 'center',
                                paddingTop: '24px'
                            }}
                        >
                            Keep contact with friends
                        </Typography>

                        <Typography
                            variant='body1'
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                color: '#fff',
                                textAlign: 'center',
                                paddingTop: '12px',
                                paddingLeft: '8%',
                                paddingRight: '8%'
                            }}
                        >
                            Cùng bạn bè giải quyết những vấn đề hóc búa vả leo rank tuần, tháng để nhận được những phần quà thú vị.
                        </Typography>

                    </Grid>
                </Grid>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '4%'
                }}
                >
                    <Image
                        src={dcdw}
                        alt='arrow'
                        objectFit='contain'
                    />
                </Box>
            </Container>
        </Box>
    )
}

export default Benefit;
