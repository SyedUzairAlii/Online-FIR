import React, { Component } from 'react';
import Button from '../../components/Button/button'
import './signup.css'
import swal from 'sweetalert2'
import { SignUpAuth } from '../../store/action/action'
import { connect } from 'react-redux'


class SignUp extends Component {
    constructor() {
        super()

        this.state = {
            f_name: '',
            l_name: '',
            email: '',
            password: '',
            re_password: '',
        }

        this.signUp = this.signUp.bind(this)
    }


    fName(f_name) {
        var nameVal = f_name;
        var reg = new RegExp('^[0-9]+$');
        var err = document.getElementById('err');
        if (nameVal.indexOf(' ') !== -1) {
            err.style.fontSize = '0.8em'
            err.innerHTML = '*please don`t left spaces'
            err.style.color = 'red'
        }
        else if (nameVal.length <= 3 && nameVal.length >= 1) {
            err.style.fontSize = '0.8em'
            err.innerHTML = '*First name should be greater than 4 characters'
            err.style.color = 'red'
        }
        else if (reg.test(nameVal)) {
            err.style.fontSize = '0.8em'
            err.innerHTML = '*Donot use numbers'
            err.style.color = 'red'
        }
        else {
            err.innerHTML = ''
        }
        this.setState({
            f_name: nameVal
        })
    }

    lName(l_name) {
        var nameVal = l_name;
        var reg = new RegExp('^[0-9]+$');
        var err = document.getElementById('err2');
        if (nameVal.indexOf(' ') !== -1) {
            err.style.fontSize = '0.8em'
            err.innerHTML = '*please don`t left spaces'
            err.style.color = 'red'
        }
        else if (nameVal.length <= 3 && nameVal.length >= 1) {
            err.style.fontSize = '0.8em'
            err.innerHTML = '*Last name should be greater than 4 characters'
            err.style.color = 'red'
        }
        else if (reg.test(nameVal)) {
            err.style.fontSize = '0.8em'
            err.innerHTML = '*Donot use numbers'
            err.style.color = 'red'
        }
        else {
            err.innerHTML = ''
        }
        this.setState({
            l_name: nameVal
        })
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
        const { f_name, l_name, email, password, re_password } = this.state
        const { SignUpMethod } = this.props
        swal({
            onOpen: () => {
                swal.showLoading()

            },
            onClose: () => {

            }
        })

        if (f_name.length >= 4 && l_name.length >= 4 && email && password.length >= 8 && re_password) {

            if (password === re_password) {
                const obj = {
                    name: f_name + ' ' + l_name,
                    email: email,
                    password: password,
                    User: 'user'
                }
                SignUpMethod(obj)
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

    loginPage() {
        this.props.history.push('/login')
    }

    render() {
        // console.log(this.props.user)
        return (
            <div>
                <div className='main-page'>
                    <h1>Online FIR Registration</h1>
                </div>
                <div className='main-container'>
                    <div className='flex-box'>
                        <div className="field1">
                            SIGNUP
                    </div>
                        <div className="field1" onClick={() => this.loginPage()}>
                            LOGIN
                        </div>
                        <div className='signUpDiv'>
                            <div className="sign-up">
                                SIGN UP HERE
                        </div>
                            <div className='input-fields'>
                                <input type='text' placeholder='First name*' onChange={(e) => this.fName(e.target.value)} />
                                <br />
                                <span id='err'></span>
                            </div>
                            <div className='input-fields'>
                                <input type='text' placeholder='Last name*' onChange={(e) => this.lName(e.target.value)} />
                                <br />
                                <span id='err2'></span>
                            </div>
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
        user: state.authReducer.CURRENTUSER,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        SignUpMethod: (text) => {
            dispatch(SignUpAuth(text))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
