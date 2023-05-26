import React from 'react';
import Image1 from '../../../assets/images/studio1.png';
import Image2 from '../../../assets/images/studio4.png';
// Importe outras imagens, se necessário

const Gallery = () => {
    const divStyle = {
        backgroundColor: '#f2f2f2',
        transform: 'skewY(-2deg)',
        marginBottom: '30px',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    };

    const imageStyle = {
        width: '300px',
        height: '300px',
        objectFit: 'cover',
        borderRadius: '50%',
        marginBottom: '20px',
    };

    return (
        <div className="container px-5" >
            <div className="row gx-5 align-items-center">
                <div className="col-lg-6 order-lg-2">
                    <div className="p-5">
                        <img src={Image1} style={imageStyle}  />
                    </div>
                </div>
                <div className="col-lg-6 order-lg-1">
                    <div className="p-5">
                        <h2 className="display-4">Teste</h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio dignissimos sapiente aut placeat eos suscipit ad distinctio nostrum, cupiditate, voluptatem in. Quia, officia fuga! Quasi soluta expedita quos iusto in?</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
