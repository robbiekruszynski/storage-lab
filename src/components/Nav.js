import React from "react";
import Web3 from "web3";

class Nav extends React.Component {
  state = { account: "" };

  async loadAccount() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8080");
    const network = await web3.eth.net.getNetworkType();
    console.log(network); // should give you main if you're connected to the main network via metamask...
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
  }

  componentDidMount() {
    this.loadAccount();
  }
  render() {
    return (
      <div>
        <p>Your connected address: {this.state.account}</p>
      </div>
    );
  }
}
export default Nav;
