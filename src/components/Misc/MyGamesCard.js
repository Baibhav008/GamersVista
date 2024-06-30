import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import ScrollableDiv from './ScrollableDiv';
import '../Effects/gcard.css'
import { ChatState } from '../Context/ChatProvider';
import axios from 'axios'
import { useToast } from '@chakra-ui/react';
import { IoMdRefreshCircle } from "react-icons/io";

const MyGamesCard = () => {

  const { user } = ChatState();
  const [showPopup, setShowPopup] = useState(false);
  const toast = useToast();
  const [gameImage, setPic] = useState();
  const [userID, setUserID] = useState();
  const [gameTitle, setGameTitle] = useState();
  const [GameCards, setGameCards] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setUserID(user._id);

    try {
      axios.post(process.env.REACT_APP_GV_API+"/api/collection/", { id: user._id })
      .then((res) => {
        console.log("Collections for user ID:", user._id);
        console.log(res.data.collections);
        console.log(res)
        const filteredCollections = res.data.collections.filter(
          collection => collection.userID === user._id);
        console.log("Filtered collections:", filteredCollections);


        setGameCards(filteredCollections);
        console.log("got mygames") 
        console.log(GameCards)
      }).catch((e)=>console.log(e))
      
    } catch (error) {
      console.log(error);
      
    }

    
  }, []);

  const refreshGames = async()=>{

    try {
      axios.post(process.env.REACT_APP_GV_API+"/api/collection/", { id: user._id })
      .then((res) => {
        console.log("Collections for user ID:", user._id);
        console.log(res.data.collections);
        console.log(res)



        const filteredCollections = res.data.collections.filter(
          collection => collection.userID === user._id);
        console.log("Filtered collections:", filteredCollections);


        setGameCards(filteredCollections);
        console.log("got mygames")
        console.log(GameCards)
      }).catch((e)=>console.log(e));
      
    } catch (error) {
      console.log(error);
      
    }
    

  }

  const deleteGame = async (gid) => {

    console.log("Game id of game to be deleted : " + gid);
    await axios.post(process.env.REACT_APP_GV_API+"/api/collection/deleteGame", { id: gid }).then((res) => {
        console.log(res.body);
        refreshGames();
      });

  }

  const postDetails = (pics) => {

    if (pics == undefined) {
      toast({ title: "please select an image", duration: 5000, position: "bottom" });
      return;

    }
    if (pics.type === "image/png" || pics.type === "image/jpeg") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "gamer-vista");
      data.append("cloud_name", "wildwolf");
      fetch("https://api.cloudinary.com/v1_1/wildwolf/image/upload", {
        method: 'post', body: data
      }).then((res) => res.json()).then(data => {
        setPic(data.url.toString());
        console.log(data.url.toString());

      }).catch((err) => {
        console.log(err);

      })
    } else {
      toast({ title: "please select an image", duration: 5000, position: "bottom" });

    }

  };

  const upload = async () => {

    

    if (!gameImage || !userID || !gameTitle) {
      toast({
        title: "Please Select all details",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      console.log(gameImage, userID, gameTitle);

      return;
    }

    console.log(gameImage, userID, gameTitle);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(process.env.REACT_APP_GV_API+
        "/api/collection/add-collection",
        {
          userID, gameTitle, gameImage
        },
        config
      );
      console.log(data);
      setShowPopup(false);
     // window.location.reload();
      toast({
        title: "Successfully added",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      refreshGames();


    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };



  return (
    <div className="card-container flex  p-2 mt-3 mb-4 mx-2 neon-border-black" style={{ color: "white", backgroundColor: "rgba(0,25,255,0.2)", marginTop: "10px", borderRadius: "20px", paddingBottom: "4px" }}>
      <Row className=' mx-auto'>
        <Col xs={10} className=' text-center'>
          <p style={{ fontSize: "20px" }}>My Games Collection</p>
        </Col>
        <Col onClick={refreshGames} xs={2} className='d-flex justify-content-left align-items-center mb-3'>
          <IoMdRefreshCircle size={"24px"} />
          Refresh
        </Col>
      </Row>



      <div className="cards-scroll p-1">
        {GameCards.map((card, index) => (
          <div key={index} className="card">

            <div> <img src={card.gameImage} alt={`Card ${index}`} />
              <p style={{ color: "black", textAlign: "center", fontSize: "20px" }}>{card.gameTitle}</p></div>
            <button onClick={() => deleteGame(card._id)} className='bg-danger mx-auto px-2 mb-4  ' style={{ borderRadius: "20px" }}>Remove</button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          <input style={{ backgroundColor: "rgba(0,0,0,0.8)", color: "white", padding: "2px" }} type="file" accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
          <input
            type="text"
            placeholder="Enter text"

            onChange={(e) => setGameTitle(e.target.value)}
            style={{ marginLeft: "4px", backgroundColor: "rgba(0,0,0,0.8)", color: "white", padding: "4px" }}
          />
          {gameImage && <button className='neon-border-blue ' style={{ marginLeft: "14px", borderRadius: "10px", padding: "2px" }} onClick={upload}>Add to Collection</button>}
        </div>
      )}
      <div style={{ textAlign: "center" }}>
        <button className='neon-border-blue p-2 mt-2' style={{ borderRadius: "8px" }} onClick={() => setShowPopup(true)}>Add Games</button>

      </div>


    </div>
  )
}

export default MyGamesCard
