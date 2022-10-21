import { useCallback } from "react";
import ExampleAlgoSigner from "./ExampleAlgoSigner";

const GetAccounts = () => {
  const action = useCallback(async () => {
    // @ts-ignore
    await AlgoSigner.connect({
      ledger: "TestNet",
    });

    // @ts-ignore
    const accts = await AlgoSigner.accounts({
      ledger: "LocalNet",
    });
    return JSON.stringify(accts, null, 2);
  }, []);

  return (
    <ExampleAlgoSigner
      title="Get Accounts"
      buttonText="Get Accounts"
      buttonAction={action}
    />
  );
};

export default GetAccounts;
