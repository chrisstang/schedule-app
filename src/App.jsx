import React from 'react'
import { Link, useRoutes } from 'react-router-dom'
import { AppBar, Button, Container, createTheme, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { routes } from './routes'
import { grey } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: '#29335C',
    },
    secondary: {
      main: '#F3A712',
    },
    dark: {
      main: grey[900],
      contrastText: '#eeeeee',
    },
  },
})

function App() {
  const element = useRoutes(routes)
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar className="space-x-4">
          <Typography variant="h6" className="grow !font-bold uppercase">
            Schedule App
          </Typography>
          <Button color="secondary" className="hover:text-white" variant="contained" component={Link} to="/">
            Home
          </Button>
          <Button color="secondary" className="hover:text-white" variant="contained" component={Link} to="/create">
            Create Schedule
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" style={{ marginTop: '20px' }}>
        {element}
      </Container>
    </ThemeProvider>
  )
}

export default App
