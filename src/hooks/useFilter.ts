import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export const useFilter = (data: any[], isOrder: boolean = false) => {
  const [status, setStatus] = useState<string>('')
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const [search, setSearch] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  const applyFilters = () => {
    let filteredData = data

    if (status) {
      filteredData = filteredData.filter((item) => item.status === status)
    }

    if (startDate) {
      filteredData = filteredData.filter((item) => {
        const itemDate = dayjs(item.orderDate)

        return itemDate.isSameOrAfter(startDate)
      })
    }

    if (endDate) {
      filteredData = filteredData.filter((item) => {
        const itemDate = dayjs(item.orderDate)

        return itemDate.isSameOrBefore(endDate)
      })
    }

    if (search) {
      filteredData = filteredData.filter((item) =>
        isOrder
          ? item.customerName.toLowerCase().includes(search.toLowerCase()) ||
            item.orderNumber.toLowerCase().includes(search.toLowerCase())
          : item.name.toLowerCase().includes(search.toLowerCase()),
      )
    }

    setIsDisabled(false)

    return filteredData
  }

  const resetFilters = () => {
    setStatus('')
    setStartDate(null)
    setEndDate(null)
    setSearch('')
    setIsDisabled(true)

    return data
  }

  return {
    status,
    startDate,
    endDate,
    search,
    isDisabled,
    setStatus,
    setStartDate,
    setEndDate,
    setSearch,
    applyFilters,
    resetFilters,
  }
}
