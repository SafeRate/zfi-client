import algosdk from "algosdk";
import MyAlgoConnect, { Accounts } from "@randlabs/myalgo-connect";
import IndexerClient from "algosdk/dist/types/src/client/v2/indexer/indexer";

export const getMyAlgoUserAccount = async (): Promise<Accounts | null> => {
  const myAlgoConnect = new MyAlgoConnect();
  const accounts: Accounts[] = await myAlgoConnect.connect({
    shouldSelectOneAccount: true,
  });

  if (Array.isArray(accounts) && accounts.length > 0) {
    console.log(accounts);
    return accounts[0];
  } else {
    return null;
  }
};

export const getMyAlgoUserAccounts = async (): Promise<Accounts[] | null> => {
  const myAlgoConnect = new MyAlgoConnect();
  const accounts = await myAlgoConnect.connect({
    shouldSelectOneAccount: false,
  });
  if (Array.isArray(accounts) && accounts.length > 0) {
    return accounts;
  } else {
    return [];
  }
};

export type MyAlgoNetworkConnection = {
  algodClient: algosdk.Algodv2;
  algodParams: algosdk.SuggestedParams;
  indexerClient: IndexerClient;
};

export const getMyAlgoNetworkConnection =
  async (): Promise<MyAlgoNetworkConnection> => {
    const algodClient: algosdk.Algodv2 = new algosdk.Algodv2(
      `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
      `http://localhost`,
      4001
    );
    const indexerClient: IndexerClient = new algosdk.Indexer(
      `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
      `http://localhost`,
      8980
    );

    const algodParams: algosdk.SuggestedParams = await algodClient
      .getTransactionParams()
      .do();

    return {
      algodClient,
      algodParams,
      indexerClient,
    };
  };
