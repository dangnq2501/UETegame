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
  Input
}
  from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Grid from '@mui/material/Unstable_Grid2'; // Grid

import { useRouter } from "next/router";
import { login } from "@/models/auth";

import { SEO } from "@/components/SEO";

// Images
import login_bg from '../assets/images/login_bg.jpg'

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    if (email == '' || pass == '') {
      console.log('No Data');
      return;
    };
    if (pass.match(/^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,}$/) && email.match(/^\S+@\S+\.\S+$/)) {
      console.log(email, pass)
      try {
        await login(email, pass);
      } catch (error) {
        console.log(error)
      }
      router.push('/');
    } else {
      console.log('Password not valid')
    }
  };
  return (
    <div>
      <SEO
        url={`${'https://UETegame.games'}/login`}
        openGraphType="website"
        schemaType="article"
        title={`Login`}
        description={"Login user"}
        image={"https://images.unsplash.com/photo-1656312193617-b8d43d0b9535?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"}
      />
      <Box component='section' sx={(theme) => ({
        backgroundColor: '##F0F4FF',
        backgroundPosition: 'center',
        height: '100vh'
      })}>
        <Grid container sx={{
          height: '100%'
        }} >
          <Grid xs={5}
            sx={{
              backgroundImage: `url(${login_bg.src})`,
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
              Welcome back.
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

              <FormControl sx={{ m: 1, width: '60%' }} variant="standard">
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
              Sign In
            </Button>

            <Box sx={{ display: 'flex' }} >
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
                New to UETegame?
              </Typography>
              <Typography
                component='a'
                href='/register'
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
                Sign Up
              </Typography>
            </Box>

          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Login;
