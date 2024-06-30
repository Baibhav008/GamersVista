import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom';

const Signup = () => 
{
  

    const[show,setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);

    const [loading,setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const handleClick = () => setShow(!show);

    const postDetails = (pics) =>{
      setLoading(true);
      if(pics==undefined)
      {
        toast({title:"please select an image", duration:5000, position:"bottom"});
        return;

      }
      if(pics.type==="image/png" || pics.type==="image/jpeg")
      {
        const data = new FormData();
        data.append("file",pics);
        data.append("upload_preset","gamer-vista");
        data.append("cloud_name","wildwolf");
        fetch("https://api.cloudinary.com/v1_1/wildwolf/image/upload",{
          method:'post',body:data
        }).then((res)=>res.json()).then(data=>{
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        }).catch((err)=>{
          console.log(err);
          setLoading(false);
        })
      }else{
        toast({title:"please select an image", duration:5000, position:"bottom"});
        setLoading(false);
      }

    };

    const submitHandler = async () => {
      setLoading(true);
      if (!name || !email || !password || !confirmpassword) {
        toast({
          title: "Please Fill all the Feilds",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
      if (password !== confirmpassword) {
        toast({
          title: "Passwords Do Not Match",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      console.log(name, email, password, pic);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/user",
          {
            name,
            email,
            password,
            pic,
          },
          config
        );
        console.log(data);
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        history.push("/main");
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    };

  return (
    <VStack spacing="5px" style={{width:"100%",marginBlockStart:"50px",marginBlockEnd:"50px",
    
    boxShadow:"0px 0px 10px rgba(0,0,0,1)",
    color:"white",
    borderRadius:"10px",
    padding:"30px 40px",
    
    alignContent:"center",
    alignItems:'center'}} 
    >
    <FormControl id="first-name" isRequired>
      <FormLabel>Name</FormLabel>
      <Input
        placeholder="Enter Your Name"
        onChange={(e) => setName(e.target.value)}
      />
    </FormControl>

    <FormControl id="email" isRequired>
      <FormLabel>Email Address</FormLabel>
      <Input
        type="email"
        placeholder="Enter Your Email Address"
        onChange={(e) => setEmail(e.target.value)}
      />
    </FormControl>

    <FormControl id="password" isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup size="md">
        <Input
          type={show ? "text" : "password"}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick} >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>

    <FormControl id="password" isRequired>
      <FormLabel>Confirm Password</FormLabel>
      <InputGroup size="md">
        <Input
          type={show ? "text" : "password"}
          placeholder="Confirm password"
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
        <InputRightElement width="4.5rem" onClick={handleClick}>
          <Button h="1.75rem" size="sm" >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>


    <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
    </FormControl>


      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>

   
  </VStack>

   )
}

export default Signup
