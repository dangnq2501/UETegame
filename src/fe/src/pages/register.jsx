import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Input,
  FormHelperText
}
  from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Unstable_Grid2';
import Image from "next/image";
import { useRouter } from "next/router";
import { register } from "@/models/auth";

// Images
import register_bg from '../assets/images/register_bg.jpg'
import google from '../assets/images/google.png'
import face from '../assets/images/face.png'
import twitter from '../assets/images/twitter.png'

import { SEO } from "@/components/SEO";

const Register = () => {
  const router = useRouter();
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeName = (e) => {
    let data = e.target.value;
    setName(data)
  }
  const handleChangeEmail = (e) => {
    let data = e.target.value;
    setEmail(data)
  }
  const handleChangePassword = (e) => {
    let data = e.target.value;
    setPass(data)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name == '' || email == '' || pass == '') {
      console.log('No Data');
      return;
    };
    if (pass.match(/^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,}$/) && email.match(/^\S+@\S+\.\S+$/)) {
      await register(email, pass, { 'uname': name });
      // router.push('/');
    } else {
      console.log('Password not valid')
    }
  };

  return (
    <div>
      <SEO
        url={`${'https://UETegame.games'}/register`}
        openGraphType="website"
        schemaType="article"
        title={`Register`}
        description={"Register New User"}
        image={"https://images.unsplash.com/photo-1656312193617-b8d43d0b9535?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"}
      />
      <Box component='section' sx={(theme) => ({
        backgroundColor: '##F0F4FF',
        height: '100vh',
      })}>
        <Grid container sx={{
          height: '100%'
        }} >
          <Grid xs={5}
            sx={{
              backgroundImage: `url(${register_bg.src})`,
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'flex-end'
            }}
          >
            <Typography variant='h3'
              sx={{
                color: '#fff',
                fontFamily: 'Andy, sans-serif',
                padding: '16px'
              }}
            >
              UETegame
            </Typography>
          </Grid>
          <Grid xs={7}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography variant='h2'
              sx={{
                color: '#0B2F8A',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                lineHeight: 'normal'
              }} >
              Get Started.
            </Typography>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              alignItems: 'center',
              gap: '16px',
              marginTop: '16px'
            }}>
              <TextField
                id="name"
                label="Name"
                variant="standard"
                required
                sx={{
                  width: '60%',
                  m: 1,
                  '& > label': {
                    color: '#0B2F8A',
                    fontFamily: 'Inter, sans-serif'
                  },
                  '& > div::before': {
                    borderBottom: '2px solid rgba(21, 24, 109, 0.60)',
                  }
                }}
                value={name}
                onChange={handleChangeName}
              />

              <TextField
                id="email"
                label="Email"
                variant="standard"
                required
                sx={{
                  width: '60%',
                  m: 1,
                  '& > label': {
                    color: '#0B2F8A',
                    fontFamily: 'Inter, sans-serif'
                  },
                  '& > div::before': {
                    borderBottom: '2px solid rgba(21, 24, 109, 0.60)',
                  }
                }}
                value={email}
                onChange={handleChangeEmail}
              />

              <FormControl required sx={{ m: 1, width: '60%' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password"
                  sx={{
                    color: '#0B2F8A',
                    fontFamily: 'Inter,sans-serif'
                  }}
                >
                  Password
                </InputLabel>
                <Input
                  id="password"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={pass}
                  onChange={handleChangePassword}
                  helperText='Required 8 to 15 chars; 1 uppercase letter; 1 number'
                  sx={{
                    '&::before': {
                      borderBottom: '2px solid rgba(21, 24, 109, 0.60)',
                    }
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>
                  Required 8 to 15 chars; min 1 uppercase letter; min 1 number; no whitespace
                </FormHelperText>
              </FormControl>
            </Box>

            <Button
              variant='contained'
              type="submit"
              onClick={handleSubmit}
              sx={{
                fontFamily: 'Inter, sans-serif',
                lineHeight: 'normal',
                fontWeight: 500,
                letterSpacing: '1.6px',
                color: '#fff',
                backgroundColor: '#0B2F8A',
                width: 'fit-content',
                textTransform: 'capitalize',
                padding: '14px 60px',
                borderRadius: '0px',
                fontSize: '16px',
                boxShadow: '0px 8px 24px -2px rgba(11, 47, 138, 0.60)',
                margin: '32px 0',
                "&:hover": {
                  backgroundColor: '#0B2F8A',

                }
              }}>
              Sign Up
            </Button>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              alignItems: 'center',
            }} >

              <Box sx={{
                borderBottom: '1px solid rgba(21, 24, 109, 0.60)',
                width: '32%',
              }} />

              <Typography
                variant='body1'
                sx={{
                  color: '#013370',
                  fontSize: '16px',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '1.6px',
                  fontWeight: 500,
                  paddingTop: '20px'
                }}
              >
                Or sign up with
              </Typography>

              <Box sx={{
                display: 'flex',
                gap: '56px',
                paddingTop: '20px'
              }} >
                <IconButton sx={{ padding: '2px' }} >
                  <Image
                    src={google}
                    alt='google'
                    width={50}
                    height={50}
                    style={{
                      // backgroundColor:'#fff',
                      // padding:'10px',
                      borderRadius: '45rem',
                    }}
                  />
                </IconButton>

                <IconButton sx={{ padding: '2px' }} >
                  <Image
                    src={face}
                    alt='google'
                    width={50}
                    height={50}
                    style={{
                      // backgroundColor:'#fff',
                      // padding:'10px',
                      borderRadius: '45rem',
                    }}
                  />
                </IconButton>

                <IconButton sx={{ padding: '2px' }} >
                  <Image
                    src={twitter}
                    alt='google'
                    width={50}
                    height={50}
                    style={{
                      // backgroundColor:'#fff',
                      // padding:'10px',
                      borderRadius: '45rem',
                    }}
                  />
                </IconButton>

              </Box>

              <Box sx={{ display: 'flex', paddingTop: '16px' }} >
                <Typography
                  variant='body1'
                  sx={{
                    color: '#013370',
                    fontSize: '16px',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '1.6px',
                    fontWeight: 500
                  }}
                >
                  Already have an account?
                </Typography>
                <Typography
                  component='a'
                  href='/login'
                  variant='body1'
                  sx={{
                    color: '#0B2F8A',
                    fontSize: '16px',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '1.6px',
                    fontWeight: 'bold',
                    paddingLeft: '4px'
                  }}
                >
                  Sign In
                </Typography>
              </Box>

            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Register;
