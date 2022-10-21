import { Box, Code, Flex, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { Accounts } from "@randlabs/myalgo-connect";
import MyAlgoConnectButton from "../util/MyAlgoConnect/MyAlgoConnectButton";
import FutureMoney from "./FutureMoney";

export type RouteArgs = {
  currentAccount: Accounts | null;
  setCurrentAccount: any;
};

const Home = (routeArgs: RouteArgs) => {
  const { currentAccount, setCurrentAccount } = routeArgs;

  return (
    <Box>
      <Box>
        <Heading>$100 Treasuries</Heading>
        
        <SimpleGrid columns={[2, 2, 2, 2, 4]} spacing='20px'>
        <FutureMoney price={99.71} days={30} date={"November 20, 2022"} />
        <FutureMoney price={99.1} days={90} date={"January 19, 2023"} />
        <FutureMoney price={97.92} days={180} date={"April 19, 2023"} />
        <FutureMoney price={95.55} days={365} date={"October 20, 2023"} />
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Home;
