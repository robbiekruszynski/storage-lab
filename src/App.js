import React, { useState } from "react";
import Web3 from "web3";
import { simpleStorage } from "./abi";
import "./App.css";

const web3 = new Web3(Web3.givenProvider);

// contract address
const contractAddr = "0xe5480ed2FF30255A06C2b036a19F9004121b7630";
const SimpleContract = new web3.eth.Contract(simpleStorage, contractAddr);

function App() {
  const [number, setNumber] = useState(0);
  const [getNumber, setGetNumber] = useState("0");

  const handleSet = async (t) => {
    t.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await SimpleContract.methods.set(number).estimateGas();
    const result = await SimpleContract.methods.set(number).send({
      from: account,
      gas,
    });
    console.log(result);
  };

  const handleGet = async (e) => {
    e.preventDefault();
    const result = await SimpleContract.methods.get().call();
    setGetNumber(result);
    console.log(result);
  };

  return (
    <div className="main">
      <div className="card">
        <form className="form" onSubmit={handleSet}>
          <label>
            Set your uint256:
            <input
              className="input"
              type="text"
              name="name"
              onChange={(e) => setNumber(e.target.value)}
            />
          </label>

          <input type="submit" value="Confirm" />
        </form>
        <br />
        <button className="button" onClick={handleGet} type="button">
          Get your uint256
        </button>
        {getNumber}
      </div>
    </div>
  );
}

export default App;
