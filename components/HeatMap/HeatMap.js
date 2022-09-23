import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { HeatMap as HeatMapGraph } from "@nivo/heatmap"
import { collatzOrbit } from "../../utils/collatzOrbit"

const collatz = () => {
  const start = 1234567890
  const start2 = 6543
  const points = []

  for (let i = 1; i <= 10; i++) {
    const orbit = collatzOrbit(i + start)
    const orbitEvenCount = orbit.reduce((prev, curr) => {
      return curr % 2 === 0 ? prev + 1 + Math.random() : prev * Math.random()
    }, 0)

    const data = []

    for (let j = 1; j <= 10; j++) {
      const orbit = collatzOrbit(j + start2)

      const orbitOddCount = orbit.reduce((prev, curr) => {
        return curr % 2 === 0 ? prev + 1 + Math.random() : prev * Math.random()
      }, 0)

      data.push({
        x: j,
        y: orbitEvenCount + orbitOddCount
      })
    }

    const point = {
      id: i,
      data: data
    }

    points.push(point);
  }

  return {
    points: points
  }
}

const HeatMap = ({ hidden }) => {
  const [heatMapData, setHeatMapData] = useState(null)

  useEffect(() => {
    generateData()
  }, [])

  const generateData = () => {
    setHeatMapData(collatz())
  }

  return (
    <Box sx={{
      display: hidden ? 'none' : 'flex',
      flexDirection: 'column',
      padding: 1
    }}>
      <Typography align='center' gutterBottom>
          Heat Map
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 2 }}>
        <Button variant='contained' onClick={generateData}>Generate new data</Button>
      </Box>
      {
        heatMapData !== null && (
          <HeatMapGraph
            data={heatMapData.points}
            width={500}
            height={500}
            colors={{
              //type: 'diverging',
              //scheme: 'red_yellow_blue',
              type: 'sequential',
              scheme: 'blues'
            }}
            enableLabels={false}
            isInteractive={false}
          />
        )
      }
    </Box>
  )
}

export default HeatMap