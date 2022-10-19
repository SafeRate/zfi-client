import algosdk from "algosdk";
import { useEffect } from "react";
import { AlgofiAMMClient, getAccountBalances } from "@algofi/amm-v0";

const account1Address =
  "LC7QBZUMISBTQ5YLRVOSPGEKLMTBD4YD3JPFUSSYKHNBPQUP2KDUFBIQ24";
const account1Mnemonic =
  "stay intact nation stairs approve damp already valid shoulder diesel later stay critic buyer elbow this photo humble relax cup another ahead busy abstract accident";

const account2Address =
  "OJOBM7QED6MOXALLPIKHT7VBABACFVYJMXZRSVBSNB25OKASEHIKFFEBJQ";
const account2Mnemonic =
  "spy matter private modify nurse distance memory notice peace carpet orphan session liberty rib hurry dish speed night exhibit answer copper funny bench absent total";

const App = () => {
  useEffect(() => {
    const token =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const server = "http://localhost";
    const port = 8980;
    const client = new algosdk.Algodv2(token, server, port);

    const clientAmm = new AlgofiAMMClient(client, 1);

    (async () => {
      try {
        const test = await getAccountBalances(client, account1Address);
        console.log("test", test);
        // const myaccount = algosdk.generateAccount();
        // console.log("Account Address = " + myaccount.addr);
        // let account_mnemonic = algosdk.secretKeyToMnemonic(myaccount.sk);
        // console.log("Account Mnemonic = " + account_mnemonic);
        // console.log("Account created. Save off Mnemonic and address");
        // console.log("Add funds to account using the TestNet Dispenser: ");
        // console.log("https://dispenser.testnet.aws.algodev.network/ ");
        // return myaccount;
        // const test = await clientAmm.getAccountCreatedPools(
        //   "2107fa0df074b7acbe353b74e713ef5d"
        // );
        // console.log("test", test);
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
