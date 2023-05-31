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
import { ethers, BigNumber } from 'ethers';
import BiddingContract from './BiddingContract.json';

export default function PlaceBids() {
  const [showBasic, setShowBasic] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [projectId, setProjectID] = useState('');
  const [projectId1, setProjectID1] = useState('');
  const [projectId2, setProjectID2] = useState('');
  const [projectInfo, setProjectInfo] = useState('');
  const [details,setDetails] = useState('');
  const [bidderInfo, setBidderInfo] = useState([]);
  const [gotError, setGotError] = useState('');
    const [gotError1, setGotError1] = useState('');
  const [gotError2, setGotError2] = useState('');

  const [projects, setProjects] = useState([]);
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
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


      const ProjectInfo = async (event) => {
        try{
   
          const data = await contract.getProjectInfo(projectId1);
          const weiValue1 = BigNumber.from(data[4]);
          const ethValue = ethers.utils.formatEther(weiValue1);
          setProjectInfo({
            projectId: data[0].toString(),
            client: data[1],
            ideaDetails:data[2],
            maxAmount:data[3].toString(),
            minBid:ethValue,
            freelancer:data[5],
            biddingEndTime:data[6].toString(),

          });
          // Wait for the transaction to be mined
      setGotError('')
          // Show success message
          //console.log(data);
      return data;
        }catch(error){
          console.error(error);
          setGotError(`Error Please check the project ID`);
          // log the error to the console
          }
      };
      const BidderInfo = async (event) => {
        try {
          const tx = await contract.getBidders(projectId);
          const updatedBidderInfo = [];
      
          for (let i = 0; i < tx[0].length; i++) {
            const bidderAddress = tx[0][i];
            const bid = tx[1][i].toString();
            const weiValue = BigNumber.from(bid);
            const ethValue = ethers.utils.formatEther(weiValue);
            updatedBidderInfo.push({ BidderAddress: bidderAddress, bid: ethValue });
          }
      
          setBidderInfo(updatedBidderInfo);
          console.log(updatedBidderInfo);
                setGotError1('')

        } catch (error) {
          console.error(error);
                    setGotError1(`Error Please check the project ID`);

        }
      };

      const AssignProject = async (event) =>{
        try{
  
          // Call the contract function
          const tx = await contract.assignProject(projectId2);
      
          // Wait for the transaction to be mined
          await tx.wait();
          // Show success message
          console.log('Project Assigned');
          alert('Project Assigned!')
        // } catch (error) {
        //   //console.error('Error adding book:', error);
        //   //setErrorMessage(error.message);
        //   console.log(error.message.reason);
        //   console.log(error);
              setGotError2('')

        }catch(error){
          console.error(error); // log the error to the console
                      setGotError2(`Error Please check the project ID`);


        }
      }
  const handleProjectIDChange = (event) => {
    setProjectID(event.target.value);
  };
  const handleProjectIDChange2 = (event) => {
    setProjectID2(event.target.value);
  };
  const handleProjectIDChange1 = (event) => {
    setProjectID1(event.target.value);
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
    <div className='ProjectDetails'>
        <h1>Project Details</h1>
        <br></br>
        <h2>Project ID</h2>
        <br></br>
        <MDBInput
  type="number"
  value={projectId1}
  onChange={handleProjectIDChange1}
  label='Enter Project ID'
  style={{ fontSize: '20px' }}
/>        <br></br>
     <br></br>
     <p>{gotError}</p>
        <MDBBtn onClick={ProjectInfo} type='submit'>Show</MDBBtn>
<br></br>
<br></br>
        <p>Project ID: <span style={{ fontWeight: 'normal'}} className='data'>{projectInfo.projectId}</span></p>
      <p>Client Address: <span style={{ fontWeight: 'normal'}}  className='data'>{projectInfo.client}</span></p>
      <p>Project Details: <span style={{ fontWeight: 'normal'}}  className='data'>{projectInfo.ideaDetails}</span></p>
      <p>Max Price: <span style={{ fontWeight: 'normal'}}  className='data'>{projectInfo.maxAmount} ETH</span></p>
      <p>Minimum Price: <span style={{ fontWeight: 'normal'}}  className='data'>{projectInfo.minBid} ETH</span></p>
      <p>Freelancer Address: <span style={{ fontWeight: 'normal'}}  className='data'>{projectInfo.freelancer}</span></p>

    </div>
    <div className='AssignProject'>
        <h1>Assign Project Details</h1>
        <br></br>
        <h2>Project ID</h2>
        <br></br>
        <MDBInput
  type="number"
  value={projectId2}
  onChange={handleProjectIDChange2}
  label='Enter Project ID'
  style={{ fontSize: '20px' }} />  
        <br></br>
        <p>{gotError2}</p>
  <MDBBtn onClick={AssignProject} type='submit'>Assign</MDBBtn>
    
    </div>
    <div className='BidderInfo'>
      <h1>Bidder Information</h1>
      <br></br>
      <h2>Project ID</h2>
<br></br>
<MDBInput
  type="number"
  value={projectId}
  onChange={handleProjectIDChange}
  label='Enter Project ID'
  style={{ fontSize: '20px' }} />      <br></br>
      <br></br>
      <p>{gotError1}</p>
      <MDBBtn onClick={BidderInfo} type='submit'>Get</MDBBtn>

    <MDBTable align='middle'>
    <MDBTableHead>
      <tr>
      <th scope='col'><p>Bidded Price</p></th>
        <th scope='col'><p> Bidder Address</p></th>
      </tr>
    </MDBTableHead>
    {bidderInfo.map((bidder,index) => {
        return (
          <MDBTableBody key={index}>
            <tr>
            <td>
                <div className='d-flex align-items-center'>
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>{bidder.bid && bidder.bid.toString()} ETH</p>
                  </div>
                </div>
              </td> <td>
                <div className='d-flex align-items-center'>
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>{bidder.BidderAddress}</p>
                  </div>
                </div>
              </td>
            </tr>
          </MDBTableBody>
        );
      })}
  </MDBTable>
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


.ProjectDetails {
  margin-top:50px;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  flex-direction: column;
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
    font-weight: bold;
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
  .AssignProject {
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
      }}
      .BidderInfo {
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
