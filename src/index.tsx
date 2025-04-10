import { BrowserRouter, HashRouter, useRoutes } from 'react-router-dom'

import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import { routes } from './RoutesConfig'
import theme from './theme'

const App = () => {
  const routing = useRoutes(routes)
  return routing
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <ThemeProvider theme={theme}>
    <HashRouter>
      <App />
    </HashRouter>
  </ThemeProvider>
)
