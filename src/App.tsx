import React, { useState } from "react";
import "./App.css";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";

function App() {
  const [message, setMessage] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const { activateBrowserWallet, account, library } = useEthers();
  const etherBalance = useEtherBalance(account);

  return (
    <div>
      <h2>Ethereum signature playground</h2>
      <div>
        <button onClick={() => activateBrowserWallet()}>Connect</button>
      </div>
      {account && <p>Account: {account}</p>}
      <textarea onChange={(e) => setMessage(e.target.value)} value={message} />
      {library && (
        <button
          onClick={() => {
            library
              ?.getSigner()
              .signMessage(message)
              .then((signature) => setSignature(signature));
          }}
        >
          Sign message
        </button>
      )}
      {signature && <p>Signature: {signature}</p>}
    </div>
  );
}

export default App;
