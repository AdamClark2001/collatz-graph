import Layout from '../components/Layout/Layout'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const Home = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <Layout />
      </main>
    </ThemeProvider>
  )
}

export default Home
