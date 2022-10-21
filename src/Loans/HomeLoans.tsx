import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { RouteArgs } from "../Home/Home";

const HomeLoans = (routeArgs: RouteArgs) => {
  const { currentAccount, setCurrentAccount } = routeArgs;
  return (
    <Box>
      <Box>
        <Heading>Invest into a diversified pool of Safe Rate Mortgages</Heading>
        <SimpleGrid columns={[2, 2, 2, 2, 4]} spacing="20px">
          <Center py={6}>
            <Box
              h="400px"
              maxW={"330px"}
              w={"full"}
              bg={useColorModeValue("white", "gray.800")}
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
            >
              <Stack
                textAlign={"center"}
                p={6}
                color={useColorModeValue("gray.800", "white")}
                align={"center"}
              >
                <Text
                  fontSize={"md"}
                  fontWeight={500}
                  bg={useColorModeValue("green.50", "green.900")}
                  p={2}
                  px={3}
                  color={"green.500"}
                  rounded={"full"}
                >
                  WeFi SRM Series 1
                </Text>
                <Stack direction={"row"} align={"center"} justify={"center"}>
                  <Text fontSize={"3xl"}>6.75%</Text>
                  <Text fontSize={"6xl"} fontWeight={800}></Text>
                  <Text color={"gray.500"}>weighted average interest rate</Text>
                </Stack>
              </Stack>

              <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="green.400" />
                    Receive pass-through interest payments on a monthly basis
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="green.400" />
                    Next payment date is 2022-10-31
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="green.400" />
                    Underlying loan performance fully tracked on-ledger
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="green.400" />
                    Returns depend on defaults and prepayments
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="green.400" />
                    $375,300 in principal outstanding
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="green.400" />
                    $253,300 available to invest in
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="green.400" />
                    Loans seasoned for at least 1 year
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="green.400" />
                    No missed payments for any loans to date
                  </ListItem>
                </List>

                <Button
                  mt={10}
                  w={"full"}
                  bg={"green.400"}
                  color={"white"}
                  rounded={"xl"}
                  boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
                  _hover={{
                    bg: "green.500",
                  }}
                  _focus={{
                    bg: "green.500",
                  }}
                >
                  Buy $100 for 102.54 USDC
                </Button>
              </Box>
            </Box>
          </Center>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default HomeLoans;
