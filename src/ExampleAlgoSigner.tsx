/* global AlgoSigner */

import { useCallback, useState } from "react";
import { Heading, Button, Code } from "@chakra-ui/react";

type ExampleAlgoSignerArgs = {
  title: string;
  buttonText: string;
  buttonAction: any;
};

const ExampleAlgoSigner = (args: ExampleAlgoSignerArgs) => {
  const [result, setResult] = useState("");

  const title = args.title;
  const buttonAction = args.buttonAction;
  const buttonText = args.buttonText;

  const onClick = useCallback(async () => {
    const r = await buttonAction();
    setResult(r);
  }, [buttonAction]);

  return (
    <>
      <Heading as="h2">{title}</Heading>
      <Button onClick={onClick}>{buttonText}</Button>
      <Code>{result}</Code>
    </>
  );
};

export default ExampleAlgoSigner;

// const GetParams = () => {
//   const action = useCallback(async () => {
//     try {
//       const r = await AlgoSigner.algod({
//         ledger: "TestNet",
//         path: `/v2/transactions/params`,
//       });
//       return JSON.stringify(r, null, 2);
//     } catch (e) {
//       console.error(e);
//       return JSON.stringify(e, null, 2);
//     }
//   }, []);

//   return (
//     <ExampleAlgoSigner
//       title="Get Transaction Params"
//       buttonText="Get Transaction Params"
//       buttonAction={action}
//     />
//   );
// };

// const GetAppGlobalState = () => {
//   const action = useCallback(async () => {
//     try {
//       const r = await AlgoSigner.indexer({
//         ledger: "TestNet",
//         path: `/v2/applications/${appId}`,
//       });
//       return JSON.stringify(r, null, 2);
//     } catch (e) {
//       console.error(e);
//       return JSON.stringify(e, null, 2);
//     }
//   }, []);

//   return (
//     <ExampleAlgoSigner
//       title="Get Global State"
//       buttonText="Get Global State"
//       buttonAction={action}
//     />
//   );
// };
