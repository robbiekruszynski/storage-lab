import React, { useState } from "react";
import { simpleStorage } from "./abi/abi";
import Web3 from "web3";
import "./App.css";

const web3 = new Web3(Web3.givenProvider);

const contractAddress = "0xe5480ed2FF30255A06C2b036a19F9004121b7630";
const simpleContract = new web3.eth.Contract(simpleStorage, contractAddress);

function App() {
  const [number, setNumber] = useState(0);
  const [getNumber, setGetNumber] = useState("0");

  const handleSet = async (t) => {
    t.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await simpleContract.methods.set(number).estimateGas();
    const result = await simpleContract.methods.set(number).send({
      from: account,
      gas,
    });
    console.log(result);
  };

  const handleGet = async (e) => {
    e.preventDefault();
    const result = await simpleContract.methods.get().call();
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
          <button className="button" type="submit" value="Confirm">
            Set your uint256
          </button>
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
