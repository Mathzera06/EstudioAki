import React from 'react'
import { Bookmark, MapPin, Volume, Volume1, Volume2 } from 'react-feather'

const About = () => {

    const cards = [
        {
            icon: <Volume2 size={58} className='py-2' />,
            title: 'Variedade de Estúdios',
            content: 'Vários estúdios cadastrados para escolher.'
        },
        {
            icon: <MapPin size={58} className='py-2' />,
            title: 'Busca com Base na Localização',
            content: 'Descubra estúdios nas proximidades instantaneamente'
        },
        {
            icon: <Bookmark size={58} className='py-2' />,
            title: 'Processo de Reserva Simplificado',
            content: 'Agende seu estúdio ideal com facilidade.'
        },
    ]

    return (
        <section id="scroll">
            <div class="container py-5">
                <h2 className='mb-5 text-center text-primary'>Aqui você encontra o estúdio ideal</h2>
                <div className='d-flex justify-content-around flex-wrap'>
                    {cards.map(card => (
                        <div className="card m-2" style={{ width: '18rem' }}>
                            <div className="card-header bg-primary">
                                <div className='text-center'>
                                    {card.icon}
                                </div>
                            </div>
                            <div class="card-body">
                                <h6 class="card-subtitle mb-2 text-body-secondary text-center">
                                    {card.title}
                                </h6>
                                <p class="card-text text-center">
                                    {card.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default About