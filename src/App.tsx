import algosdk, {
  secretKeyToMnemonic,
  mnemonicToSecretKey,
  Algodv2,
} from "algosdk";
import { Suspense, useEffect, useState } from "react";
import { AlgofiAMMClient, getAccountBalances, Pool } from "@algofi/amm-v0";
import { Accounts } from "@randlabs/myalgo-connect";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import ScrollToTop from "./Route/ScrollToTop";
import PageWrapper from "./Route/PageWrapper";
import PageLoader from "./Route/PageLoader";

// const account1Address =
//   "NKSLVLXIHT72KBTFQBHH3ZJU3LRYGTEO5VPDDHHSIPLUDY26GGZOVQBFRQ";
// const account1Mnemonic =
//   "motion palm increase pluck exclude fatal nation blast nurse describe ghost puzzle banner mystery federal diagram deliver enough cherry thunder ski unique enjoy about visit";

// const account2Address =
//   "UYIUWVAS2OCZNFKSHRRCPIBFA3JGBALLLAHWP4XDTBODMWR4NBN7MBUBLA";
// const account2Mnemoic =
//   "smart delay marble spot cheese affair range purchase security chase display hello thank betray gesture sadness team twice lunar mention axis broken cradle abstract render";

// const account3Address =
//   "YOJDCYD35B3IPMVX74BLMGR3L5CWKZMMGXQ3G26H6IQQ7X42A3Z7VZKTM4";
// const account3Mnemoic =
//   "boss mask real sustain clean lizard patient lift section cloth tonight forget kick address wool world advice fold teach sand suffer galaxy scatter able donor";

// // managed by account 1
// const dgDollarAssetId = 17;

const account1Address =
  "NIOZNHERQBVYVT5OCYHT4VAJI4OOROXSEQUUQR6YPHZMWHMCPNSAK4GKBE";
const account1Mnemonic =
  "mechanic assume account hand hill lucky trip position total symbol next wrap subway scatter glass mechanic sound vacuum vintage pen abuse foster pizza ability friend";

const account2Address =
  "VJSOWZXI3NOLZCGRN5Q4ZDGRCCIXYZKNB22BN7X4DW5WPGMKOXIGWHKJBA";
const account2Mnemoic =
  "oven gesture together once junk salad giant atom flavor blanket whisper boss broken unfold remember shell check brain list head aisle deliver symbol above employ";

const account3Address =
  "YQGYJEOGGKP44GSRLE47W5EJ2WKBV6MJOHBNWMW676QKY2CW5K75HJ734M";
const account3Mnemoic =
  "chapter board blast rural next vicious noise marine piece doll recycle train scout record income void wish define current obey scrub action master above describe";

// managed by account 1
const dgDollarAssetId = 1;

const printAssetHolding = async function (
  algodClient: Algodv2,
  account: string,
  assetid: number
) {
  let accountInfo = await algodClient.accountInformation(account).do();
  for (let idx = 0; idx < accountInfo["assets"].length; idx++) {
    let scrutinizedAsset = accountInfo["assets"][idx];
    if (scrutinizedAsset["asset-id"] == assetid) {
      let myassetholding = JSON.stringify(scrutinizedAsset, undefined, 2);
      console.log("assetholdinginfo = " + myassetholding);
      break;
    }
  }
};

const createDigiDollarsAsset = async (algodClient: Algodv2) => {
  const params = await algodClient.getTransactionParams().do();
  const note = undefined; // arbitrary data to be stored in the transaction; here, none is stored
  const addr = account1Address;
  const defaultFrozen = false;
  const decimals = 0;
  const totalIssuance = 100000;
  const unitName = "DGDOLLAR";
  const manager = account1Address;
  const reserve = account1Address;
  const freeze = account1Address;
  const clawback = account1Address;

  // signing and sending "txn" allows "addr" to create an asset
  const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
    addr,
    note,
    totalIssuance,
    decimals,
    defaultFrozen,
    manager,
    reserve,
    freeze,
    clawback,
    unitName,
    undefined,
    undefined,
    undefined,
    params
  );

  const rawSignedTxn = txn.signTxn(mnemonicToSecretKey(account1Mnemonic).sk);
  const tx = await algodClient.sendRawTransaction(rawSignedTxn).do();

  let assetID = null;
  const ptx = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
  assetID = ptx["asset-index"];
  console.log(
    "Transaction " + tx.txId + " confirmed in round " + ptx["confirmed-round"]
  );

  console.log(`Assset ${unitName} is created. Asset ID ${assetID}`);
};

const optInAddressToReceivingAsset = async (algodClient: Algodv2) => {
  const params = await algodClient.getTransactionParams().do();

  const sender = account2Address;
  const recipient = account2Address;
  // We set revocationTarget to undefined as
  // This is not a clawback operation
  let revocationTarget = undefined;
  // CloseReaminerTo is set to undefined as
  // we are not closing out an asset
  let closeRemainderTo = undefined;
  // We are sending 0 assets
  const amount = 0;
  // signing and sending "txn" allows sender to begin accepting asset specified by creator and index
  let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
    sender,
    recipient,
    closeRemainderTo,
    revocationTarget,
    amount,
    undefined,
    dgDollarAssetId,
    params
  );

  // Must be signed by the account wishing to opt in to the asset
  let rawSignedTxn = opttxn.signTxn(mnemonicToSecretKey(account2Mnemoic).sk);
  let opttx = await algodClient.sendRawTransaction(rawSignedTxn).do();
  // Wait for confirmation
  let confirmedTxn = await algosdk.waitForConfirmation(
    algodClient,
    opttx.txId,
    4
  );
  //Get the completed Transaction
  console.log(
    "Transaction " +
      opttx.txId +
      " confirmed in round " +
      confirmedTxn["confirmed-round"]
  );

  // You should now see the new asset listed in the account information
  console.log("Account 3 = " + account2Address);
  await printAssetHolding(algodClient, account2Address, dgDollarAssetId);
};

const transferAsset = async ({
  algodClient,
  amount,
  assetId,
  recipient,
  sender,
  senderMnemoic,
}: {
  algodClient: Algodv2;
  amount: number;
  assetId: number;
  recipient: string;
  sender: string;
  senderMnemoic: string;
}) => {
  const params = await algodClient.getTransactionParams().do();
  const revocationTarget = undefined;
  const closeRemainderTo = undefined;
  const note = undefined;

  const xtxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
    sender,
    recipient,
    closeRemainderTo,
    revocationTarget,
    amount,
    note,
    assetId,
    params
  );
  const rawSignedTxn = xtxn.signTxn(mnemonicToSecretKey(senderMnemoic).sk);
  const xtx = await algodClient.sendRawTransaction(rawSignedTxn).do();

  const confirmedTxn = await algosdk.waitForConfirmation(
    algodClient,
    xtx.txId,
    4
  );
  console.log(
    "Transaction " +
      xtx.txId +
      " confirmed in round " +
      confirmedTxn["confirmed-round"]
  );

  console.log("Account 3 = " + recipient);
  await printAssetHolding(algodClient, recipient, assetId);
};

const App = () => {
  const [currentAccount, setCurrentAccount] = useState<Accounts | null>(null);

  useEffect(() => {
    const token =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const server = "http://localhost";
    const port = 4001;
    const algodClient = new algosdk.Algodv2(token, server, port);

    const ammClient = new AlgofiAMMClient(algodClient, 0);

    (async () => {
      try {
        // await transferAsset({
        //   algodClient,
        //   amount: 10,
        //   assetId: dgDollarAssetId,
        //   recipient: account2Address,
        //   sender: account1Address,
        //   senderMnemoic: account1Mnemonic,
        // });
        // await printAssetHolding(algodClient, account2Address, dgDollarAssetId);
        // await optInAddressToReceivingAsset(algodClient);
        // await createDigiDollarsAsset(algodClient);
        // const test = await getAccountBalances(algodClient, account1Address);
        // console.log("test", test);
        // const test2 = await ammClient.getAccountCreatedPools(account1Address);
        // console.log("test2", test2);
        // //Check your balance
        // let accountInfo = await algodClient
        //   .accountInformation(account1Address)
        //   .do();
        // console.log("Account balance: %d microAlgos", accountInfo.amount);
        // // Construct the transaction
        // let params = await algodClient.getTransactionParams().do();
        // // comment out the next two lines to use suggested fee
        // params.fee = algosdk.ALGORAND_MIN_TX_FEE;
        // params.flatFee = true;
        // const receiver = account2Address;
        // const enc = new TextEncoder();
        // const note = enc.encode("Hello World");
        // let amount = 1000000; //equivalent of 1 Algos
        // let sender = account1Address;
        // let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        //   from: sender,
        //   to: receiver,
        //   amount: amount,
        //   note: note,
        //   suggestedParams: params,
        // });
        // // Sign the transaction
        // let signedTxn = txn.signTxn(mnemonicToSecretKey(account1Mnemonic).sk);
        // let txId = txn.txID().toString();
        // console.log("Signed transaction with txID: %s", txId);
        // // Submit the transaction
        // await algodClient.sendRawTransaction(signedTxn).do();
        // // Wait for confirmation
        // let confirmedTxn = await algosdk.waitForConfirmation(
        //   algodClient,
        //   txId,
        //   4
        // );
        // //Get the completed Transaction
        // console.log(
        //   "Transaction " +
        //     txId +
        //     " confirmed in round " +
        //     confirmedTxn["confirmed-round"]
        // );
        // let string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
        // console.log("Note field: ", string);
        // accountInfo = await algodClient
        //   .accountInformation(account1Address)
        //   .do();
        // console.log(
        //   "Transaction Amount: %d microAlgos",
        //   confirmedTxn.txn.txn.amt
        // );
        // console.log("Transaction Fee: %d microAlgos", confirmedTxn.txn.txn.fee);
        // console.log("Account balance: %d microAlgos", accountInfo.amount);
        console.log("Use effect finished");
      } catch (err) {
        console.log("err", err);
      }
    })().catch((e) => {
      console.log(e);
    });
  }, []);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <RouteWrapper
          currentAccount={currentAccount}
          setCurrentAccount={setCurrentAccount}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  currentAccount={currentAccount}
                  setCurrentAccount={setCurrentAccount}
                />
              }
            />
            <Route
              path="/treasuries"
              element={
                <Home
                  currentAccount={currentAccount}
                  setCurrentAccount={setCurrentAccount}
                />
              }
            />
            <Route
              path="/home-loans"
              element={
                <Home
                  currentAccount={currentAccount}
                  setCurrentAccount={setCurrentAccount}
                />
              }
            />
            <Route
              path="/mortgage-backed-securities"
              element={
                <Home
                  currentAccount={currentAccount}
                  setCurrentAccount={setCurrentAccount}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </RouteWrapper>
      </BrowserRouter>
    </ChakraProvider>
  );
};

type RouteWrapperArgs = {
  children: any;
  currentAccount: Accounts | null;
  setCurrentAccount: any;
};

const RouteWrapper = (args: RouteWrapperArgs) => {
  const children = args.children;
  const currentAccount = args.currentAccount;
  const setCurrentAccount = args.setCurrentAccount;

  return (
    <ScrollToTop>
      <PageWrapper
        children={children}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
      ></PageWrapper>
    </ScrollToTop>
  );
};

export default App;
