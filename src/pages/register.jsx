import React from 'react';
import {
  MDBInputGroup,
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
import { useNavigate,NavLink } from 'react-router-dom';
import { ethers } from 'ethers';


export default function Register() {
    const [showBasic, setShowBasic] = useState(false);
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');
    const [arrayInput, setArrayInput] = useState([]);
    // const [email,setEmail] = useState();
    // const [name, setName] = useState();
    // const [skills,setSkills] = useState();
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
    const [user, setUser] = useState({
      email: "", name: "", skills: []
    });
   
  
    const handleInputs = (e) => {
      const name = e.target.name;
      let value = e.target.value;
  
      // Convert skills input to an array
      if (name === 'skills') {
        value = value.split(',').map(skill => skill.trim());
      }
  
      setUser(prevUser => ({ ...prevUser, [name]: value }));
    };
  
    // const handleSubmit = (e) => {
    //   e.preventDefault();
  
    //   // Send the user state to the backend or perform any desired actions
    //   console.log(user);
    // };

    async function onSubmit(e) {
      e.preventDefault();
    
      // When a post request is sent to the create url, we'll add a new record to the database.
      const newPerson = { ...user };
    
      await fetch("http://localhost:5050/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      })
      .catch(error => {
        window.alert(error);
        return;
      });
      setUser({ email: "", name: "",skills:[]});
      // navigate("/");
      console.log(user);
      navigate('/home', {replace: true})
    }
    let navigate = useNavigate();

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
                Post
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem style={{ fontFamily: 'Nexa-Light', fontSize: '30px', padding:'10px'}}>
              <MDBNavbarLink active aria-current='page' href='/projects'>
                Projects
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem style={{ fontFamily: 'Nexa-Light', fontSize: '30px', padding:'10px'}}>
              <MDBNavbarLink active aria-current='page' href='/projectData'>
                Project_Details
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
    
    <form   method='POST' onSubmit={onSubmit}>
   <div className='form'>
        <h2>Registration details</h2>

        <MDBInputGroup style={{color: 'black'}} className='mb-3' textAfter='@example.com'>
          <input
            onChange={handleInputs}
            value={user.email}
            className='form-control'
            type='email'
            name='email'
            placeholder='Email ID'
            autoComplete='off'
          />
        </MDBInputGroup>

        <MDBInputGroup className='mb-3' textBefore='Name'>
          <input
            onChange={handleInputs}
            value={user.name}
            className='form-control'
            type='text'
            name='name'
          />
        </MDBInputGroup>

        <MDBInputGroup className='mb-3' textBefore='Skills'>
          <input
            onChange={handleInputs}
            value={user.skills.join(',')} 
            className='form-control'
            type='text'
            name='skills'
          />
        </MDBInputGroup>
        <MDBBtn className='button'  type='submit'>Submit</MDBBtn>

      </div>
      </form>
      
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
    h2 {
      font-family: "Nexa";
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
  }
`;