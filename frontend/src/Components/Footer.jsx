import React from 'react'
import { Row,Col,Container  } from 'react-bootstrap'

const Footer = () => {
    const currentyear=new Date().getFullYear();
  return (
    <footer>
        <Container>
            <Row>
                <Col>
                <p>ProShop &copy; {currentyear}</p>
                </Col>
            </Row>
        </Container>
    </footer>

)
}

export default Footer