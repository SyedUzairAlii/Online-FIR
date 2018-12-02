import React, { Component } from 'react';
import Container from '../../Container/container/container';
import firebase from 'firebase'
import './dashboard.css'
// import swal from 'sweetalert2'
import { connect } from 'react-redux'
import User from '../User/user'
import AdminPage from '../Admin/admin'
import Admin from '../AdminPanel/admin';


class Dashboard extends Component {
    constructor() {
        super()

        this.state = {
            user: null
        }
    }

    logout() {
        firebase.auth().signOut()
    }

    static getDerivedStateFromProps(props) {
        console.log(props)
        if (props.userData) {
            const { userData } = props
            console.log(userData.User)
            return { user: userData.User }
        }
    }

    render() {
        const { user } = this.state
        return (
            <Container user={true} logout={this.logout}>
                {
                    user === 'user' &&
                    <User />
                }
                {
                    user === 'admin' &&
                    // <AdminPage />
                    <Admin />
                }
            </Container>
        )
    }
}


function mapStateToProps(state) {
    return ({
        user: state.authReducer.USERUID,
        userData: state.authReducer.USERDATA,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // LoginMethod: (text) => {
        //     dispatch(SignInAuth(text))
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


// export default Dashboard;
