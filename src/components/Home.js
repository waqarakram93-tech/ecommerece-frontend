import { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { EcommerceContext } from '../context/EcommerceContext'
import Footer from './Footer'


function Home() {
    const { error, products } = useContext(EcommerceContext)
    return (
        <Row className='mt-5'>
            {products.map(p => (
                <Col md={4} className='mb-4' key={p.id}>
                    <Card >
                        <Carousel>
                            {
                                p.images.map(img => (<Carousel.Item interval={1000} key={img.id}>
                                    <Card.Img variant="top" src={img.url} />
                                </Carousel.Item>))
                            }
                        </Carousel>
                        <Card.Body>
                            <Card.Title className='title'>{p.name}</Card.Title>
                            <Card.Text>
                                {`${p.description.substring(0, 1000)}`}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className='stock'>Only {p.stock} LEFT </Card.Footer>
                        <Card.Footer className='price'>Price: {p.price} EUR </Card.Footer>
                        <Button variant="primary" >Add to Cart</Button>
                    </Card>
                </Col>
            ))}
            {/* <Footer /> */}
        </Row>

    )

}


export default Home
// import { useContext } from 'react';
// import React from "react";
// import {
//     MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage,
//     MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn
// } from "mdbreact";
// import { EcommerceContext } from '../context/EcommerceContext'

// function Home()  {
//     const { error, products } = useContext(EcommerceContext)
//     return (
//         <MDBContainer>
//             <MDBCarousel activeItem={1} length={3} slide={true} showControls={true} showIndicators={true} multiItem>
//                 <MDBCarouselInner>
//                     <MDBRow>
//                         {products.map(p => (
//                             <MDBCarouselItem key={p.id}>
//                                 <MDBCol md="4">
//                                     <MDBCard className="mb-2">
//                                         <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg" />
//                                         <MDBCardBody>
//                                             <MDBCardTitle>{p.name}</MDBCardTitle>
//                                             <MDBCardText>
//                                                 Some quick example text to build on the card title and
//                                                 make up the bulk of the card's content.
//                                             </MDBCardText>
//                                             <MDBBtn color="primary">MDBBtn</MDBBtn>
//                                         </MDBCardBody>
//                                     </MDBCard>
//                                 </MDBCol>

//                             </MDBCarouselItem>
//                         ))}
//                     </MDBRow>
//                 </MDBCarouselInner>
//             </MDBCarousel>
//         </MDBContainer>
//     );
// }
// export default Home

