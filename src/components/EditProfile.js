import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import logos from '../img/logos.jpeg'
import gvid from "../img/gvid.mp4"
import bg2 from '../img/bg2.jpg'
import {useHistory } from 'react-router-dom';
import { ChatState } from './Context/ChatProvider';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios'
const EditProfile = () => 
{

    const {user} = ChatState();
    const editEmail = localStorage.getItem("editEmail");
    console.log(localStorage.getItem("editEmail"));
    
    //console.log("State user : "+user.email)
    //console.log(user.steam)
    
    const sectionStyleLg = 
    {
        backgroundImage: `url(${bg2})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh', 
        
        paddingInline: "28%", fontFamily: "monospace"
        // Set the height to cover the entire viewport
    };
    const sectionStyleSm = 
    {
        backgroundImage: `url(${bg2})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh', 
        
        paddingInline: "8%", fontFamily: "monospace"
        // Set the height to cover the entire viewport
    };
    const history = useHistory();

    const goBack =()=>{
        history.push("/main")
    }

    const[formDataName,setFormDataName] = useState();
    const[formDataAbout,setFormDataAbout] = useState();
    const[formDataPassword,setFormDataPassword] = useState();
    const[formDataPic,setFormDataPic] = useState();
    const[formDataSteam,setFormDataSteam] = useState();
    const[formDataEpic,setFormDataEpic] = useState();

    const updateDetails = async () => {
        const nameF = document.getElementById('fName').value;
        const aboutF = document.getElementById('fAbout').value;
        const passwordF = document.getElementById('fPassword').value;
        const steamAccountF = document.getElementById('fSteam').value;
        const epicAccountF = document.getElementById('fEpic').value

        const response = await axios.post("/api/user/updateUser",{
            name : nameF,
            email : user.email,
            pic : user.pic,
            password: passwordF,
            about : aboutF,
            eA: epicAccountF,
            sA : steamAccountF
        });

        setFormDataName(response.data.name);
        setFormDataAbout(response.data.about);
        setFormDataEpic(response.data.epicGamesAccount);
        setFormDataPassword(response.data.password);
        setFormDataSteam(response.data.steamAccount);
        setFormDataPic(response.data.pic);

        console.log(response)
    
        //console.log('User details updated successfully!' + name + about + password + steamAccount + epicAccount);
    };

    const getDetails = async()=>{
        const response = await axios.post("/api/user/getCurrent",{
            email : editEmail,
        });

        setFormDataName(response.data.name);
        setFormDataAbout(response.data.about);
        setFormDataEpic(response.data.epicGamesAccount);
        setFormDataPassword(response.data.password);
        setFormDataSteam(response.data.steamAccount);
        setFormDataPic(response.data.pic);

        console.log(response + " new response ")

    }
    
    useEffect(() => {
        console.log(localStorage.getItem("editEmail"));
        getDetails();  
        
      }, []);
      

    



    return (

        <div style={sectionStyleLg}>
            
            <div className='neon-border' style={{
                width: "100%", height: "100%",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.8)",
                color: "white",
                borderRadius: "100% 0% 100% 0% / 40% 62% 38% 60%  ",
                alignContent: "center",
                alignItems: 'center',background:"rgba(0,0,0,0.8)"
            }} >
                
                <Container style={{ padding: "44px 0px" }}  >
                    
                    <Row className="mt-0 " style={{ alignContent: "center", alignItems: "center", textAlign: "center",width:"100%" }}>
                        <Col md={{ span: 6, offset: 3 }} >
                            <div className="text-center " style={{ display: "grid", placeItems: "center" }} >
                                <img

                                    src={formDataPic} // Replace with the actual profile picture URL
                                    alt="Profile"
                                    className="rounded-circle"
                                    width="100"
                                    height="100"
                                />
                                <Button className='p-2 mt-2 mb-4' variant="outline-success" style={{ borderRadius: "20px" }}>
                                    Select
                                </Button>
                            </div>
                            <Form>
                                <Form.Group as={Row}  controlId="formName" className='mt-2'>
                                    <Form.Label column sm="4" style={{ color: "white" }}>Name</Form.Label>
                                    <Col sm="8"><Form.Control id="fName" type="text" value={formDataName} onChange={(e) => setFormDataName(e.target.value)} required /></Col>

                                </Form.Group>

                                <Form.Group as={Row}  controlId="formEmail" className='mt-2'>
                                    <Form.Label column sm="4" style={{ color: "white" }}>About</Form.Label>
                                    <Col sm="8"> <Form.Control id="fAbout" type="text" value={formDataAbout} onChange={(e) => setFormDataAbout(e.target.value)} required /></Col>

                                </Form.Group>

                                <Form.Group as={Row}  controlId="formPassword" className='mt-2'>
                                    <Form.Label column sm="4" style={{ color: "white" }}>New Password</Form.Label>
                                    <Col sm="8"> <Form.Control id="fPassword" type="password" value="" onChange={(e) => setFormDataPassword(e.target.value)} required /></Col>

                                </Form.Group>

                                <Form.Group as={Row}  className='mt-2'>
                                    <Form.Label column sm="4" style={{ color: "white" }}>Steam Account</Form.Label>
                                    <Col sm="8"><Form.Control id="fSteam" type="text" onChange={(e) => setFormDataSteam(e.target.value)} value={formDataSteam} /></Col>

                                </Form.Group>
                                <Form.Group as={Row}  className='mt-2'>
                                    <Form.Label column sm="4" style={{ color: "white" }}>Epic Games Account</Form.Label>
                                    <Col sm="8"><Form.Control type="text" onChange={(e) => setFormDataEpic(e.target.value)} value={formDataEpic} id="fEpic"/></Col>

                                </Form.Group>
                                <Button className='neon-border mt-4 mb-2' variant="outline-success" style={{ borderRadius: "20px" }} onClick={updateDetails}>
                                    Save
                                </Button>
                                <br/>
                                <Button className='neon-border-red mt-4 mb-2' variant="outline-danger" style={{ borderRadius: "20px" }} onClick={goBack}>
                                    Go Back
                                </Button>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>


    )
}

export default EditProfile
