import React from 'react';
import Image1 from '../../../assets/images/studio1.jpg';
import Image2 from '../../../assets/images/studio2.jpg';
import Image3 from '../../../assets/images/studio3.jpg';
import Image4 from '../../../assets/images/studio4.jpg';
import Image5 from '../../../assets/images/studio5.jpg';
import Image6 from '../../../assets/images/studio6.jpg';
import Image7 from '../../../assets/images/studio7.jpg';
import Image8 from '../../../assets/images/studio8.jpg';
import Image9 from '../../../assets/images/studio9.jpg';
import Image10 from '../../../assets/images/studio10.jpg';
import Image11 from '../../../assets/images/studio11.jpg';
import Image12 from '../../../assets/images/studio12.jpg';
import Image13 from '../../../assets/images/studio13.jpg';
import Image14 from '../../../assets/images/studio14.jpg';
import Image15 from '../../../assets/images/studio15.jpg';
import Slider from 'react-slick';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// Importe outras imagens, se necessário

const Gallery = () => {
    const cardStyle = {
        backgroundColor: "#0E243B",
        // transform: 'skewY(-2deg)',
        marginBottom: '30px',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: '10px',
        // marginBottom: '20px',
    };



    return (
        <div>
        <div className="container px-5" >
            <div className="row gx-5 align-items-center">
                <div className="col-lg-6 order-lg-2">
                    <div className="p-5">
                        <img src={Image1} style={imageStyle} />
                    </div>
                </div>
                <div className="col-lg-6 order-lg-1">
                    <div className="p-5">
                    <h2 className='mb-4  text-primary'>Unindo artistas e estúdios em um só lugar.</h2>
                        <p>Experimente o EstudioAki hoje mesmo e desfrute de uma experiência simplificada na reserva de estúdios de gravação/ensaio. Aproveite a facilidade de encontrar o estúdio ideal com seus equipamentos desejados e datas convenientes . Junte-se à nossa comunidade de músicos e estúdios e simplifique sua jornada musical. </p>
                        <p>
                            <strong style={{ fontWeight: 'bold', color: "#0E243B" }}>
                                EstudioAki, conectando artistas e estúdios de maneira eficiente e conveniente.
                            </strong>
                        </p>
                    </div>
                </div>
            </div>

            <Carousel autoPlay={true} interval={3000} enableAutoPlay={true} infinite={true}>
                <div style={cardStyle}>
                    
                    <img src={Image1} style={imageStyle} alt="Imagem do card" />
                    
                </div>
                <div style={cardStyle}>
                    
                    <img src={Image2} style={imageStyle} alt="Imagem do card" />
                    
                </div>
                <div style={cardStyle}>
                    
                    <img src={Image3} style={imageStyle} alt="Imagem do card" />
                    
                </div>
                <div style={cardStyle}>
                    
                    <img src={Image4} style={imageStyle} alt="Imagem do card" />
                    
                </div>              
                <div style={cardStyle}>
                    
                    <img src={Image5} style={imageStyle} alt="Imagem do card" />
                    
                </div>
                <div style={cardStyle}>
                    
                    <img src={Image6} style={imageStyle} alt="Imagem do card" />
                    
                </div> 
                <div style={cardStyle}>
                    
                    <img src={Image7} style={imageStyle} alt="Imagem do card" />
                    
                </div>
                <div style={cardStyle}>
                    
                    <img src={Image8} style={imageStyle} alt="Imagem do card" />
                    
                </div>
                <div style={cardStyle}>
                    
                    <img src={Image9} style={imageStyle} alt="Imagem do card" />
                    
                </div>
                <div style={cardStyle}>
                    
                    <img src={Image10} style={imageStyle} alt="Imagem do card" />
                    
                </div>
                <div style={cardStyle}>
                    
                    <img src={Image11} style={imageStyle} alt="Imagem do card" />
                    
                </div>
                <div style={cardStyle}>
                    
                    <img src={Image12} style={imageStyle} alt="Imagem do card" />
                    
                </div>
                <div style={cardStyle}>
                    
                    <img src={Image13} style={imageStyle} alt="Imagem do card" />
                    
                </div>
                <div style={cardStyle}>
                    
                    <img src={Image14} style={imageStyle} alt="Imagem do card" />
                    
                </div>

                    

                {/* Adicione mais slides, se necessário */}
            </Carousel>
        </div>
        </div>
    );
};

export default Gallery;
