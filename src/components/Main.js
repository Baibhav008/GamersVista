import React, { useEffect, useState } from 'react'
import axios from 'axios';


import logos from "../img/logos.jpeg"
import CarouselItem from 'react-bootstrap/esm/CarouselItem';
import CarouselCaption from 'react-bootstrap/esm/CarouselCaption';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import gameOne from "../img/gameOne.jpeg"
import gameTwo from "../img/gameTwo.jpg"
import bg2 from '../img/bg2.jpg'
import gvid from "../img/gvid.mp4"
import { ChatState } from './Context/ChatProvider';
import NavBar from '../components/NavBar'
import ProfileModal from './Misc/ProfileModal';
import ProfileCard from './Misc/ProfileCard';
import ScrollableDiv from './Misc/ScrollableDiv';
import { ArrowRight,Globe } from 'react-bootstrap-icons'
import '../components/Effects/neonBorder.css'
import MyGamesCard from './Misc/MyGamesCard';

import gameNews from '../img/gameNews.jpg'




const Main = () => {

    const [gameInfo, setGameInfo] = useState([]);
    var arr = [];
    const [GameCards, setGameCards] = useState([]);

    const [upComing, setUpcoming] = useState([]);

    // API CALL TO GET RECENT RELEASES https://api.rawg.io/api/games?key=8da6b98162ce4e409de0016d2765f791&dates=2023-01-01,2024-04-15&ordering=-released
    useEffect(() => {
        axios.get(" https://api.rawg.io/api/games?key=8da6b98162ce4e409de0016d276")
            .then((res) => {

                setGameInfo(res.data.results)
                console.log("got games")
                console.log(gameInfo)

                for (let i = 0; i < res.data.results.length; i++) {
                    console.log(res.data.results[i].name);

                }
            }).catch((e)=>console.log(e));
    }, []);


    const { user } = ChatState();
    console.log(user)

    const [isHovered, setIsHovered] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    //CODE TO ADD AXIS EFFECT
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = e.target.getBoundingClientRect();

        // Calculate tilt angles
        const tiltX = (clientX - left - width / 2) / (width / 2);
        const tiltY = (clientY - top - height / 2) / (height / 2);

        setTilt({ x: tiltX, y: tiltY });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setIsHovered(false);
    };

    //HOVER EFFECT STYLING
    const divStyle =
    {
        borderRadius: "20px",
        backgroundColor: isHovered ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.5)',
        transition: 'background-color 0.3s ease',
        transform: `rotateX(${tilt.y * 10}deg) rotateY(${tilt.x * 10}deg)`,

    };

    return (
        < div style={{ width: "100%", height: "100%", fontFamily: "Share Tech Mono", }}><video src={gvid} autoPlay loop muted style={{ position: "fixed", width: "100%", height: "100%", objectFit: "cover" }} /><div style={{ position: 'absolute', width: "100%", top: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

            {/* This is NavBar-----------------------------------------------------------------------------------------------------------------*/}
            <NavBar />
            {/* This is NavBar-----------------------------------------------------------------------------------------------------------------*/}

            <div style={{ fontFamily: "monospace" }}>

                <Row>
                    {/* This is News-----------------------------------------------------------------------------------------------------------------*/}
                    <Col className='neon-border-black' sm={12} lg={3} style={{ color: "white", backgroundColor: "rgba(0,25,255,0.2)", marginTop: "10px", borderRadius: "20px", paddingBottom: "4px" }}>
                        <div className='flex mx-auto mt-2' style={{ textAlign: "center", fontSize: "20px" }}>Latest Updates</div>
                        <ScrollableDiv height="50vh" >

                            <div className="max-w-md mx-auto mb-4"
                                style={divStyle}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={handleMouseLeave}
                                onMouseMove={handleMouseMove}

                            >
                                <div className="p-4  rounded-lg shadow-md">
                                    <img src='https://res.cloudinary.com/wildwolf/image/upload/v1708967171/oo75g7kdj0ivrsylw4fs' />
                                    <h2 className="text-lg font-semibold " style={{ textAlign: "center" }}>GTA 6</h2>
                                    <p className="text-sm text-gray-500 mt-2">GTA 6 will launch sometime in 2025 on Xbox Series X|S and PS5. This was revealed in the game's first trailer. Aside from a year, we don't have any other specifics on when the game will come out. We'll have to wait for more info. In terms of a GTA 6 PC release, an ex-Rockstar dev has explained why GTA 6 won't come to PC at launch: 'This stuff is very complicated'</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        <Row>
                                            <Col className='pt-1' sm="1" ><Globe/></Col>
                                            <Col ><a href='https://www.techradar.com/gaming/gta-6' target='blank'>
                                            Goto Site
                                        </a></Col>
                                        </Row>
                                        
                                        
                                    </p>
                                </div>
                            </div>


                            <div className="max-w-md mx-auto mb-4"
                                style={divStyle}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={handleMouseLeave}
                                onMouseMove={handleMouseMove}

                            >
                               <div className="p-4  rounded-lg shadow-md">
                                    <img src={gameNews} />
                                    <h2 className="text-lg font-semibold " style={{ textAlign: "center" }}>Final Fantasy 7</h2>
                                    <p className="text-sm text-gray-500 mt-2">Final Fantasy 7 Rebirth hides a 27-year-old reference to the original JRPG that's so niche even today's devs don't fully understand it</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        <Row>
                                            <Col className='pt-1' sm="1" ><Globe/></Col>
                                            <Col ><a href='https://www.gamesradar.com/final-fantasy-7-rebirth-hides-a-27-year-old-reference-to-the-original-jrpg-thats-so-niche-even-todays-devs-dont-fully-understand-it/' target='blank'>
                                            Goto Site
                                        </a></Col>
                                        </Row>
                                        
                                        
                                    </p>
                                </div>
                            </div>

                          

                        </ScrollableDiv>
                    </Col>
                    {/* This is News-----------------------------------------------------------------------------------------------------------------*/}

                    {/* This is Carousel-----------------------------------------------------------------------------------------------------------------*/}
                    <Col sm={12} lg={6}>
                        <Container className='mt-4' fluid style={{ maxHeight: "50vh", }}>
                            <Carousel fade>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://res.cloudinary.com/wildwolf/image/upload/v1708967171/llt3vk0awul0hqfyemmp"
                                        alt="First slide"
                                        style={{ maxHeight: "50vh", borderRadius: "50px" }}
                                    />
                                    <Carousel.Caption>
                                        <h3>God of War Ragnarok </h3>

                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={gameOne}
                                        alt="First slide"
                                        style={{ maxHeight: "50vh", borderRadius: "50px" }}
                                    />
                                    <Carousel.Caption>
                                        <h3>What's next for Call Of Duty Franchise </h3>

                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={gameTwo}
                                        alt="First slide" style={{ maxHeight: "50vh", borderRadius: "50px" }}
                                    />

                                    <Carousel.Caption>

                                        <p>  EXCLUSIVE – EA’S NEXT BATTLEFIELD GAME WILL ALSO HAVE A FREE-TO-PLAY BATTLE ROYALE</p>
                                    </Carousel.Caption>
                                </Carousel.Item>

                            </Carousel>


                        </Container>

                    </Col>
                    {/* This is Carousel-----------------------------------------------------------------------------------------------------------------*/}

                    {/* This is Recent-----------------------------------------------------------------------------------------------------------------*/}
                    <Col className='neon-border-black' sm={12} lg={3} style={{ color: "white", backgroundColor: "rgba(0,25,255,0.2)", marginTop: "10px", borderRadius: "20px", paddingBottom: "4px" }}>
                        <div className='flex mx-auto mt-2' style={{ textAlign: "center", fontSize: "20px" }}>Recent Releases</div>
                        <ScrollableDiv height="50vh" >

                            <div className="max-w-md mx-auto mb-4 " style={{ background: "rgba(0,0,0,0.5)", borderRadius: "20px" }}>
                                <Row>
                                    <Col sm={12} lg={5}>
                                        <img style={{ borderRadius: "20px", width: "100%", height: "100%" }} src='https://res.cloudinary.com/wildwolf/image/upload/v1708967171/oo75g7kdj0ivrsylw4fs' />
                                    </Col>
                                    <Col sm={12} lg={7} className='p-2'>
                                        GTA 6 to be launched before you die !!
                                    </Col>
                                </Row>

                            </div>
                            <div>
                                {gameInfo.map((game, index) => (
                                    <div key={index} className="box">
                                        <div className="max-w-md mx-auto mb-4" style={{ background: "rgba(0,0,0,0.5)", borderRadius: "20px" }}>
                                            <Row>
                                                <Col sm={12} lg={12}>
                                
                                                    <div className="p-4  rounded-lg shadow-md">
                                                        <img src={game.background_image} />
                                                        <h2 className="text-lg font-semibold " style={{ textAlign: "center" }}>{game.name}</h2>
                                                        <p className="text-sm text-gray-500 mt-2">Out on : {game.released}</p>
                                                        <div>
                                                        Platforms:
                                                        {game.platforms.map((platform, ind) => (
                                                            <span key={ind}>
                                                                {platform.platform.name}
                                                                {ind < game.platforms.length - 1 ? ', ' : ''}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    </div>
                                                </Col>
                                                
                                            </Row>

                                        </div>

                                    </div>
                                ))}
                            </div>










                        </ScrollableDiv>
                    </Col>
                    {/* This is Recent-----------------------------------------------------------------------------------------------------------------*/}
                </Row>

            </div>



            <div style={{ fontFamily: "monospace" }}>


                <Row>
                    <Col sm={12} lg={6} style={{ color: "white" }}>
                        <div >
                            {user && <ProfileCard />}
                        </div>
                    </Col>

                    <Col lg={6} sm={12} style={{ color: "white" }}>
                        <div>

                            {user && <MyGamesCard />}
                        </div>
                    </Col>
                </Row>
            </div>

        </div>





        </div>


    )
}


export default Main
