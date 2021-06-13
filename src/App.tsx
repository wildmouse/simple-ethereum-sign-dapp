import React, { useState } from "react";
import "./App.css";
import { useEthers } from "@usedapp/core";

function App() {
  const [message, setMessage] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const { activateBrowserWallet, account, library } = useEthers();

  return (
    <div>
      <h2>Ethereum signature playground</h2>
      <div>
        <button onClick={() => activateBrowserWallet()}>Connect</button>
      </div>
      {account && <p>Account: {account}</p>}
      <div>
        <textarea
          rows={10}
          cols={50}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </div>
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
