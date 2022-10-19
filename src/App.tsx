import algosdk from "algosdk";
import { useEffect } from "react";
import { AlgofiAMMClient } from "@algofi/amm-v0";

const App = () => {
  useEffect(() => {
    const token =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const server = "http://localhost";
    const port = 4002;
    const client = new algosdk.Algodv2(token, server, port);

    const clientAmm = new AlgofiAMMClient(client, 1);

    (async () => {
      try {
        // const myaccount = algosdk.generateAccount();
        // console.log("Account Address = " + myaccount.addr);
        // let account_mnemonic = algosdk.secretKeyToMnemonic(myaccount.sk);
        // console.log("Account Mnemonic = " + account_mnemonic);
        // console.log("Account created. Save off Mnemonic and address");
        // console.log("Add funds to account using the TestNet Dispenser: ");
        // console.log("https://dispenser.testnet.aws.algodev.network/ ");
        // return myaccount;
        const test = await clientAmm.getAccountCreatedPools(
          "2107fa0df074b7acbe353b74e713ef5d"
        );
        console.log("test", test);
      } catch (err) {
        console.log("err", err);
      }
    })().catch((e) => {
      console.log(e);
    });
  }, []);

  return <div>App</div>;
};

export default App;
