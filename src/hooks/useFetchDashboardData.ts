import { useCallback, useEffect, useState } from 'react'
import { Endpoints } from '@/api'
import { useRequestMutation } from '@/api/dataApiSlice'
import { OrderType, ProductsType } from '@/types'
import { OrderStatus } from '@/types/enum'

export const useFetchDashboardData = () => {
  const [productsCount, setProductsCount] = useState<number>(0)
  const [ordersCount, setOrdersCount] = useState<number>(0)
  const [totalRevenue, setTotalRevenue] = useState<number>(0)
  const [topProducts, setTopProducts] = useState<ProductsType[]>([])
  const [recentOrders, setRecentOrders] = useState<OrderType[]>([])
  const [pendingOrders, setPendingOrders] = useState<number>(0)
  const [completedOrders, setCompletedOrders] = useState<number>(0)
  const [refusedOrders, setRefusedOrders] = useState<number>(0)
  const [averageOrderValue, setAverageOrderValue] = useState<number>(0)
  const [request, { isLoading }] = useRequestMutation()

  const fetchData = useCallback(async () => {
    try {
      const productsResult: ProductsType[] = await request({ url: Endpoints.Products, method: 'GET' }).unwrap()
      const ordersResult: OrderType[] = await request({ url: Endpoints.Orders, method: 'GET' }).unwrap()

      setProductsCount(productsResult.length)
      setOrdersCount(ordersResult.length)

      const total = ordersResult.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0)

      setTotalRevenue(total)

      setPendingOrders(ordersResult.filter((order) => order.status === OrderStatus.Pending).length)
      setCompletedOrders(ordersResult.filter((order) => order.status === OrderStatus.Completed).length)
      setRefusedOrders(ordersResult.filter((order) => order.status === OrderStatus.Refused).length)

      const average = ordersResult.length ? total / ordersResult.length : 0

      setAverageOrderValue(average)

      const topProductsData = [...productsResult].slice(0, 5)

      setTopProducts(topProductsData)

      const recentOrdersData = ordersResult.slice(-5)

      setRecentOrders(recentOrdersData)
    } catch (err) {
      console.error('Failed to fetch data:', err)
    }
  }, [request])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    loading: isLoading,
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
  }
}
