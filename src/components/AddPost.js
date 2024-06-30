import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import NavBar from './NavBar'
import gvid from "../img/gvid.mp4"
import { ChatState } from './Context/ChatProvider';
import { useToast } from '@chakra-ui/react';
import axios from 'axios'

const AddPost = () => {
    const [loading,setLoading] = useState(false);
    const {user} = ChatState();
    const [postCaption, setCaption] = useState('');
    const [postImg,setPic] = useState();
    const [file, setFile] = useState(null);
    const toast = useToast();
   // const[userID,setUserID] = useState();

    const [thumbnail, setThumbnail] = useState(null);
    
 
    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handleFileChange = (e) => {
        setLoading(true);
        console.log(user._id)
        console.log(user)
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Generate a thumbnail for the selected file (or use a default image)
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const maxWidth = 800;
                const maxHeight = 1000;
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                setThumbnail(canvas.toDataURL('image/jpeg'));
            };
        };
        reader.readAsDataURL(selectedFile);

        if(selectedFile==undefined)
        {
          toast({title:"please select an image", duration:5000, position:"bottom"});
          return;
  
        }
        if(selectedFile.type==="image/png" || selectedFile.type==="image/jpeg"||selectedFile.type==="image/jpg")
        {
          const data = new FormData();
          data.append("file",selectedFile);
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
          
        }
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        var userName = user.name;
        var userImg = user.pic;
        var userID = user._id;
        var postID = userID+Date.now();
        var likeCount =[];
        var postTime = Date.now();
        // Handle form submission (e.g., upload file, send caption to server, etc.)
        console.log('Caption:', postCaption);
        console.log('image URL',postImg);
        console.log('File:', file);
        if(!postCaption||!postImg)
        {
            toast({
                title: "Please Select Image and Caption",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
        }
        else
        {
            try 
    {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/posts/addPost",
        {
          userName,userImg,userID,postID,postImg,postCaption,likeCount,postTime
        },
        config
      );
      console.log(data);
     
      
      toast({
        title: "Successfully added",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      
      
      
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
        }
        
    };


    // A default random image for initial display
    const defaultImage = 'https://via.placeholder.com/150';

    const [matches, setMatches] = useState(window.matchMedia("(min-width:768px)").matches)
    useEffect(() => {
        window.matchMedia("(min-width:768px)").addEventListener('change', e => setMatches(e.matches))
    }, []);



    return (
        < div style={{ width: "100%", height: "100%", fontFamily: "Share Tech Mono", }}>
            <video src={gvid} autoPlay loop muted style={{ position: "fixed", width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: 'absolute', width: "100%", top: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <NavBar />
                {matches&&
                <Container className="text-center neon-border-black " style={{ width: "40%",background:"black",borderRadius:"40px" }}>
                    
                <Row>
                    <Col>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formFile" >
                                <Form.Label style={{color:"white",marginTop:"4px",fontSize:"24px"}}>Select Photo</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{background:"rgba(255,255,255,1)",borderRadius:"40px"}}
                                />
                                <div className="d-flex justify-content-center " >
                                    {thumbnail ? (
                                        <img
                                            src={thumbnail}
                                            alt="Thumbnail"
                                            style={{ height: '500px' ,borderRadius:"20px"}}
                                        />
                                    ) : (
                                        /*<img
                                            src={defaultImage}
                                            alt="Default Thumbnail"
                                            style={{ height: '500px',borderRadius:"20px" }}
                                        />*/
                                        <div style={{background:"rgba(255,255,255,0.4)" ,width:"100%",height:"500px",borderRadius:"20px"}}></div>

                                    )}
                                </div>
                            </Form.Group>
                            <Form.Group controlId="formCaption">

                                <textarea
                                
                                    type="text"
                                    placeholder="Enter caption"
                                    value={postCaption}
                                    onChange={handleCaptionChange}
                                    style={{ width: "100%",padding:"4px",borderRadius:"20px" }}
                                />
                            </Form.Group>
                            <button type="submit" className='neon-border mt-1 mb-1' style={{ background: "#0fa", borderRadius: "20px", padding: "8px", color: "green" }}>
                                Post
                            </button>
                        </Form>
                    </Col>
                </Row>
            </Container>
                }
                {!matches&&
                <Container className="text-center" style={{ width: "90%" }}>
                    
                <Row>
                    <Col>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formFile">
                                <Form.Label>Add Photo/Video</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <div className="d-flex justify-content-center mt-2">
                                    {thumbnail ? (
                                        <img
                                            src={thumbnail}
                                            alt="Thumbnail"
                                            style={{ height: '500px' }}
                                        />
                                    ) : (
                                        <img
                                            src={defaultImage}
                                            alt="Default Thumbnail"
                                            style={{ height: '500px' }}
                                        />
                                    )}
                                </div>
                            </Form.Group>
                            <Form.Group controlId="formCaption">

                                <textarea
                                    type="text"
                                    placeholder="Enter caption"
                                    value={postCaption}
                                    onChange={handleCaptionChange}
                                    style={{ width: "100%" }}
                                />
                            </Form.Group>
                            {!loading&&<button  type="submit" className='neon-border mt-1 mb-1' style={{ background: "#0fa", borderRadius: "20px", padding: "8px", color: "green" }}>
                                Post
                            </button>}
                        </Form>
                    </Col>
                </Row>
            </Container>
                }
                
            </div>
        </div>
    )
}

export default AddPost
