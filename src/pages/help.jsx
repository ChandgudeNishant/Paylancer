import React from 'react';
import {
  MDBInput,
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
  MDBTextArea
} from 'mdb-react-ui-kit';
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate ,Link } from 'react-router-dom';
import { ethers } from 'ethers';
import logo from'./logo.jpeg';
//import logo1 from './logo1.png';

export default function Help() {
  const [showBasic, setShowBasic] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [projectId, setProjectID] = useState('');
  const [details,setDetails] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [gotError, setGotError] = useState('');


const navigate = useNavigate();
  const contractAddress = '0xC0504AF83a4C6F153fb46da8ACe87AB7C9C9dA09';


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

  
  return (
    <>
           <MDBNavbar style={{backgroundColor: 'white'}} className='nav' expand='lg' light bgColor='#5AB9EA'>
             <MDBContainer fluid>
             <img src={logo} style={{height:'65px', width:'65px',padding:'5px'}}/>

      <MDBNavbarBrand  style={{ fontFamily: 'Nexa', fontSize: '40px' }} href='/landing'>Paylancer</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem style={{ fontFamily: 'Nexa-Light', fontSize: '30px', padding:'10px'}}>
              <MDBNavbarLink active aria-current='page' href='/home'>
                Post a Project
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem style={{ fontFamily: 'Nexa-Light', fontSize: '30px', padding:'10px'}}>
              <MDBNavbarLink active aria-current='page' href='/projects'>
                Projects
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem style={{ fontFamily: 'Nexa-Light', fontSize: '30px', padding:'10px'}}>
              <MDBNavbarLink active aria-current='page' href='/projectData'>
                Project Details
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem style={{ fontFamily: 'Nexa-Light', fontSize: '30px', padding:'10px'}}>
              <MDBNavbarLink active aria-current='page' href='/help'>
               Help
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <p style={{fontSize: '22px',paddingTop:'10px'}}><span style={{ fontWeight: 'bold' }}>Wallet Address: </span>{address}</p>
              </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    <FormContainer>
    <h1>Welcome to Paylancer</h1>
    <h2>Flow of the Paylancer</h2>
  <div className='form'>
    <div className='title'>
  
    <h3>➜ How to Create a <Link to="/home">Project</Link></h3>
    <br></br>
    </div>
    <p>• Enter the unique Project ID, Project explanation with <br /> skill set required for project and the maximum pricing <br/>• Click on Submit to add the project at Paylancer </p>
    <p></p>
    <br />
  </div>
  <div className='form'>
    <div className='title'>
    <h3>➜ How to <Link to="/projects">Bid</Link> a Project</h3>
    <br></br>
    </div>
    <p>• Enter the project ID which contains the matching skills to your Profile <br />• Enter the Minimum Pricing for which you can complete the project<br/>• Click on Bid to make a bid for that project </p>
    <p></p>
    <br />
  </div>
  <div className='form'>
    <div className='title'>
    <h3>➜ Get <Link to="/projectData">Details</Link> of the Projects</h3>
    <br></br>
    </div>
    <p>• Enter the project ID to get details to Client, Freelancer, project information,<br/> maximum pricing, minimum price, <br/>• Click on Get to access the information </p>
    <p></p>
    <br />
  </div>
    </FormContainer>

    </>
  );
}
const FormContainer = styled.div`
height: 200vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #C1C8E4  ;
  h1 {
    margin-top:10px;
    font-family: "Nexa";
    font-size: 2rem;
  }
  h2 {
    font-family: "Nexa-Light";
  }

  .title{
    margin-top:50px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .form {
    padding: 20px; /* Instead of 20vw */
    margin-top:50px;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 2rem;
    padding: 3rem 5rem;
    border: 0.1rem solid #5a2651
    .mb-3 {
      display: flex;
      align-items: center;
      justify-content: center;
      
    }
    h1 {
      font-family: "Nexa";
      font-size: 2rem;
    }
    p{
      color: black;
    }

    button{
      background-color: #2298d6;
      border-radius: 2rem;
      border: 0.1rem solid #0b80bd;
      &:hover {
        background-color: #26b3fc;
      }
    }
    #textAreaExample {
        padding: 30px 50px;
        font-size: 20px;
        
        label{
          font-size: 20px;
        }
        h2 {
          font-family: "Nexa";
        }
       }
  
`;
