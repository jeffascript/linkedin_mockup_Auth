import React, { Component } from 'react';
import GetAPI from '../APIs/GetAPI';
import { Label, Alert, Container, Col, Fade, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import PostAPI from '../APIs/PostAPI'
import PostImageAPI from '../APIs/PostImageAPI'
import Moment from "react-moment";
import Loading from './Loading';
import DeletePostAPI from '../APIs/DeletePostAPI'
import { connect } from "react-redux"



const mapStateToProps = state => state


class NewsFeed extends Component {
    state = {
        posts: [],
        numberPosts: 15,
        isLoading: true,
        createOpen: false,
        editOpen: false,
        personalProfile: undefined,
        createPostText: undefined,
        createPostImage: undefined,
        createPostError: false,
        editPostText: undefined,
        editPostId: undefined
    }

    render() {
        return (
            <>
                {this.state.isLoading
                    ?
                    <Loading />
                    :
                    <Fade >
                        <div className="feed-profile">
                            <img className="profile-pic mt-0 mb-2" src={this.state.personalProfile.imageUrl} alt="profile" />
                            <h4>{this.state.personalProfile.firstname + " " + this.state.personalProfile.surname}</h4>
                            {this.state.personalProfile.title ? <h6>{this.state.personalProfile.title}</h6>: null}
                        </div>
                        <Container style={{ maxWidth: '700px' }}>
                            <Row>
                                <Col className="mx-auto">
                                    <Row>
                                        <Col className="create-news-feed">
                                            <div onClick={() => this.setState({ createOpen: !this.state.createOpen })}>
                                                <i className="fas fa-edit"></i>
                                                <span style={{ color: 'black', padding: '10px', fontWeight: '600', fontSize: '20px' }}>Create a new</span>
                                            </div>
                                            <Modal toggle={() => this.setState({ createOpen: !this.state.createOpen })} isOpen={this.state.createOpen} >
                                                <ModalHeader toggle={() => this.setState({ createOpen: !this.state.createOpen })} style={{ backgroundColor: '#0073b1', color: 'white' }}>Create Post</ModalHeader>
                                                <ModalBody>
                                                    {this.state.personalProfile
                                                        ?
                                                        < img className='newsfeed-pic' src={this.state.personalProfile.imageUrl} alt='profile pic' />
                                                        :
                                                        <img className='newsfeed-pic' src='src="https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png"' alt='profile pic' />
                                                    }
                                                    {this.state.personalProfile &&
                                                        <>
                                                            <span style={{ color: 'black', padding: '10px', fontWeight: '600' }}>{this.state.personalProfile.firstname}{" "}{this.state.personalProfile.surname}</span>
                                                            {this.state.createPostError &&
                                                                <Alert className="m-2" color="danger">Add a description</Alert>
                                                            }
                                                            <Input onChange={(val) => this.setState({
                                                                createPostText: val.target.value
                                                            })} type="textarea" placeholder='What would you like to talk about?' style={{ borderColor: 'white' }} />
                                                            <Label className="btn btn-secondary">
                                                                <Input onChange={(val) => this.setState({ createPostImage: val.target.files[0] })} type="file" />
                                                                Select Image
                                                            </Label>
                                                            {this.state.createPostImage &&
                                                                <Label>
                                                                    {this.state.createPostImage.name}
                                                                </Label>}
                                                        </>
                                                    }
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button onClick={() => this.publishPost()} color="primary" >Publish</Button>
                                                </ModalFooter>
                                            </Modal>
                                        </Col>
                                    </Row>
                                    <Modal toggle={() => this.setState({ editOpen: !this.state.editOpen })} isOpen={this.state.editOpen} >
                                        <ModalHeader toggle={() => this.setState({ editOpen: !this.state.editOpen })} style={{ backgroundColor: '#0073b1', color: 'white' }}>Edit Post</ModalHeader>
                                        <ModalBody>
                                            {this.state.personalProfile
                                                ?
                                                < img className='newsfeed-pic' src={this.state.personalProfile.imageUrl} alt='profile pic' />
                                                :
                                                <img className='newsfeed-pic' src='src="https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png"' alt='profile pic' />
                                            }
                                            {this.state.personalProfile &&
                                                <>
                                                    <span style={{ color: 'black', padding: '10px', fontWeight: '600' }}>{this.state.personalProfile.firstname}{" "}{this.state.personalProfile.surname}</span>
                                                    <Input onChange={(val) => this.setState({
                                                        editPostText: val.target.value
                                                    })} type="textarea" value={this.state.editPostText} style={{ borderColor: 'white' }} />
                                                    {/*  <Input onChange={(val) => this.setState({ createPostImage: val.target.files[0] })} type="file" /> */}
                                                </>
                                            }
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button onClick={() => this.editPost()} color="primary" >Edit</Button>
                                        </ModalFooter>
                                    </Modal>
                                    {this.state.posts.slice(0, this.state.numberPosts)
                                        .map((post, index) =>
                                            <Row key={index} className="news-feed">
                                                <Col>
                                                    <Link to={"/profile/" + post.username}>
                                                        <Row>
                                                            <img className="newsfeed-pic" src={post.userImage} alt="profile pic" />
                                                            <Col>
                                                                <span style={{ color: 'black', padding: '10px', fontWeight: '600' }}>{post.name}{" "}{post.surname}</span>
                                                                <Row >
                                                                    <Moment className="time-date" date={post.updatedAt} format="HH:mm DD/MM" />
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Link>
                                                    {post._edit &&
                                                        <>
                                                            <i onClick={() =>
                                                                this.setState({
                                                                    editOpen: true,
                                                                    editPostText: post.text,
                                                                    editPostId: post._id
                                                                })} className="fa fa-pencil"></i>
                                                            <i onClick={() => this.removePost(post._id)} class="far fa-trash-alt"></i>
                                                        </>}
                                                    <Row>
                                                        <p style={{ paddingTop: '20px' }}>{post.text}</p>
                                                    </Row>
                                                    <Row style={{ backgroundColor: '#dddddd7c', borderRadius: '5px' }}>

                                                        {post.image &&
                                                            <img className="newsfeed-img mx-auto " src={post.image} alt='news feed' />}    
                                                    </Row>
                                                    <hr />
                                                    <i className="fas fa-thumbs-up"></i>
                                                    <i className="fas fa-comment"></i>
                                                </Col>
                                            </Row>)
                                    }
                                    <Row>
                                        <Col style={{ textAlign: 'center' }}>
                                           {this.state.numberPosts.length > 20 && <Button onClick={() => this.setState({ numberPosts: this.state.numberPosts + 15 })} color="primary">LOAD MORE</Button>}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Fade>

                }
            </>
        );
    }

    componentDidMount = async () => {
        let getPosts = await GetAPI(this.props.details.username, this.props.details.userToken, 'posts')
        let posts = getPosts.posts
        posts.forEach(async post => {
            let oneUser = post.username
            let profile = await GetAPI(this.props.details.username, this.props.details.userToken, 'profile', oneUser)
            
            post.name = profile.name
            post.surname = profile.surname
            if (localStorage.getItem('username') === post.username)
                post._edit = "true"
            profile.image
                ?
                post.userImage = profile.image
                :
                post.userImage = "https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png"
            this.setState({
                posts: [...this.state.posts, post]
                //could have been destructured as posts: [... post, ...this.state.posts]
            })
        })
        posts.sort((a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt)
        })
        let personalProfile = await GetAPI(this.props.details.username, this.props.details.userToken, 'profile')
    
        this.setState({
            personalProfile: personalProfile,
            isLoading: false,
            posts: posts
        })
    }

    removePost = async (id) => {
        await DeletePostAPI(this.props.details.username, this.props.details.userToken, id)
        this.setState({ posts: this.state.posts.filter(post => post._id !== id) })
    }

    publishPost = async () => {
        if (this.state.createPostText) {
            this.setState({
                createOpen: false,
                createPostError: false
            })
            let postObject = {
                text: this.state.createPostText
            }
            let response = await PostAPI(this.props.details.username, localStorage.getItem('password'), 'post', postObject)
            if (this.state.createPostImage) {
                let fd = new FormData();
                fd.append("post", this.state.createPostImage)
                await PostImageAPI(localStorage.getItem('username'), localStorage.getItem('password'), fd, 'post', response._id)
            }
            let post = await GetAPI(localStorage.getItem('username'), localStorage.getItem('password'), 'post', '', response._id)
            post.name = this.state.personalProfile.name
            post.surname = this.state.personalProfile.surname
            post._edit = true
            this.state.personalProfile.image
                ?
                post.userImage = this.state.personalProfile.image
                :
                post.userImage = "https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png"
            this.state.posts.unshift(post)
            this.setState({
                createOpen: false,
                createPostError: false,
                createPostImage: undefined,
                createPostText: undefined
            })
        } else {
            this.setState({ createPostError: true })
        }
    }
}

export default connect(mapStateToProps) (NewsFeed);