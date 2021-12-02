import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import Votingabi from "./contracts/Voting.json";
import Web3 from "web3";
import Navbar from "./components/Navbar";

function App() {
  const [account, setAccount] = useState("");
  const [voting, setVoting] = useState("");
  const [candidate, setCandidate] = useState("");
  const [candidate1, setCandidate1] = useState("");
  const [candidate2, setCandidate2] = useState("");
  const [balance, setBalance] = useState("");
  const [change,setChange]=useState(false);
  useEffect(() => {
    loadweb3();
    LoadBlockchaindata();
    
    //  .then(setBalance(console.log));
    // const value = window.web3.utils.fromWei(amt, "ether");
    // setBalance(value);
    
  }, [candidate]);

  const loadweb3 = async () => {
    if (window.etherium) {
      window.web3 = new Web3(window.etherium);
      await window.web3.etherium.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("non etherium browser");
    }
  };

  
  const LoadBlockchaindata = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    
    //const balance = web3.eth.getBalance(account.toString());
   // console.log(account.toString());
   let amt = await window.web3.eth.getBalance(accounts[0]);
   const amt1= await web3.utils.fromWei(amt, "ether");
   setBalance(amt1);
    
     const networkId = await web3.eth.net.getId();
    const networkData = Votingabi.networks[networkId];

    if (networkData) {
      const votingdata = new web3.eth.Contract(
        Votingabi.abi,
        networkData.address
      );
      setVoting(votingdata);
      console.log(votingdata.methods)
    
      const Alice = await votingdata.methods.candidates(1).call();
      const Bob = await votingdata.methods.candidates(2).call();
      //console.log("hello");
      setCandidate1(Alice);
      setCandidate2(Bob);
      console.log(Alice);
      console.log(Bob);
    } else {
      window.alert("smart contract not deployed");
    }
  };

  const vote = async(id) =>{
    await voting.methods.vote(id).send({'from':account}).on('transactionhash',()=>{
      console.log("voted");
    }) 
  } 

 

  const onChange = (e) => {
     e.preventDefault();
    setCandidate(e.target.value);
    console.log(e.target.value);
    setChange(false)
  };
  const onSubmit = (e) => {
    e.preventDefault();
    vote(Number(candidate));
    setChange(true)
    console.log(Number(candidate));
    
  };
  return (
    <div className="App">
      <Navbar account={(account)} balance={(balance)} />
    
      <p>
        {candidate1.name} Id : {candidate1.id} Vote :{candidate1.voteCount}
      </p>
      <p>
        {candidate2.name} ID : {candidate2.id} Vote :{candidate2.voteCount}
      </p>
      {/* hello your account is {account} */}
      <h3>GIVE YOUR VOTE : </h3>
      <form onSubmit={onSubmit} >
      <select onChange={onChange}>
        <option value='1'>{candidate1.name}</option>
        <option value="2"> {candidate2.name}</option>
      </select>
      <p>
        <button >VOTE</button>
      </p>
      </form>
    </div>
  );
}

export default App;
