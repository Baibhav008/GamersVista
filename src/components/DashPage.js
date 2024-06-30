

import { useHistory } from "react-router-dom";



import ImageOne from './ImageOne';
import ImageTwo from './ImageTwo';

import Onboarding from './Onboarding';
import { ChatState } from './Context/ChatProvider';



export default function DashPage() {


  const history = useHistory();

  const {user} = ChatState();

  
  return (
    /*
    <div>
         <Plx
        parallaxData={[
          {
            start: 0,
            end: 700,
            easing: "ease-in",
            properties: [
              {
                startValue: 1,
                endValue: 1.6,
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
        <img style={{ width: "100%" }} src="bg.png" alt="foreground" />
      </Plx>

      <Plx
        parallaxData={[
          {
            start: 0,
            end: 800,
            properties: [
              {
                startValue: 1,
                endValue: 1.18,
                property: "scale"
              }
            ]
          }
        ]}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%"
        }}
      >
        <img style={{ width: "100%" }} src="hero.jpeg" alt="background" />
      </Plx>

      <div
        style={{
          position: "fixed",
          lefft: 0,
          top: 0,
          zIndex: 200,
          paddingTop: "56%",
          height: "400vh",
          width: "100%"
        }}
      >
        <div
          style={{
            background: "#000",
            height: "100%"
          }}
        ></div>
      </div>
      
    </div>
    */
   <div style={{width:"100%",background:"black"}}>
     <ImageOne/> 
     <Onboarding/>
     <ImageTwo/>
       

   </div>
       
        

   
   
  
  )
}


