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

        <SimpleGrid columns={[2, 2, 2, 2, 4]} spacing="20px">
          <FutureMoney
            price={99.71}
            days={30}
            date={"Nov 20, 2022"}
            apy={3.54}
          />
          <FutureMoney
            price={99.11}
            days={90}
            date={"Jan 19, 2023"}
            apy={3.64}
          />
          <FutureMoney
            price={97.92}
            days={180}
            date={"Apr 19, 2023"}
            apy={4.31}
          />
          <FutureMoney
            price={95.55}
            days={365}
            date={"Oct 20, 2023"}
            apy={4.66}
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Home;
