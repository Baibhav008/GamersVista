import React, { useState ,useEffect} from 'react'
import { ChatState } from '../Context/ChatProvider'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/esm/Button';
import { useHistory } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import EditProfile from '../EditProfile';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios'

const ProfileCard = () => {
  const { user } = ChatState();

  const history = useHistory();


  const [formDataName, setFormDataName] = useState();
  const [formDataAbout, setFormDataAbout] = useState();
  const [formDataPassword, setFormDataPassword] = useState();
  const [formDataPic, setFormDataPic] = useState();
  const [formDataSteam, setFormDataSteam] = useState();
  const [formDataEpic, setFormDataEpic] = useState();

  const getDetails = async () => {
    const response = await axios.post(process.env.REACT_APP_GV_API+"/api/user/getCurrent", {
      email: user.email,
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


  const goEdit = () => {
    localStorage.setItem("editEmail", user.email);
    history.push('/editProf');
  };

  const goCreate = () => {
    history.push('/createPost')
  }

  const goMyPost=()=>{
    localStorage.setItem("myID", user._id); 
    history.push('myPost');
  }







  return (
    <>


      <div className='flex  p-2 mt-3 mb-4 mx-2 neon-border-black' style={{ color: "white", backgroundColor: "rgba(0,25,255,0.2)", marginTop: "10px", borderRadius: "20px", paddingBottom: "4px" }}>

        <Row>
          <Col className='my-auto d-flex justify-content-center' style={{ textAlign: "center" }} lg={4} sm={2}>
            <img style={{ maxWidth: '150px', height: 'auto', borderRadius: "100px" }} src={user.pic} alt='pic' />
          </Col>

          <Col className='my-auto ' style={{ marginLeft: "4px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "20px", marginRight: "16px" }}>
            <div className='pt-4'>
              <p className='ms-4'><b>NAME :</b>  {formDataName} </p>
              <p className='ms-4'><b>EMAIL :</b> {user.email} </p>
              <p style={{ textAlign: 'center' }}><b>ABOUT</b>  <br />{formDataAbout}</p>
            </div>
            <div className='flex mx-auto mt-2 mb-4 ' style={{ textAlign: 'center' }}>
              <Button variant="outline-light ml-2">Alias</Button>
              <Button variant="outline-light ml-2" onClick={goEdit}>Edit Profile</Button>
              
              <Button variant="outline-light ml-2" href={user.steam} target='new'>Steam</Button>
            
              <Button variant="outline-light ml-2">Epic Games</Button>
              <Button variant="outline-light ml-2 mt-2" onClick={goCreate}>Create Post</Button>
              <Button variant="outline-light ml-2" onClick={goMyPost}>My Posts</Button>

            </div>

          </Col>


        </Row>




      </div>
    </>



  )
}

export default ProfileCard
