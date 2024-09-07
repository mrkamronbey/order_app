import React from 'react'
import { Link } from 'react-router-dom'
import ErrorIcon from '@mui/icons-material/Error'
import { Box, Button, Container, Typography } from '@mui/material'

export const NotFound: React.FC = () => (
  <Container
    maxWidth="xl"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        borderRadius: '50%',
        backgroundColor: '#f44336',
        color: 'white',
        marginBottom: 2,
      }}
    >
      <ErrorIcon sx={{ fontSize: 60 }} />
    </Box>
    <Typography variant="h1" component="h2" color="textPrimary" gutterBottom>
      404
    </Typography>
    <Typography variant="h6" color="textSecondary" paragraph>
      Sorry, we couldn't find the page you're looking for.
    </Typography>
    <Button variant="contained" color="primary" component={Link} to="/">
      Go to Home
    </Button>
  </Container>
)
