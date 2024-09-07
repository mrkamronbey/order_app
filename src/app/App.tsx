import { BrowserRouter } from 'react-router-dom'
import { Provider } from '@/providers'
import { Router } from '@/routers'

export const App = () => (
  <Provider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>
)
