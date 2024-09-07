import React from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useFilter } from '@/hooks'
import { OrderStatus } from '@/types/enum'

import './FilterComponent.scss'

interface FilterProps {
  data: any[]
  onFilterData: (filteredData: any[]) => void
  isOrder?: boolean
}

export const FilterComponent: React.FC<FilterProps> = ({ data, onFilterData, isOrder = false }) => {
  const {
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
  } = useFilter(data, isOrder)

  const stickyStyle = {
    position: 'sticky',
    top: 117,
    zIndex: 2,
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }

  const onApplyFilters = () => {
    const filteredData = applyFilters()

    onFilterData(filteredData)
  }

  const onResetFilters = () => {
    const resetData = resetFilters()

    onFilterData(resetData)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="filter" sx={stickyStyle} p={1} component="form" gap={2}>
        <FormControl sx={{ minWidth: '30%' }}>
          <TextField
            size="small"
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
          />
        </FormControl>
        {isOrder && (
          <>
            <FormControl size="small" sx={{ minWidth: 250 }}>
              <InputLabel id="demo-select-small-label">Status</InputLabel>
              <Select
                autoWidth
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value as string)}
              >
                {Object.entries(OrderStatus).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                slots={{ textField: (params) => <TextField {...params} size="small" /> }}
              />
            </FormControl>

            <FormControl>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                slots={{ textField: (params) => <TextField {...params} size="small" /> }}
              />
            </FormControl>
          </>
        )}

        <Button
          variant="contained"
          size="medium"
          disabled={!status && !startDate && !endDate && !search}
          onClick={onApplyFilters}
        >
          Apply
        </Button>

        <Button variant="outlined" size="medium" color="warning" disabled={isDisabled} onClick={onResetFilters}>
          Reset
        </Button>
      </Box>
    </LocalizationProvider>
  )
}

export default FilterComponent
