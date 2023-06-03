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
  MDBTableHead,
  MDBTableBody,
  MDBTable,
  MDBTextArea
} from 'mdb-react-ui-kit';
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate,NavLink } from 'react-router-dom';
import { ethers } from 'ethers';
import BiddingContract from './BiddingContract.json';

export default function Projects() {
  const [showBasic, setShowBasic] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [projectId, setProjectID] = useState('');
  const [details,setDetails] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [gotError, setGotError] = useState('');
  const [projects, setProjects] = useState([]);
  const [value, setValue] = useState(''); // State to hold the user input


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



  const accounts =  window.ethereum.request({ method: 'eth_requestAccounts' });

      // Create Web3Provider instance
      const provider = new ethers.providers.Web3Provider(window.ethereum);
  
      // Create Signer instance
      const signer = provider.getSigner(accounts[0]);
  
      // Create contract instance
      const contract = new ethers.Contract(contractAddress, BiddingContract.abi, signer);

      useEffect(() => {

        const AllProjects = async () => {
          const projects = await contract.getDetails();
          setProjects(projects);
        };
       contract && AllProjects();
        },[contract]);

        const PlaceBid = async (event) => {
          event.preventDefault();
          if (!value) {
              console.log('Please enter a value');
              return;
            }
        
            const valueInWei = ethers.utils.parseEther(value); // Convert the user input to wei
        
          try{
        
              // Send the transaction to the smart contract
              const tx = await contract.placeBid(projectId, { value: valueInWei });
            
            // Call the contract function
        
            // Wait for the transaction to be mined
            setGotError('');
            console.log(tx);
            // Show success message
            console.log('Bid Placed Successfully!');
            alert('Bid Placed Successfully!');
          }catch(error){
            console.error(error); // log the error to the console
            setGotError(`Error Please check the Project ID & Bidding Amount`);
          }
        };
  
  const handleProjectIDChange = (event) => {
    setProjectID(event.target.value);
  };

  
  return (
    <>
      <MDBNavbar style={{backgroundColor: 'white'}} className='nav' expand='lg' light bgColor='#5AB9EA'>
       <MDBContainer fluid>
      <MDBNavbarBrand  style={{ fontFamily: 'Nexa', fontSize: '30px' }} href='/landing'>Paylancer</MDBNavbarBrand>

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
    <div className='bid'>
    <h1>Place the Bid</h1>
    <br></br>
    <h2>Project ID:</h2>
    <MDBInput type="number" value={projectId} onChange={handleProjectIDChange} label='Enter Project ID'/>
    <br></br>
    <h2>Enter Amount:</h2>
    <MDBInput type="number" value={value} onChange={e => setValue(e.target.value)} label='Enter the Price'/>
    <br></br>
    {gotError}
    <MDBBtn onClick={PlaceBid} type='submit'>Place</MDBBtn>
    </div>
    <br></br>
    <div className='table'>
     <h1>List of Projects</h1>
  <MDBTable align='middle'>
    <MDBTableHead>
      <tr>
        <th scope='col'><p> Project ID</p></th>
        <th scope='col'><p>Client wallet address</p></th>
        <th scope='col'><p>Maximum Price</p></th>
        <th scope='col'><p>Project Details</p></th>


      </tr>
    </MDBTableHead>
    {projects.map((project) => {
        return (
          <MDBTableBody key={project.projectId}>
            <tr>
              <td>
                <div className='d-flex align-items-center'>
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>{project.projectId.toString()}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className='fw-normal mb-1'>{project.user.toString()}</p>
              </td>
              <td>
                <p>{project.maxAmount.toNumber()}</p>
              </td>
              <td>
                <div className='details'>
                  <p>{project.ideaDetails}</p>
                  </div>
              </td>
            </tr>
          </MDBTableBody>
        );
      })}
  </MDBTable>
  </div>
</div>


    </FormContainer>
    </>
  );
}
const FormContainer = styled.div`
height: auto;
width: auto;
display: flex;
// align-items: center;
// justify-content: center;
 flex-direction: column;
background-color: #C1C8E4  ;


.bid {
  margin-top:50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1px;
  padding-left: 50%;
  // transform: translateX(50%);
  background-color: white;
  border-radius: 13px;
  padding: 3rem 5rem;
  border: 0.1rem solid #5a2651
  .mb-3 {
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
  h2 {
    font-family: "Nexa";
    font-size: 2rem;
  }
  h1 {
    font-family: "Nexa-Light";
    font-size: 50px  }
  p{
    color: black;
  }
  button{
    background-color: #2298d6;
    border-radius: 15px;
    font-size: 15px;
    border: 0.1rem solid #0b80bd;
    &:hover {
      background-color: #26b3fc;
    }
  }}
  .table {
    margin-top:50px;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    flex-direction: column;
    gap: 1px;
    background-color: white;
    border-radius: 13px;
    padding: 3rem 5rem;
    border: 0.1rem solid #5a2651
    .mb-3 {
      display: flex;
      align-items: center;
      justify-content: center;
      
    }
    h2 {
      font-family: "Nexa";
      font-size: 2rem;
    }
    h1 {
      font-family: "Nexa-Light";
      font-size: 50px  }
    p{
      color: black;
    }
    button{
      background-color: #2298d6;
      border-radius: 15px;
      font-size: 15px;
      border: 0.1rem solid #0b80bd;
      &:hover {
        background-color: #26b3fc;
      }
    }


`;
