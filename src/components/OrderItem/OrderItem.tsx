import React from 'react'
import { Box, Typography } from '@mui/material'
import { formatCurrency } from '@/services'
import { itemStyle } from '@/styles/styles'

interface OrderItemProps {
  order: any
}

export const OrderItem: React.FC<OrderItemProps> = ({ order }) => (
  <Box sx={itemStyle}>
    <Box>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        Order id: {order.orderNumber}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Customer: {order.customerName}
      </Typography>
    </Box>
    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
      {formatCurrency(order.totalPrice)}
    </Typography>
  </Box>
)
