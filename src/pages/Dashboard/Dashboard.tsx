import React, { useEffect, useState } from 'react'
import {
  AttachMoneyOutlined as RevenueIcon,
  BarChartOutlined as AverageIcon,
  CloseOutlined as RefusedIcon,
  DoneOutlined as CompletedIcon,
  PendingOutlined as PendingIcon,
  ReceiptOutlined as OrdersIcon,
  ShoppingCartOutlined as ProductsIcon,
} from '@mui/icons-material'
import { Box, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Cookies from 'js-cookie'
import { DashboardCard, Loading, Message, OrderItem, ProductItem } from '@/components'
import { useFetchDashboardData } from '@/hooks'
import { formatCurrency } from '@/services'
import { paperStyle } from '@/styles/styles'
import { AlertSeverity } from '@/types/enum'

export const Dashboard: React.FC = () => {
  const {
    loading,
    productsCount,
    ordersCount,
    totalRevenue,
    topProducts,
    recentOrders,
    pendingOrders,
    completedOrders,
    refusedOrders,
    averageOrderValue,
    fetchData,
  } = useFetchDashboardData()

  const [openWelcomeMessage, setOpenWelcomeMessage] = useState<boolean>(false)
  const token = Cookies.get('authToken')

  useEffect(() => {
    fetchData()

    const hasShownWelcomeMessage = localStorage.getItem('welcomeMessageShown')

    if (token && !hasShownWelcomeMessage) {
      setOpenWelcomeMessage(true)
      localStorage.setItem('welcomeMessageShown', 'true')
    }
  }, [token, fetchData])

  if (loading) {
    return <Loading />
  }

  return (
    <Box p={3}>
      <Typography variant="h2" mb={3} gutterBottom>
        Dashboard
      </Typography>

      <Message
        openMessage={openWelcomeMessage}
        setOpenMessage={setOpenWelcomeMessage}
        message="Welcome back to Pharmacy!"
        messageType={AlertSeverity.Success}
      />

      <Grid container spacing={3}>
        <DashboardCard icon={<ProductsIcon />} title="Total Products" value={productsCount} />
        <DashboardCard icon={<OrdersIcon />} title="Total Orders" value={ordersCount} />
        <DashboardCard icon={<RevenueIcon />} title="Total Revenue" value={totalRevenue} formatValue={formatCurrency} />
        <DashboardCard icon={<PendingIcon />} title="Pending Orders" value={pendingOrders} />
        <DashboardCard icon={<CompletedIcon />} title="Completed Orders" value={completedOrders} />
        <DashboardCard icon={<RefusedIcon />} title="Refused Orders" value={refusedOrders} />
        <DashboardCard
          icon={<AverageIcon />}
          title="Average Order Value"
          value={averageOrderValue}
          formatValue={formatCurrency}
        />

        <Grid size={12}>
          <Paper elevation={3} sx={paperStyle}>
            <Typography variant="h6" gutterBottom>
              Top Products
            </Typography>
            {topProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </Paper>
        </Grid>

        <Grid size={12}>
          <Paper elevation={3} sx={paperStyle}>
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
            {recentOrders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
