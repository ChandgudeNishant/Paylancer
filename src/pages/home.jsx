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
import { useNavigate,NavLink } from 'react-router-dom';
import { ethers } from 'ethers';
import BiddingContract from './BiddingContract.json';
import logo from './logo.jpeg';

export default function Home() {
  const [showBasic, setShowBasic] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [projectId, setProjectID] = useState('');
  const [details,setDetails] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [gotError, setGotError] = useState('');


  let navigate = useNavigate();
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

  // const [skilled, setSkilled] = useState({
  //   skills: []
  // });
 

  // const handleInputs = (e) => {
  //   const name = e.target.name;
  //   let value = e.target.value;

  //   // Convert skills input to an array
  //   if (name === 'skills') {
  //     value = value.split(',').map(skilled => skilled.trim());
  //   }

  //   setSkilled(prevUser => ({ ...prevUser, [name]: value }));
  // };
  // async function onSubmit(e) {
  //   e.preventDefault();
  
  //   // When a post request is sent to the create url, we'll add a new record to the database.
  //   const newPerson = { ...skilled };
  
  //   await fetch("http://localhost:5050/postSkill", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newPerson),
  //   })
  //   .catch(error => {
  //     window.alert(error);
  //     return;
  //   });
  //   setSkilled({ skills:[]});
   
  //   console.log(skilled);
  // }


        const accounts =  window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create Web3Provider instance
        const provider = new ethers.providers.Web3Provider(window.ethereum);
    
        // Create Signer instance
        const signer = provider.getSigner(accounts[0]);
    
        // Create contract instance
        const contract = new ethers.Contract(contractAddress, BiddingContract.abi, signer);
      
    const postProject = async (event) => {
        event.preventDefault();
        try{
  
          // Call the contract function
          const tx = await contract.postProject(projectId, details, maxAmount);
      
          // Wait for the transaction to be mined
          await tx.wait();
          setGotError('');
          // Show success message
           navigate("/projects");
          console.log('Project posted successfully!');
          alert('Project posted successfully!')
        // } catch (error) {
        //   //console.error('Error adding book:', error);
        //   //setErrorMessage(error.message);
        //   console.log(error.message.reason);
        //   console.log(error);
        }catch(error){
          console.error(error); // log the error to the console
          setGotError(`Error Please check the project ID`);

        }
      };
      
      
  const handleProjectIDChange = (event) => {
    setProjectID(event.target.value);
  };

  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
  };

  const handleMaxAmountChange = (event) => {
    setMaxAmount(event.target.value);
  };
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
    <div className='form'>

    <form >

    <br></br>
      <h1>Project ID:</h1>
      <MDBInput  style={{color:'#021a26'}} value={projectId} onChange={handleProjectIDChange} className='inputArea' label='Enter ID' id='typeNumber' type='number' />
    <br></br>
    <h1>Project Details:</h1>
    <MDBTextArea  style={{color:'#021a26'}} value={details} onChange={handleDetailsChange} label='Explain here' id='textAreaExample' rows={4} />
    <br></br>
    <h1>Maximum Amount:</h1>
      <MDBInput  style={{color:'#021a26'}} value={maxAmount} onChange={handleMaxAmountChange} className='inputArea' label='Enter Amount' id='typeNumber' type='number' />
    
                <br></br>

                  <MDBBtn style={{fontSize:'15px'}} onClick={postProject} type='submit'>Submit</MDBBtn>
        </form>
        <p>{gotError}</p>
    </div>
    </FormContainer>
    </>
  );
}
const FormContainer = styled.div`
height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #C1C8E4  ;


  .form {
    padding: 90px; /* Instead of 20vw */
    margin-top:50px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
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
