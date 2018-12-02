import React, { Component } from 'react';
import { connect } from 'react-redux'
import swal from 'sweetalert2'
import Button from '../../components/Button/button'
import { SignUpAuth } from '../../store/action/action'




class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            User: 'admin'
        }

        this.signUp = this.signUp.bind(this)

    }

    email(email) {
        var emailVal = email;
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var err = document.getElementById('emailErr');
        if (emailVal === ' ') {
            err.style.fontSize = '0.8em'
            err.innerHTML = '*please don`t left spaces'
            err.style.color = 'red'
        }
        else if (!re.test(emailVal) && emailVal.length >= 1) {
            err.style.fontSize = '0.8em'
            err.innerHTML = '*Enter email correctly'
            err.style.color = 'red'
        }
        else {
            err.innerHTML = ''
            this.setState({
                email: emailVal
            })
        }
    }

    password(password) {
        var passVal = password;
        var err = document.getElementById('passwordErr');
        if (passVal.indexOf(' ') !== -1) {
            err.style.fontSize = '0.8em'
            err.innerHTML = '*please don`t left spaces'
            err.style.color = 'red'
        }
        else if (passVal.length <= 3 && passVal.length >= 1) {
            err.style.fontSize = '0.8em'
            err.innerHTML = 'Password Strength : Too Short'
            err.style.color = 'red'
        }
        else if (passVal.length <= 7 && passVal.length >= 1) {
            err.style.fontSize = '0.8em'
            err.innerHTML = 'Password Strength : Short'
            err.style.color = 'yellow'
        }
        else if (passVal.length <= 15 && passVal.length >= 1) {
            err.style.fontSize = '0.8em'
            err.innerHTML = 'Password Strength : Strong'
            err.style.color = 'green'
            this.setState({
                password: passVal
            })
        }
        else {
            err.innerHTML = ''
        }
    }

    re_password(re_password) {
        var passVal = re_password;
        var err = document.getElementById('passwordErr2');
        if (passVal.indexOf(' ') !== -1) {
            err.style.fontSize = '0.8em'
            err.innerHTML = '*please don`t left spaces'
            err.style.color = 'red'
        }
        else if (passVal.length <= 3 && passVal.length >= 1) {
            err.style.fontSize = '0.8em'
            err.innerHTML = 'Password Strength : Too Short'
            err.style.color = 'red'
        }
        else if (passVal.length <= 7 && passVal.length >= 1) {
            err.style.fontSize = '0.8em'
            err.innerHTML = 'Password Strength : Short'
            err.style.color = 'yellow'
        }
        else if (passVal.length <= 15 && passVal.length >= 1) {
            err.style.fontSize = '0.8em'
            err.innerHTML = 'Password Strength : Strong'
            err.style.color = 'green'
            this.setState({
                re_password: passVal
            })
        }
        else {
            err.innerHTML = ''
        }

    }

    signUp() {
        const { email, password, re_password, User } = this.state
        const { SignUpMethod } = this.props
        swal({
            onOpen: () => {
                swal.showLoading()

            },
            onClose: () => {

            }
        })

        if (email && password.length >= 8 && re_password) {

            if (password === re_password) {
                const obj = {
                    email: email,
                    password: password,
                    User
                }
                this.props.SignUpMethod(obj)
            } else {
                swal({
                    position: 'center',
                    type: 'error',
                    title: 'Password donot match',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } else {
            swal({
                position: 'center',
                type: 'warning',
                title: 'Fill out the required fields!',
                showConfirmButton: false,
                timer: 1500
            })
        }

    }

    // loginPage() {
    //     this.props.history.push('/login')
    // }



    render() {
        return (
            <div>
                {/* <div>Admin</div> */}
                <div className='main-page'>
                    <h1>Admin Online FIR Registration</h1>
                </div>
                <div className='main-container'>
                    <div className='flex-box'>
                        <div className="field1">
                            SIGNUP
                        </div>
                        {/* <div className="field1" onClick={() => this.loginPage()}>
                            LOGIN
                        </div> */}
                        <div className='signUpDiv'>
                            {/* <div className="sign-up">
                                SIGN UP HERE
                            </div> */}
                            <div className='input-fields'>
                                <input type='email' placeholder='Email*' onChange={(e) => this.email(e.target.value)} />
                                <br />
                                <span id='emailErr'></span>
                            </div>
                            <div className='input-fields'>
                                <input type='password' placeholder='Password*' onChange={(e) => this.password(e.target.value)} />
                                <br />
                                <span id='passwordErr'></span>
                            </div>
                            <div className='input-fields'>
                                <input type='password' placeholder='Retype password*' onChange={(e) => this.re_password(e.target.value)} />
                                <br />
                                <span id='passwordErr2'></span>
                            </div>
                            <div className='input-fields'>
                                <Button name={'Sign Up'} btnEvent={this.signUp} />
                            </div>
                            <div className='fields'>
                                <h5>Already Registered ?<button className='signuplink' onClick={() => this.loginPage()}> Login now</button></h5>
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
        user: state.authReducer.USERUID,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        SignUpMethod: (text) => {
            dispatch(SignUpAuth(text))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);


// export default Dashboard;
