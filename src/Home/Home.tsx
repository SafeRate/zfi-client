import { Box, Code, Flex, Heading, Stack } from "@chakra-ui/react";
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
        <Flex>
          <Stack>
            <FutureMoney price={99.71} days={30} date={"November 20, 2022"} />
          </Stack>
          <Stack>
            <FutureMoney price={99.1} days={90} date={"January 19, 2023"} />
          </Stack>
          <Stack>
            <FutureMoney price={97.92} days={180} date={"April 19, 2023"} />
          </Stack>
          <Stack>
            <FutureMoney price={95.55} days={365} date={"October 20, 2023"} />
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
