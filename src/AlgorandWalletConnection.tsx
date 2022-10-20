import React, { useRef, useState } from "react";
import { loadStdlib } from "@reach-sh/stdlib";
import MyAlgoConnect from "@reach-sh/stdlib/ALGO_MyAlgoConnect";
import { Box, Button, Text } from "@chakra-ui/react";
const reach = loadStdlib("ALGO");
reach.setWalletFallback(
  reach.walletFallback({
    providerEnv: "LocalNet",
    MyAlgoConnect,
  })
);

const stdlib = loadStdlib();

const AlgorandWalletConnection = () => {
  const account = useRef();
  const balance = useRef();

  const [accountBal, setAccountBal] = useState(0);
  const [accountAddress, setAccountAddress] = useState("");

  const connectWallet = async () => {
    try {
      await getAccount();
      // await getBalance();
    } catch (err) {
      console.log(err);
    }
  };

  const getAccount = async () => {
    try {
      account.current = await reach.getDefaultAccount();
      if (account.current) {
        // setAccountAddress(account.current.networkAccount?.addr);
        console.log("Account :" + account.current);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getBalance = async () => {
    try {
      let rawBalance = await reach.balanceOf(account.current);
      //   balance.current = reach.formatCurrency(rawBalance, 4);
      //   if (balance.current) {
      //     setAccountBal(balance.current);
      //     console.log("Balance :" + balance.current);
      //   }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Button onClick={connectWallet}>Connect Algorand Wallet</Button>
      <Text>Account Address: {accountAddress} </Text>
      <Text>Account Balance: {accountBal}</Text>
    </Box>
  );
};

export default AlgorandWalletConnection;
