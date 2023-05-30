import React from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ethers } from "ethers";
import logo from './MetaMask.png';


export default function Login() {
  const [showBasic, setShowBasic] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);
  let [account , setAccount]= useState("");

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        localStorage.setItem("walletAddress", accounts[0]); // store the address in local storage

        console.log(accounts[0]);
       
       
        } 
      catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
          navigate('/projects', {replace: true})
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  async function getAccountInfo() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Connect to MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create provider and signer objects
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Get account address
        const address = await signer.getAddress();
        setAddress(address);
        // Get account balance
        const balanceWei = await signer.getBalance();
        const balanceEth = ethers.utils.formatEther(balanceWei);
        setBalance(balanceEth);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log('MetaMask not detected');
    }
  }

  getAccountInfo();

  let navigate = useNavigate();

  return (
   <>
       <MDBNavbar style={{backgroundColor: '#84CEEB'}} className='nav' expand='lg' light bgColor='#5AB9EA'>
      <MDBContainer fluid>
        <MDBNavbarBrand  style={{ fontFamily: 'Nexa', fontSize: '30px' }} href='/'>Paylancer</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>


      </MDBContainer>
    </MDBNavbar>
    <FormContainer>
      <BrandContainer>
        <Image src={logo} alt="Logo" />
        <LoginButton onClick={connectWallet}>Login</LoginButton>
      </BrandContainer>
    </FormContainer>
</>
  );
}
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color:#C1C8E4;
`;

const BrandContainer = styled.div`
  position: relative;
  text-align: center;
`;

const Image = styled.img`
  width: 10vm;
`;

const LoginButton = styled(MDBBtn)`
  position: absolute;
  bottom: 850px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 50px;
  font-size: 20px;
  background-color: #5AB9EA;
`;

