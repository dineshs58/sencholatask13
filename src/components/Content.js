import React from 'react'
import { useState, useEffect } from 'react';
import { Card, ListGroup, Col } from 'react-bootstrap';

import '../style/content.css'
const images = ["images/member1.jpg",
    "images/member5.jpg",
    "images/member2.jpg",
    "images/member3.jpg",
    "images/member4.jpg",
    "images/member5.jpg",
    "images/member6.jpg",
    "images/member1.jpg",
    "images/member2.jpg",
    "images/member3.jpg",
]
const Content = () => {
    const [user, setUser] = useState([]);


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(item => item.json())
            // .then(item => console.log(item))
            .then(item => setUser(item))
    })

    return (
        <div className="container-fluid">
            <h1 className='header mt-3'>User details</h1>
            <div className="row mt-5">

                {user.map(details => (

                    <Col lg={4} md={6} xs={12} key={details.id} className='mt-5 column'>
                        <Card >

                            <Card.Img variant="top" src={images[details.id - 1]} />
                            <Card.Body>
                                <Card.Text>
                                    <div className="content">
                                        <p><span>Name :</span>{details.name}</p>
                                        <p><span>Username :</span>{details.username}</p>
                                        <p><span>Email :</span>{details.email}</p>
                                        <p><span>Address :</span>
                                            <pre>
                                                {details.address.street},<br />
                                                {details.address.suite}, <br />
                                                {details.address.city},<br />
                                                {details.address.zipcode}<br />
                                            </pre>
                                        </p>


                                    </div>
                                </Card.Text>
                            </Card.Body>

                        </Card>
                    </Col>
                ))

                }
            </div>
        </div>
    )
}

export default Content 