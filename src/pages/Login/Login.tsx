import React from 'react'
import { Controller } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { useLoginForm } from '@/hooks'

export const Login: React.FC = () => {
  const { control, handleSubmit, onSubmit, isLoading, showPassword, handleClickShowPassword, errors } = useLoginForm()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#00E091',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: 450,
          margin: '0 auto',
          p: 4,
          borderRadius: 5,
          background: 'var(--white)',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography variant="h3" textAlign="center" gutterBottom>
          Login
        </Typography>

        <Controller
          name="username"
          control={control}
          rules={{ required: 'Username is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Username"
              variant="outlined"
              fullWidth
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ''}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <LoadingButton
          disabled={isLoading}
          loading={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          size="large"
        >
          Login
        </LoadingButton>
      </Box>
    </Box>
  )
}
