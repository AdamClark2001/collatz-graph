import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Voronoi as VoronoiGraph } from '@nivo/voronoi'
import { collatzOrbit } from '../../utils/collatzOrbit'
import { Button, Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const collatz = () => {
  const start = 1234567890
  const points = []
  const orbitMax = null
  const orbitMin = null

  for (let i = 1; i <= 100; i++) {
    const orbit = collatzOrbit(i + start)
    orbitMax = orbitMax ? Math.max(orbitMax, orbit.length) : orbit.length
    orbitMin = orbitMin ? Math.min(orbitMin, orbit.length) : orbit.length
    const point = {
      id: i,
      x: Math.random() * (orbitMax - orbitMin) + orbitMin,
      y: Math.random() * (orbitMax - orbitMin) + orbitMin,
    }

    points.push(point);
  }

  return {
    orbitMax: orbitMax,
    orbitMin: orbitMin,
    points: points
  }
}

const Voronoi = ({hidden}) => {
  const [collatzData, setCollatzData] = useState(null)
  const theme = useTheme();

  useEffect(() => {
    generateData()
  }, [])

  const generateData = () => {
    setCollatzData(collatz())
  }

  return (
    <Box sx={{
      display: hidden ? 'none' : 'initial',
      padding: 1
    }}>
      <Head>
        <title>Voronoi</title>
        <meta name="description" content="Visualize Collatz orbits as Voronoi Tesselation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography gutterBottom align='center'>
        Voronoi Tesselation
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 2 }}>
        <Button variant='contained' onClick={generateData}>Generate new data</Button>
      </Box>
      {
        collatzData !== null && (
          <VoronoiGraph
            data={collatzData.points}
            width={500}
            height={500}
            xDomain={[collatzData.orbitMin, collatzData.orbitMax]}
            yDomain={[collatzData.orbitMin, collatzData.orbitMax]}
            cellLineColor={theme.palette.primary.main}
            pointSize={0}
            margin={{top: 1, right: 1, bottom: 1, left: 1}}
          />
        )
      }
    </Box>
  )
}

export default Voronoi
