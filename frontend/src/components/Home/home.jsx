import "../../App.css";
import bgimage from "../../assets/garden.png";
import AnnouncementBar from "../AnnouncementBar/AnnouncementBar.js";
import React, { useState, useEffect } from "react";
import { fetchUser } from "../../dynoFuncs";
import ContributionTable from "../ContributionTable/ContributionTable";

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
import VolunteerTable from "../VolunteerTable/volunteerTable.js";

export default function Home(props) {
  console.log(props);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    fetchUser("volunteers_individual", props).then((data) => setUserInfo(data));
  }, []);

  if (!userInfo) return null;

  return (
    <Flex
      p={10}
      w="100%"
      bgImage={bgimage}
      bgPosition="center"
      bgSize="cover"
      bgRepeat="yes-repeat"
    >
      <Flex w="100%">
        <Box
          w="25%"
          borderRadius={"12px"}
          p={3}
          boxShadow="dark-lg"
          backdropFilter="blur(60px)"
        >
          <Heading size="lg" color="#cee4bb">
            {" "}
            Admin Announcements:{" "}
          </Heading>
          <Box>
            <AnnouncementBar />
          </Box>
        </Box>
        <Spacer />
        <Box
          w="72%"
          h="100vh"
          borderRadius={"12px"}
          boxShadow="dark-lg"
          backdropFilter="blur(60px)"
        >
          <Box
            borderRadius={"12px"}
            boxShadow="lg"
            bg="#F5F5F559"
            backdropFilter="blur(60px)"
            bgOpacity="0.75"
          >
            <Box bg="#576754" borderRadius={"12px"} boxShadow="dark-lg">
              <Heading p={3} size="lg" color="white">
                {" "}
                This week:{" "}
              </Heading>
            </Box>
            <Flex>
              <Center w="100%">
                <Heading fontSize="144"> 100 </Heading>
                <Heading mb={3} fontSize="lg">
                  hours contributed by
                  <br />
                  SLO volunteers{" "}
                </Heading>
              </Center>
            </Flex>
          </Box>
          <Box>
            <Flex p={10}>
              {console.log(userInfo)}
              <Box
                bg="#576754"
                w="30%"
                borderRadius={"12px"}
                boxShadow="dark-lg"
                backdropFilter="blur(60px)"
              >
                <Flex>
                  <Center w="100%">
                    <Heading fontSize="90px" color="#CCDDBD">
                      {" "}
                      30{" "}
                    </Heading>
                    <Heading fontSize="20px" color="#CCDDBD">
                      {" "}
                      HRS{" "}
                    </Heading>
                  </Center>
                </Flex>
                <Heading pb={3} fontSize="20px" color="#CCDDBD">
                  {" "}
                  Gardening{" "}
                </Heading>
              </Box>
              <Spacer />
              <Box
                bg="#576754"
                w="30%"
                borderRadius={"12px"}
                boxShadow="dark-lg"
                backdropFilter="blur(60px)"
              >
                <Flex>
                  <Center w="100%">
                    <Heading fontSize="90px" color="#CCDDBD">
                      {" "}
                      30{" "}
                    </Heading>
                    <Heading fontSize="20px" color="#CCDDBD">
                      {" "}
                      HRS{" "}
                    </Heading>
                  </Center>
                </Flex>
                <Heading pb={3} fontSize="20px" color="#CCDDBD">
                  {" "}
                  Gardening{" "}
                </Heading>
              </Box>
              <Spacer />
              <Box
                bg="#576754"
                w="30%"
                borderRadius={"12px"}
                boxShadow="dark-lg"
                backdropFilter="blur(60px)"
              >
                <Flex>
                  <Center w="100%">
                    <Heading fontSize="90px" color="#CCDDBD">
                      {" "}
                      30{" "}
                    </Heading>
                    <Heading fontSize="20px" color="#CCDDBD">
                      {" "}
                      HRS{" "}
                    </Heading>
                  </Center>
                </Flex>
                <Heading pb={3} fontSize="20px" color="#CCDDBD">
                  {" "}
                  Gardening{" "}
                </Heading>
              </Box>
            </Flex>
          </Box>
          <Flex p={10}>
            <Heading size="lg"> Volunteering History: </Heading>
            <ContributionTable />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
