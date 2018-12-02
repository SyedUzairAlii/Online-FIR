import React, { Component } from 'react';
import './mainPage.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons'
import History from '../../History/History'
import { connect } from 'react-redux'


library.add(faUser, faUserTie)

class MainPage extends Component {

    componentDidMount() {
        const user = localStorage.getItem('user')

        if(user === 'user'){
            this.userLogin()
        }else if(user === 'admin'){
            this.admin()
        }
    }

    userLogin() {
        History.push('/login')
    }

    admin() {
        History.push('/admin')
    }

    render() {
        return (
            <div>
                <div className='main-page'>
                    <h1>Online FIR Registration</h1>
                </div>
                <div>
                    <div className='admin'>
                        <div className='admin-icon'>
                            <div onClick={()=> this.admin()}>
                                <FontAwesomeIcon icon='user-tie' size={'2x'} />
                                <span>Admin Login</span>
                            </div>
                            <div onClick={() => this.userLogin()}>
                                <FontAwesomeIcon icon='user' size={'2x'} />
                                <span>User Login</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        userData: state.authReducer.USERDATA,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);


// export default MainPage;
