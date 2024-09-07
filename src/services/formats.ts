import dayjs from 'dayjs'

export const formatDate = (dateInput: Date | string): string => {
  const date = dayjs(dateInput)

  if (!date.isValid()) {
    return 'Invalid Date'
  }

  return date.format('DD.MM.YYYY')
}

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0,
  }).format(amount)

export const formatQuantity = (quantity: number) => new Intl.NumberFormat().format(quantity)

export const formatNumber = (value: string): string => {
  const number = parseFloat(value.replace(/,/g, ''))

  if (isNaN(number)) return value

  return number.toLocaleString('en-US')
}
