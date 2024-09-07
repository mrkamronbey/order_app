import React from 'react'
import { Box, Button, Typography } from '@mui/material'

interface TopHeaderProps {
  title: string
  btnTitle: string
  onClick: () => void
}

const stickyHeader = {
  position: 'sticky',
  top: 70,
  zIndex: 2,
  background: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export const TopHeader: React.FC<TopHeaderProps> = ({ title, btnTitle, onClick }) => (
  <Box sx={stickyHeader} p={1} pt={0}>
    <Typography variant="h2">{title}</Typography>
    <Button variant="contained" onClick={onClick}>
      {btnTitle}
    </Button>
  </Box>
)
