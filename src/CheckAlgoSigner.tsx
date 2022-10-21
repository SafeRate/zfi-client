/* global AlgoSigner */
import { useCallback } from "react";
import ExampleAlgoSigner from "./ExampleAlgoSigner";

const CheckAlgoSigner = () => {
  const action = useCallback(() => {
    // @ts-ignore
    if (typeof AlgoSigner !== "undefined") {
      return "AlgoSigner is installed.";
    } else {
      return "AlgoSigner is NOT installed.";
    }
  }, []);

  return (
    <ExampleAlgoSigner
      title="CheckAlgoSigner"
      buttonText="Check"
      buttonAction={action}
    />
  );
};

export default CheckAlgoSigner;
