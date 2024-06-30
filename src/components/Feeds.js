import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import gvid from "../img/gvid.mp4"
import { Button, Card, Col, Row } from 'react-bootstrap'
import bord from '../img/bord.jpeg'
import ScrollableDiv from './Misc/ScrollableDiv'
import ScrollTwo from './Misc/ScrollTwo'
import { MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios'
import { ChatState } from './Context/ChatProvider'

import ReactTimeAgo from 'react-time-ago';
import en from 'javascript-time-ago/locale/en';
import hi from 'javascript-time-ago/locale/hi';
import TimeAgo from 'javascript-time-ago';


const Feeds = () => {

    const { user } = ChatState();
    const [postItems, setpostItems] = useState([]);


    TimeAgo.addDefaultLocale(en);
    TimeAgo.addLocale(hi);

    useEffect(() => {


        axios.post("/api/posts/")
            .then((res) => {
                console.log(res)
    
                const sortedItems = res.data.collections.sort((a, b) => new Date(b.postTime) - new Date(a.postTime));
                setpostItems(sortedItems);
                console.log("fetch posts")
                console.log(postItems)
            });
    }, []);

    const likeHandler = async (postid, userid) => {
        try {
            const response = await axios.post("/api/posts/like", {
                postID: postid,
                userID: userid,
            });
    
            // Assuming your response contains the updated post data
            const updatedPost = response.data.updatedPost;
    
            // Find the post in your postItems array
            const updatedPostItems = postItems.map((post) => {
                if (post._id === updatedPost._id) {
                    return { ...post, likeCount: updatedPost.likeCount };
                }
                return post;
            });
    
            // Update the state or re-render your component with the updated postItems
            setpostItems(updatedPostItems);
    
            console.log("Like updated successfully:", response);
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };
    

    return (
        < div style={{ width: "100%", height: "100%", fontFamily: "Share Tech Mono", }}>
            <video src={gvid} autoPlay loop muted style={{ position: "fixed", width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: 'absolute', width: "100%", top: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <NavBar />
                <Row className="justify-content-center">
                    <Col sm="2" ></Col>
                    <Col sm="8" className=' text-center' style={{ paddingTop: "20px", paddingInline: "40px" }}>

                        <div >
                            {postItems.map((card, index) => (
                                 <Card key={index} style={{ marginBottom: "8px", width: "88%" }}>
                                 <Card.Header style={{ textAlign: "left", display: "inline-flex" }}>

                                     <img style={{ maxWidth: '40px', height: 'auto', borderRadius: "80px", marginRight: "8px" }} src={card.userImg} alt='pic' />
                                     <div className='my-auto mx-2' style={{ fontSize: "24px" }}>{card.userName}</div>
                                     
                                
                                 </Card.Header>
                                 
                                 <Card.Img style={{ height: "500px" }} variant="top" src={card.postImg} />

                                 <Card.Footer>
                                     <div style={{ alignItems: "left", textAlign: "left" }}>
                                         <h6 style={{fontSize:"20px"}}>{card.postCaption}</h6>
                                         <ReactTimeAgo date={card.postTime} locale="en-IN" />
                                         <div onClick={() => likeHandler(card._id, user._id)}>
                                             <MDBIcon className='me-2' fas icon="gamepad" size='2x' style={{ color: "FF5588" }} />
                                             <span style={{ fontSize: "24px" }}>{card.likeCount.length} Likes
                                             </span>
                                             
                                             
                                         </div>
                                     </div>

                                 </Card.Footer>

                             </Card>
                            ))}
                        </div>

                        <div>
                            <Card style={{ marginBottom: "8px", width: "88%" }}>
                                <Card.Header style={{ textAlign: "left", display: "inline-flex" }}>

                                    <img style={{ maxWidth: '40px', height: 'auto', borderRadius: "80px", marginRight: "8px" }} src={bord} alt='pic' />
                                    GamerVista2@
                                </Card.Header>
                                <Card.Img style={{ height: "500px" }} variant="top" src={bord} />

                                <Card.Footer>
                                    <div style={{ alignItems: "left", textAlign: "left" }}>
                                        <h6>Going to space and beyond #spacelife #deepdarkoceanofnothingness</h6>
                                        <div><MDBIcon fas icon="gamepad" size='2x' style={{ color: "FF5588" }} /> <span style={{ fontSize: "24px" }}>45 Likes</span></div>
                                    </div>

                                </Card.Footer>

                            </Card>
                        </div>
                    </Col>
                    <Col sm="2"></Col>
                </Row>






            </div>





        </div>

    )
}

export default Feeds
