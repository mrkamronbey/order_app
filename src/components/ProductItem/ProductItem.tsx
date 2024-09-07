import React from 'react'
import { Box, Typography } from '@mui/material'
import { formatCurrency } from '@/services'
import { itemStyle } from '@/styles/styles'

interface ProductItemProps {
  product: any
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => (
  <Box sx={itemStyle}>
    <Box>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        {product.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Price: {formatCurrency(product.price)}
      </Typography>
    </Box>
    <Box sx={{ textAlign: 'right' }}>
      <Typography variant="body1">Sold: {product.quantity}</Typography>
      <Typography variant="body2" color={product.quantityInStock > 10 ? 'text.secondary' : 'error'}>
        In Stock: {product.quantityInStock}
      </Typography>
    </Box>
  </Box>
)
