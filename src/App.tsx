import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { CycleContextProvider } from './contexts/CyclesContext'
const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CycleContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CycleContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}
export { App }
