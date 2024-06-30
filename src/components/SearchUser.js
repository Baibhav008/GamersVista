import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import gvid from "../img/gvid.mp4"
import { Col, Container, Row } from 'react-bootstrap'
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { ChatState } from './Context/ChatProvider';

const SearchUser = () => {



    const { user } = ChatState();
    const [searchItems, setsearchItems] = useState([]);

    console.log(user)


    const searchUser = async () => {

        const inputElement = document.getElementById('stext');


        const inputValue = inputElement.value;
        console.log(inputValue);
        await axios.post(process.env.REACT_APP_GV_API+"/api/user/search", { key: inputValue }).then((res) => {
            console.log(res);
            console.log(res.data);
            if (res.data == null) {
                setsearchItems(res);
            }
            setsearchItems(res.data);
        })
    }

    return (
        <div style={{ width: "100%", height: "100%", fontFamily: "Share Tech Mono", }}>
            <video src={gvid} autoPlay loop muted style={{ position: "fixed", width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: 'absolute', width: "100%", top: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <NavBar />
                <Container className=' mt-5 mx-auto  '>
                    <Row>
                        <Col sm="1"></Col>
                        <Col sm="8">
                            <input id="stext" className='px-4 py-2 container-fluid' style={{ fontSize: "20px", color: "black", borderRadius: "40px" }} type='text' placeholder='Hello' />
                        </Col>
                        <Col sm="2">
                            <button onClick={searchUser} type="button" class="btn btn-info " style={{ fontSize: "14px", borderRadius: "40px" }}><FaSearch size="24px" /></button>
                        </Col>
                    </Row>
                    <div className="mt-4">
  <div className="row">
    {searchItems.map((card, index) => (
      <div key={index} className="col-md-4 mb-4">
        <div className="neon-border-black card " style={{  backgroundColor: "rgba(0,25,255,0.2)",width: "18rem", textAlign: "center", alignItems: "center",borderRadius:"20px", }}>
         
          <div className="card-body">
          <img className="rounded-circle" src={card.pic} alt="User Avatar" style={{ width: "150px", height: "150px", backgroundColor: "transparent" }} />
            <h5 className="card-title"></h5>
            <p className="card-text" style={{ fontSize: "24px", color: "white" }}><b>{card.name}</b></p>
          </div>
          <ul className="list-group list-group-flush" style={{ fontSize: "18px", borderRadius: "20px" }}>
            <li className="list-group-item" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", color: "black" }}>{card.about}</li>
            <li className="list-group-item" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", color: "black" }}>0 Alias</li>
            <li className="list-group-item" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", color: "black" }}>View Profile</li>
          </ul>
          <div className="card-body" style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}>
            <a href={card.steamAccount} className="card-link">Steam</a>
            <a href={card.epicGamesAccount} className="card-link">EpicGames</a>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


                </Container>



            </div>





        </div>
    )
}

export default SearchUser
