import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { itemStyle, paperStyle, styleBox } from '@/styles/styles'

type DashboardCardProps = {
  icon: React.ReactNode
  title: string
  value: string | number
  formatValue?: (value: number) => string
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, value, formatValue }) => (
  <Grid size={4}>
    <Paper elevation={3} sx={paperStyle}>
      <Box sx={styleBox}>
        {icon}
        <Typography variant="h6" ml={1}>
          {title}
        </Typography>
      </Box>
      <Box sx={itemStyle}>
        <Typography variant="h3">{formatValue ? formatValue(Number(value)) : value}</Typography>
      </Box>
    </Paper>
  </Grid>
)
