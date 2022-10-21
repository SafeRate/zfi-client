import { Box, Button } from "@chakra-ui/react";
import { getMyAlgoUserAccount } from "./myAlgoConnect";

export type MyAlgoConnectButtonArgs = {
  setCurrentAccount: any;
};

const MyAlgoConnectButton = (args: MyAlgoConnectButtonArgs) => {
  const setCurrentAccount = args.setCurrentAccount;

  return (
    <Box>
      <Button
        onClick={async () => {
          const account = await getMyAlgoUserAccount();
          if (account) {
            setCurrentAccount(account);
          }
        }}
      >
        Connect to MyAlgoConnect
      </Button>
    </Box>
  );
};

export default MyAlgoConnectButton;
