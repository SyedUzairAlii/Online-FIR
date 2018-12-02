import React, { Component } from 'react';
import Button from '../../components/Button/button'
import swal from 'sweetalert2'
import { SignInAuth } from '../../store/action/action'
import { connect } from 'react-redux'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    email(email) {
        this.setState({
            email
        })
    }

    password(password) {
        this.setState({
            password
        })
    }

    signUpPage() {
        this.props.history.push('/signup')
    }

    loginAuth() {
        const { email, password } = this.state
        const { LoginMethod } = this.props
        if (email && password) {
            swal({
                onOpen: () => {
                    swal.showLoading()

                },
                onClose: () => {

                }
            })
            const obj = {
                email: email,
                password: password,
                User: 'admin'
            }
            LoginMethod(obj)
        }
    }
    render() {
        return (
            <div>
                <div className='main-page'>
                    <h1>Online FIR Registration</h1>
                </div>
                <div className='main-container'>
                    <div className='flex-box'>
                        <div className="field1" onClick={() => this.signUpPage()}>
                            SIGNUP
                    </div>
                        <div className="field1">
                            LOGIN
                    </div>
                        <div className='signUpDiv'>
                            <div className="sign-up">
                                LOGIN HERE
                        </div>
                            <div className='input-fields'>
                                <input type='email' placeholder='Email*' onChange={(e) => this.setState({ email: e.target.value })} />
                            </div>
                            <div className='input-fields'>
                                <input type='password' placeholder='Password*' onChange={(e) => this.setState({ password: e.target.value })} />
                            </div>
                            <div className='input-fields'>
                                <Button name={'Login'} btnEvent={this.loginAuth.bind(this)} />
                            </div>
                            <div className='fields'>
                                <h5>New Here ?<button className='signuplink' onClick={() => this.signUpPage()}> SignUp now</button></h5>
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
        user: state.authReducer.CURRENTUSER,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        LoginMethod: (text) => {
            dispatch(SignInAuth(text))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// export default Login;
