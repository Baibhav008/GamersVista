import { Parallax } from 'react-parallax';
import Satellite from '../img/satellite.jpeg'
const ImageTwo = () => (
    <Parallax className='image' blur={0} bgImage={Satellite} strength={800} bgImageStyle={{minHeight:"100vh"}}>
        <div className='content'>
            <span className="img-txt">Gamer's Vista</span>
        </div>
    </Parallax>
);

export default ImageTwo