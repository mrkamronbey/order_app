import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useLoginMutation } from '@/api/authApiSlice'
import { ROUTES } from '@/constants'

type LoginFormValues = {
  username: string
  password: string
}

const defaultValues: LoginFormValues = {
  username: 'jacksone',
  password: 'jacksonepass',
}

export const useLoginForm = () => {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ defaultValues })
  const [showPassword, setShowPassword] = useState(false)
  const [request, { isLoading }] = useLoginMutation()

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await request({
        username: data.username,
        password: data.password,
      }).unwrap()

      if (response?.token) {
        Cookies.set('authToken', response?.token, { expires: 7 })
        navigate(ROUTES.home)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    showPassword,
    handleClickShowPassword,
    errors,
  }
}
