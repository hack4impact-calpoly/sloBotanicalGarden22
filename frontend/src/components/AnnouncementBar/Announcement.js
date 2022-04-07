import React from "react";
import {
  Box,
  Text,
  Flex,
  Image,
  Center,
  Spacer,
  HStack,
  Heading,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const Announcement = (props) => {
  return (
    <Box bg="#576754" m={4} p={4} borderRadius="12px">
      <Box pb={4}>
        <Heading color="#CCDDBD" size="md">
          {" "}
          {props.title}{" "}
        </Heading>
        <Heading color="#CCDDBD" size="sm">
          {" "}
          {props.date}{" "}
        </Heading>
      </Box>
      <Box align="center">
        <Text color="white"> {props.body} </Text>
        <Text pt={3} color="#CCDDBD">
          {" "}
          - {props.poster}{" "}
        </Text>
      </Box>
    </Box>
  );
};

export default Announcement;
