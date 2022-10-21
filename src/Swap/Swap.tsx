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
  } from "@chakra-ui/react";
  import { CheckIcon } from "@chakra-ui/icons";

  const Swap = () => {
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
                <Text fontWeight="600" fontSize="lg" mb={2}>Swap</Text>
                <Flex>
                    <Input placeholder='0' size='lg' mr={1} />
                    <Select size='lg' placeholder='USDC' bg={useColorModeValue("gray.100", "green.900")}>
                        <option value='USDC'>USDC</option>
                        <option value='WEFIUST20221120'>WEFIUST20221120</option>
                        <option value='WEFIUST20230119'>WEFIUST20230119</option>
                        <option value='WEFIUST20230419'>WEFIUST20230419</option>
                        <option value='WEFIUST20231020'>WEFIUST20231020</option>
                        <option value='WEFISRMSERIES1'>WEFISRMSERIES1</option>
                    </Select>
                    
                </Flex>
                <Flex>
                    <Input placeholder='0' size='lg' mr={1} />
                    <Select size='lg' placeholder='Select token' bg={useColorModeValue("green.300", "green.900")}>
                        <option value='USDC'>USDC</option>
                        <option value='WEFIUST20221120'>WEFIUST20221120</option>
                        <option value='WEFIUST20230119'>WEFIUST20230119</option>
                        <option value='WEFIUST20230419'>WEFIUST20230419</option>
                        <option value='WEFIUST20231020'>WEFIUST20231020</option>
                        <option value='WEFISRMSERIES1'>WEFISRMSERIES1</option>
                    </Select>
                    
                </Flex>
                <Button colorScheme="pink" variant="outline" size="lg" w={"100%"} mt={2}>
                  Connect Wallet
                </Button>
            </Stack>
          </Box>
        </Center>      
    );
  
  };

  export default Swap;