import React, { Component } from 'react';
import {
    Input,
    Nav,
    NavItem,
    Collapse,
    Col,
    Row
} from 'reactstrap';
import { Link } from 'react-router-dom'
import GetAPI from '../APIs/GetAPI';
import { connect } from "react-redux"

const mapStateToProps = state => state


class NavBar extends Component {
    state = {
        image: undefined,
        allUsersFilter: [],
        search: "",
        isOpen: false
    }

    render() {
        return (
            <>
                <Nav className="sticky-top">
                    <NavItem>
                        <Link to="/">
                            <img className="logo-img" src="http://www.prepare1.com/wp-content/uploads/2014/04/linkedin-logo-high-res-1254-1024x1024.jpg" alt="logo-img" />
                        </Link>
                    </NavItem>
                    <Col className="ml-3">
                        <NavItem>
                            <Input id="search" style={{ maxWidth: '300px' }} type="search" placeholder="Search" onChange={(val) => this.filterUsers(val)} value={this.state.search} />

                        </NavItem>
                        <Collapse style={{ backgroundColor: 'white', borderRadius: '5px', marginTop: '5px', marginLeft: '20px', position: 'absolute', border: '1px solid #ddd'}} isOpen={this.state.isOpen}>
                            {this.state.allUsersFilter.length > 0 ? this.state.allUsersFilter 
                                .map((user, index) =>
                                    <Link onClick={() => this.setState({isOpen: false, search: ""})} key={index} to={"/profile/" + user.username}>
                                        <Row className="mx-auto search-item">
                                            <img className="nav-icon nav-icon-userimg" src={user.imageUrl ? user.imageUrl || this.props.details.img : this.props.details.img||'https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png'} alt="profile-img" />
                                            <h5 style={{ marginLeft: '10px', color: 'black' }}>{user.firstname + " " + user.surname}</h5>
                                        </Row>
                                    </Link>
                                )
                                :   <Row className="mx-auto search-item">
                                
                                <h5 style={{ marginLeft: '10px', color: 'black' }}>Sorry! No Such User</h5>
                            </Row>
                            }
                        </Collapse>
                    </Col>
                    <div align="right" className="nav-right-side">
                        <NavItem>
                            <Link to="/">
                                <span className="nav-icon nav-icon-home"></span>
                            </Link>
                        </NavItem>
                       
                        {/* <NavItem>
                            <span className="nav-icon nav-icon-case"></span>
                        </NavItem>
                        <NavItem>
                            <span className="nav-icon nav-icon-chat"></span>
                        </NavItem>
                        <NavItem>
                            <span className="nav-icon nav-icon-bell"></span>
                        </NavItem> */}
                        <NavItem>
                            <Link to={'/profile/' + this.props.details.username}>
                                <img className="nav-icon nav-icon-userimg" src={this.state.image ? this.state.image : 'https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png'} alt="profile-img"  style={{objectFit: "cover"}}/>
                            </Link>
                        </NavItem>
                    </div>
                    {/* <NavItem>
                        <span className="nav-icon nav-icon-grid"></span>
                    </NavItem> */}
                     <NavItem>
                            <a href="https://github.com/jeffascript/linkedin_mockup_Auth" target="_blank" rel="noopener noreferrer"><span className="nav-icon nav-icon-github"></span></a>
                        </NavItem>
                    <NavItem onClick={() => this.props.logout()}>
                        <span className="nav-icon nav-icon-book"></span>
                    </NavItem>
                </Nav>
            </>
        );
    }
 
    componentDidMount = async () => {
        try {
            
            let profile = await GetAPI(this.props.details.username, this.props.details.userToken, 'profile')
            // console.log(profile)
            let allUsers = await GetAPI(this.props.details.username, this.props.details.userToken)
            this.setState({
                image: profile.imageUrl,
                allUsers: allUsers.profileList
            })
    
            // console.log(this.state.allUsers)
            
        } catch (error) {
            throw new Error (error)
        }
    }

    componentDidUpdate = (prevProps)=>{
        if(prevProps.details.img !== this.props.details.img && prevProps.details.username !== this.props.details.username ){
            this.setState({
                image: this.props.details.img
               
            })
        }
    }


    filterUsers = (e) => {
        if (e.target.value && e.target.value.length > 0) {
            this.setState({
                isOpen: true,
                search: e.target.value
            })
            let search = e.target.value
            let allUsersFilter = this.state.allUsers.filter(user =>
                    user.firstname.toUpperCase().includes(search.toUpperCase()) ||
                    user.surname.toUpperCase().includes(search.toUpperCase())
                )
                console.log(allUsersFilter)
            allUsersFilter && allUsersFilter.length > 0
                ?
                this.setState({ allUsersFilter: allUsersFilter.slice(0, 4) })
                :
                this.setState({ allUsersFilter: [...allUsersFilter] })
        } else {
            this.setState({
                isOpen: false,
                search: ""
            })
        }
    }
}

export default connect(mapStateToProps) (NavBar);