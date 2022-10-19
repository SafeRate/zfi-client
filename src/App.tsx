import algosdk, {
  secretKeyToMnemonic,
  mnemonicToSecretKey,
  Algodv2,
} from "algosdk";
import { useEffect } from "react";
import { AlgofiAMMClient, getAccountBalances } from "@algofi/amm-v0";

const account1Address =
  "NKSLVLXIHT72KBTFQBHH3ZJU3LRYGTEO5VPDDHHSIPLUDY26GGZOVQBFRQ";
const account1Mnemonic =
  "motion palm increase pluck exclude fatal nation blast nurse describe ghost puzzle banner mystery federal diagram deliver enough cherry thunder ski unique enjoy about visit";

const account2Address =
  "UYIUWVAS2OCZNFKSHRRCPIBFA3JGBALLLAHWP4XDTBODMWR4NBN7MBUBLA";
const account2Mnemoic =
  "smart delay marble spot cheese affair range purchase security chase display hello thank betray gesture sadness team twice lunar mention axis broken cradle abstract render";

const account3Address =
  "YOJDCYD35B3IPMVX74BLMGR3L5CWKZMMGXQ3G26H6IQQ7X42A3Z7VZKTM4";
const account3Mnemoic =
  "boss mask real sustain clean lizard patient lift section cloth tonight forget kick address wool world advice fold teach sand suffer galaxy scatter able donor";

const dgDollarAssetId = 17;

const createDigiDollarsAsset = async (algodclient: Algodv2) => {
  const params = await algodclient.getTransactionParams().do();
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
  const tx = await algodclient.sendRawTransaction(rawSignedTxn).do();

  let assetID = null;
  const ptx = await algosdk.waitForConfirmation(algodclient, tx.txId, 4);
  assetID = ptx["asset-index"];
  console.log(
    "Transaction " + tx.txId + " confirmed in round " + ptx["confirmed-round"]
  );

  console.log(`Assset ${unitName} is created. Asset ID ${assetID}`);
};

const App = () => {
  useEffect(() => {
    const token =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const server = "http://localhost";
    const port = 4001;
    const algodClient = new algosdk.Algodv2(token, server, port);

    const ammClient = new AlgofiAMMClient(algodClient, 0);

    (async () => {
      try {
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
