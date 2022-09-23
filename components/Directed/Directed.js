import { Network as NetworkGraph } from '@nivo/network'
import { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { collatzOrbit } from '../../utils/collatzOrbit'

const collatz = () => {
  const orbits = []
  const nodes = []
  const links = []

  for (let i = 1; i <= Math.floor(Math.random() * (75 - 25 + 1)) + 25; i++) {
    nodes.push({
      id: i
    })

    const newOrbit = [i]
    let nextValue = i

    while (nextValue !== 1) {
      const oldLinkLength = links.length
      if (nextValue % 2 === 0) {
        nextValue = nextValue / 2
      } else {
        nextValue = nextValue * 3 + 1
      }

      for (let j = orbits.length - 1; j > -1; j--) {
        if (orbits[j][0] === nextValue) {
          links.push({
            source: i,
            target: j + 1
          })
          break
        }
      }

      newOrbit.push(nextValue)

      if (links.length !== oldLinkLength) {
        break
      }
    }

    orbits.push(newOrbit)
  }

  return {
    nodes: nodes,
    links: links
  }
}

const Directed = ({ hidden }) => {
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
          Directed
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
            repulsivity={50}
            nodeSize={12}
            centeringStrength={2}
            nodeColor={theme.palette.primary.main}
            isInteractive={false}
            linkDistance={10}
          />
        )
      }
    </Box>
  )
}

export default Directed
