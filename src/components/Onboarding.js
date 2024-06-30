import {
    Box,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
  } from "@chakra-ui/react";
import React, { useState } from 'react'
import Signup from './Signup'
import Login from './Login'
import bvid from '../img/bvid.mp4';

export default function Onboarding() {


    const [isLoginHovered, setLoginIsHovered] = useState(false);
    const [isSignHovered, setSignIsHovered] = useState(false);

    const loginhandleMouseEnter = () => {
      setLoginIsHovered(true);
    };
  
    const loginhandleMouseLeave = () => {
      setLoginIsHovered(false);
    };

    const signhandleMouseEnter = () => {
        setSignIsHovered(true);
      };
    
      const signhandleMouseLeave = () => {
        setSignIsHovered(false);
      };

  return (
    <div style={{width:"100%",height:"100vh",fontFamily:"Share Tech Mono"
    }}>
          <video src={bvid} autoPlay loop muted style={{width:"100%",height:"100vh",objectFit:"cover"}}/>
          <div style={{position:'absolute',width:"100%",height:"100%",top:0,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',color:'white'}}>
        <Box style={{ boxShadow:"0px 0px 10px rgba(0,0,0,0.1)",
    color:"white",
    borderRadius:"10px",
    
    backdropFilter:"blur(2.88px)",
    alignContent:"center",
    alignItems:'center'}} w="50%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList  mb="1em">
            <Tab  onMouseEnter={loginhandleMouseEnter}
        onMouseLeave={loginhandleMouseLeave} className="share-tech mono-regular" style={{ backgroundColor: isLoginHovered ? 'red' : 'transparent',color:"white",border:"2px solid white",marginInlineEnd:"2px"}} >Login</Tab>
            <Tab onMouseEnter={signhandleMouseEnter}
        onMouseLeave={signhandleMouseLeave} className="share-tech mono-regular" style={{ backgroundColor: isSignHovered ? 'red' : 'transparent',color:"white",border:"2px solid white",marginInlineStart:"2px"}}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

          </div>
          
    </div>
   
  )
}
