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
  Flex,
  Input,
  Select,
  Divider,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const Pool = () => {
  return (
    <Center py={6}>
      <Box
        maxW={"500px"}
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
          <Text fontWeight="600" mb={2}>
            Add Liquidity
          </Text>

          <Text>Select Pair</Text>
          <Flex w="100%">
            <Select
              size="lg"
              placeholder="USDC"
              bg={useColorModeValue("gray.100", "green.900")}
              mr={1}
              
            >
              <option value="USDC">USDC</option>
              <option value='WT221120'>WT221120</option>
                        <option value='WT230119'>WT230119</option>
                        <option value='WT230419'>WT230419</option>
                        <option value='WT231020'>WT231020</option>
                        <option value='WSRM0001'>WSRM0001</option>
            </Select>
            <Select
              size="lg"
              placeholder="USDC"
              bg={useColorModeValue("gray.100", "green.900")}
            >
              <option value="USDC">USDC</option>
              <option value='WT221120' selected>WT221120</option>
                        <option value='WT230119'>WT230119</option>
                        <option value='WT230419'>WT230419</option>
                        <option value='WT231020'>WT231020</option>
                        <option value='WSRM0001'>WSRM0001</option>
            </Select>
          </Flex>
          <Divider mt={3} />
          <Text>Deposit Amounts</Text>
          <Flex>
            <Input placeholder="0" size="lg" mr={1} />
            <Select
              size="lg"
              placeholder="USDC"
              bg={useColorModeValue("gray.100", "green.900")}
            >
              <option value="USDC" selected>USDC</option>
              <option value='WT221120'>WT221120</option>
                        <option value='WT230119'>WT230119</option>
                        <option value='WT230419'>WT230419</option>
                        <option value='WT231020'>WT231020</option>
                        <option value='WSRM0001'>WSRM0001</option>
            </Select>
          </Flex>
          <Flex>
            <Input placeholder="0" size="lg" mr={1} />
            <Select
              size="lg"
              placeholder="Select token"
              bg={useColorModeValue("green.300", "green.900")}
            >
              <option value="USDC">USDC</option>
              <option value='WT221120' selected>WT221120</option>
                        <option value='WT230119'>WT230119</option>
                        <option value='WT230419'>WT230419</option>
                        <option value='WT231020'>WT231020</option>
                        <option value='WSRM0001'>WSRM0001</option>
            </Select>
          </Flex>
          <Button
            colorScheme="pink"
            variant="outline"
            size="lg"
            w={"100%"}
            mt={2}
          >
            Connect Wallet
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default Pool;
