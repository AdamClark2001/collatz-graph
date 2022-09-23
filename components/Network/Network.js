import { Network as NetworkGraph } from '@nivo/network'
import { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { collatzOrbit } from '../../utils/collatzOrbit'

const collatz = () => {
  const start = Math.floor(Math.random() * (99 - 49 + 1)) + 49
  const nodes = []
  const links = []
  const orbits = []

  const baseOrbit = collatzOrbit(16)
  nodes.push({
    id: 0,
    size: 24
  })

  for (let i = 1; i <= 15; i++) {
    const orbit = collatzOrbit(i + start)
    nodes.push({
      id: i
    })
    orbits.push(orbit)
  }

  orbits.reverse()

  orbits.forEach((orbit, orbitIndex) => {
    orbit.forEach((orbitValue) => {
      if (orbitValue === baseOrbit[0]) {
        links.push({
          source: 0,
          target: orbitIndex + 1
        })
      }

      orbits.forEach((innerOrbit, innerOrbitIndex) => {
        if (orbitIndex !== innerOrbitIndex) {
          if (orbitValue === innerOrbit[0]) {
            links.push({
              source: orbitIndex + 1,
              target: innerOrbitIndex + 1
            })
          }
        }
      })
    })
  })

  return {
    nodes: nodes,
    links: links
  }
}

const Network = ({ hidden }) => {
  const [networkData, setNetworkData] = useState(null)
  const [linkDistance, setLinkDistance] = useState(100)
  const theme = useTheme()

  useEffect(() => {
   generateData() 
  }, [])

  const generateData = () => {
    const data = collatz()
    setNetworkData(data)
    
    const newLinkDistance = Math.random() * (150 - 50) + 50
    setLinkDistance(newLinkDistance)
  }

  return (
    <Box sx={{
      display: hidden ? 'none' : 'flex',
      flexDirection: 'column',
      padding: 1
    }}>
      <Typography align='center' gutterBottom>
          Network
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 2 }}>
        <Button variant='contained' onClick={generateData}>Generate new data</Button>
      </Box>
      {
        networkData !== null && (
          <NetworkGraph
            data={networkData}
            width={500}
            height={500}
            repulsivity={200}
            nodeSize={12}
            nodeColor={theme.palette.primary.main}
            isInteractive={false}
            linkDistance={linkDistance}
          />
        )
      }
    </Box>
  )
}

export default Network
