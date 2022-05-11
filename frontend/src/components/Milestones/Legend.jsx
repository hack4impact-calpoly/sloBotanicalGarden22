import { Box } from '@chakra-ui/react'
import React from 'react'

const Legend = () => {
  return (
    <Box bgColor="green.200" m="20px" p="10px" borderRadius="40px" textAlign="center">
        <strong>10 Hours:</strong> Free t-shirt (please contact SLO Botanical Garden to receive your t-shirt)
        <br />
        <strong>20 Hours:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada
        <br />
        <strong>40 Hours:</strong> Nunc fermentum tellus at eros lacinia tincidunt. Aliquam erat volutpat. 
    </Box>
  )
}

export default Legend