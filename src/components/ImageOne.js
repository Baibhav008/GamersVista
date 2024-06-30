import { Parallax } from 'react-parallax';
import bg2 from '../img/bg2.jpg'
import Plx from "react-plx"
import React, { useEffect, useState } from 'react'

function ImageOne() {

  const [scrollPosition, setScrollPosition] = useState(0);

  // Update scroll position when user scrolls
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isMobile = window.screen.width<600

  return (
    <Parallax  className='image' blur={0} bgImage={bg2} strength={800} bgImageStyle={{minHeight:"100vh"}}>
    <div className='content'>
        <span className="img-txt " style={{fontSize:"80px",fontWeight:480}}>Gamer's Vista</span>
    </div>
    <Plx
    parallaxData={[
      {
        start: 0,
        end: 700,
        easing: "ease-in",
        properties: [
          {
            startValue: 1,
            endValue: 4,
            property: "scale"
          }
        ]
      }
    ]}
    style={{
      position: "fixed",
      left: 0,
      top: 0,
      width: "100%",                   
      zIndex: 100
    }}
  >
    {!isMobile && <img bgImageStyle={{minHeight:"100vh"}} style={{ width: "100%",display: scrollPosition >= 200 ? 'none' : 'block' }} src="bg.png" alt="foreground" />}
     </Plx>
</Parallax>
  )
}

export default ImageOne
