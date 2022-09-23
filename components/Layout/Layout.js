import { Box, Typography, Tabs, Tab } from '@mui/material'
import Voronoi from '../Voronoi/Voronoi'
import { useState } from 'react'
import HeatMap from '../HeatMap/HeatMap'
import Network from '../Network/Network'
import Directed from '../Directed/Directed'

const Layout = () => {
  const [tab, setTab] = useState(0)

  const handleChange = (e, value) => {
    setTab(value)
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px 16px'
    }}>
      <Typography variant='h3' gutterBottom align='center'>
        Visualizing Collatz Orbits
      </Typography>
      <Tabs value={tab} onChange={handleChange} centered>
        <Tab label='Voronoi' />
        <Tab label='Heat map'/>
        <Tab label='Network' />
        <Tab label='Directed' />
      </Tabs>
      <Voronoi hidden={tab !== 0} />
      <HeatMap hidden={tab !== 1} />
      <Network hidden={tab !== 2} />
      <Directed hidden={tab !== 3} />
    </Box>
  )
}

export default Layout
