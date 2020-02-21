import React, { Component } from 'react';
import { Col, Container, Row, Fade } from 'reactstrap'
import Loader from 'react-loader-spinner'

class PageLoading extends Component {
    render() {
        return (
            <Fade>
                <Container fluid style={{backgroundColor: '#f5f5f5'}} className="d-block mt-5 text-center">
                    <Row>
                        <Col>
                            <Loader type="ThreeDots" color="#0274b3" height={80} width={80} />
                        </Col>
                    </Row>
                </Container>
            </Fade>
        );
    }
}

export default PageLoading;