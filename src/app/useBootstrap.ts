import { useEffect, useState } from 'react'
import { useStores } from '@/stores'

export const useBootstrap = () => {
  const { authStore, appStore } = useStores()
  const [isInitiated, setIsInitiated] = useState(!!authStore.isAuth)

  const getProtectedAppConfig = async () => {
    await appStore.getProfile()
  }

  const getAppConfigs = async () => {
    try {
      await getProtectedAppConfig()
    } catch (error) {
      console.error(error)
    } finally {
      setIsInitiated(false)
    }
  }

  useEffect(() => {
    if (authStore.isAuth) {
      void getAppConfigs()
    }
  }, [authStore.isAuth])

  return [isInitiated]
}
