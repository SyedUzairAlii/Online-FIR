import React, { Component } from 'react';
import './form.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '../../Container/container/container';
import firebase from '../../Config/Firebase/firebase'
import { connect } from 'react-redux'
import { Complaint } from '../../store/action/action'
import History from '../../History/History'
import Complain from '../../Assets/logo/complain.png'
import { homeDistrict, south, city, central, malir, korangi, east, west } from '../District/district'
import swal from 'sweetalert2'

library.add(faBookmark)

var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return ('_' + Math.random().toString(36).substr(2, 9)).toUpperCase();
};


function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

class Form extends Component {
    constructor() {
        super()

        this.state = {
            form: false,
            regNo: ID()
        }

        this.setHomePS = this.setHomePS.bind(this)
    }

    static getDerivedStateFromProps(props) {
        if (props.userData) {
            if (props.userData.User !== 'user') {
                console.log(props.userData, 'userprops here')
                History.push('/')
            } else {
                return { form: true }
            }
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    setHomePS(district) {
        switch (district) {
            case 'select':
                return (
                    <option key={'please select'} value={'please select'}>
                        {'----Please select----'}
                    </option>
                )
                break;
            case 'South':
                return (
                    south.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                )
                break;
            case 'City':
                return (
                    city.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                )
                break;
            case 'Central':
                return (
                    central.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                )
                break;
            case 'Malir':
                return (
                    malir.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                )
                break;
            case 'Korangi':
                return (
                    korangi.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                )
                break;
            case 'East':
                return (
                    east.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                )
                break;
            case 'West':
                return (
                    west.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                )
                break;
            default:
                return (
                    <option key={'please select'} value={'select'}>
                        {'----Please select----'}
                    </option>
                )
                break;
        }
    }


    add() {
        const { name, fatherName, cnic, mobile, email, address, district, pStation, dIncident,
            tIncident, pIncident, disIncident, PSJuris, detailInc, regNo } = this.state

        const obj = {
            id: regNo,
            name: name,
            fatherName: fatherName,
            cnic: cnic,
            mobile: mobile,
            email: email,
            address: address,
            district: district,
            pStation: pStation,
            dIncident: dIncident,
            tIncident: tIncident,
            pIncident: pIncident,
            disIncident: disIncident,
            PSJuris: PSJuris,
            detailInc: detailInc,
            status: 'pending'
        }

        if (!name || !fatherName || !cnic || !mobile || !address || district === 'select' ||
            pStation === 'select' || !dIncident || !tIncident || !pIncident || disIncident === 'select' ||
            PSJuris === 'select' || !detailInc) {
                console.log(obj)
            swal({
                position: 'center',
                type: 'error',
                title: 'Please fill the required fields',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            const { addComplaint, user } = this.props
            addComplaint(user.userUid, obj)
        }

        // console.log(obj, 'obj here')
    }

    logout() {
        firebase.auth().signOut()
    }

    render() {
        const { textmask, form, regNo } = this.state
        // console.log(this.state.currency)
        // console.log(textmask)
        return (
            <Container user={true} logout={this.logout}>
                {
                    form &&
                    <div className={'form-container'}>
                        <div className={'comp'}>
                            <div>
                                <img src={Complain} width={25} />
                                Complaint
                            </div>
                            <div>
                                <hr />
                            </div>
                        </div>
                        <div className={'form'}>
                            <div className='header'>
                                <h3><FontAwesomeIcon icon='bookmark' style={{ color: 'red', marginRight: '15px' }} />Online FIR</h3>
                            </div>
                            <div className={'fields'}>
                                <div>
                                    1. Fill the form very carefully.
                        </div>
                                <div>
                                    2. The fields marked (*) are mandatory to filled.
                        </div>
                            </div>
                            <div className={'complaint'}>
                                <div>
                                    Complainant's Detail
                                </div>
                                <div className={'form-fields'}>
                                    <div>
                                        Complaint ID:
                                    </div>
                                    <div>
                                        <TextField
                                            id="standard-with-placeholder"
                                            onChange={this.handleChange('name')}
                                            margin="normal"
                                            value={regNo}
                                            disabled
                                            className={'text-field'}
                                        />
                                    </div>
                                </div>
                                <div className={'form-fields'}>
                                    <div>
                                        Name:*
                                    </div>
                                    <div>
                                        <TextField
                                            id="standard-with-placeholder"
                                            placeholder="Name"
                                            onChange={this.handleChange('name')}
                                            margin="normal"
                                            className={'text-field'}
                                        />
                                    </div>
                                </div>
                                <div className={'form-fields'}>
                                    <div>
                                        Father Name:*
                                    </div>
                                    <div>
                                        <TextField
                                            id="standard-with-placeholder"
                                            placeholder="Father's Name"
                                            onChange={this.handleChange('fatherName')}
                                            margin="normal"
                                            className={'text-field'}
                                        />
                                    </div>
                                </div>
                                <div className={'form-fields'}>
                                    <div>
                                        CNIC #:*
                                    </div>
                                    <div>
                                        <Input
                                            value={textmask}
                                            onChange={this.handleChange('cnic')}
                                            id="formatted-text-mask-input"
                                            inputComponent={TextMaskCustom}
                                            // className={'text-field'}
                                            style={{ margin: '10px' }}
                                        />
                                    </div>
                                </div>
                                <div className={'form-fields'}>
                                    <div>
                                        Mobile No:*
                            </div>
                                    <div>
                                        <TextField
                                            id="standard-with-placeholder"
                                            placeholder="Mobile No"
                                            margin="normal"
                                            onChange={this.handleChange('mobile')}
                                            type={'number'}
                                            className={'text-field'}
                                        />
                                    </div>
                                </div>
                                <div className={'form-fields'}>
                                    <div>
                                        Email:
                            </div>
                                    <div>
                                        <TextField
                                            id="standard-with-placeholder"
                                            placeholder="Email"
                                            margin="normal"
                                            onChange={this.handleChange('email')}
                                            type={'email'}
                                            className={'text-field'}
                                        />
                                    </div>
                                </div>
                                <div className={'form-fields'}>
                                    <div>
                                        Present Address:*
                            </div>
                                    <div>
                                        <TextField
                                            id="standard-with-placeholder"
                                            placeholder="Address"
                                            onChange={this.handleChange('address')}
                                            margin="normal"
                                            className={'text-field'}
                                        />
                                    </div>
                                </div>
                                <div className={'form-fields'}>
                                    <div>
                                        Home District:*
                            </div>
                                    <div>
                                        <TextField
                                            id="standard-select-currency-native"
                                            select
                                            value={this.state.currency}
                                            onChange={this.handleChange('district')}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            helperText="Please select your District"
                                            margin="normal"
                                        >
                                            {homeDistrict.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>

                                    </div>
                                </div>
                                <div className={'form-fields'}>
                                    <div>
                                        Home Police Station:*
                            </div>
                                    <div>
                                        <TextField
                                            id="standard-select-currency-native"
                                            select
                                            value={this.state.currency}
                                            onChange={this.handleChange('pStation')}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            helperText="Please select police station"
                                            margin="normal"
                                        >
                                            {
                                                this.setHomePS(this.state.district)
                                            }
                                        </TextField>

                                    </div>
                                </div>
                            </div>
                            <div className={'complaint'}>
                                <div>
                                    Information Report
                        </div>
                                <div className={'form-fields'}>
                                    <div>
                                        Date of Incident:*
                            </div>
                                    <div>
                                        <TextField
                                            id="standard-with-placeholder"
                                            onChange={this.handleChange('dIncident')}
                                            margin="normal"
                                            type={'date'}
                                        />
                                    </div>
                                </div>
                                <div className={'form-fields'}>
                                    <div>
                                        Time of Incident:*
                            </div>
                                    <div>
                                        <TextField
                                            id="standard-with-placeholder"
                                            onChange={this.handleChange('tIncident')}
                                            margin="normal"
                                            placeholder={'e.g 10:30 am'}
                                        />
                                    </div>
                                </div>
                                <div className={'form-fields'}>
                                    <div>
                                        Place of Incident:*
                            </div>
                                    <div>
                                        <TextField
                                            id="standard-with-placeholder"
                                            placeholder="Place of Incident"
                                            onChange={this.handleChange('pIncident')}
                                            margin="normal"
                                            className={'text-field'}
                                        />
                                    </div>
                                </div>
                                <div className={'form-fields'}>
                                    <div>
                                        District of Incident:*
                            </div>
                                    <div>
                                        <TextField
                                            id="standard-select-currency-native"
                                            select
                                            value={this.state.currency}
                                            onChange={this.handleChange('disIncident')}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            helperText="Please select District of Incident"
                                            margin="normal"
                                        >
                                            {homeDistrict.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}

                                        </TextField>
                                    </div>
                                </div>
                                <div className={'form-fields'}>
                                    <div>
                                        Police Station Jurisdiction:*
                            </div>
                                    <div>
                                        <TextField
                                            id="standard-select-currency-native"
                                            select
                                            value={this.state.currency}
                                            onChange={this.handleChange('PSJuris')}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            helperText="Please select police station"
                                            margin="normal"
                                        >
                                            {
                                                this.setHomePS(this.state.disIncident)
                                            }
                                        </TextField>
                                    </div>
                                </div>
                                <div className={'form-fields'}>
                                    <div>
                                        Details of Incident:*
                            </div>
                                    <div>
                                        <TextField
                                            id="standard-multiline-static"
                                            multiline
                                            className={'text-field'}
                                            onChange={this.handleChange('detailInc')}
                                            rows="4"
                                            placeholder="Details of Incident"
                                            margin="normal"
                                        />
                                    </div>
                                </div>
                                <div className={'form-btn'}>
                                    <Button variant="contained" onClick={() => this.add()} color="primary">
                                        ADD
                            </Button>
                                </div>
                            </div>
                        </div>
                    </div>
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
        addComplaint: (userId, obj) => {
            dispatch(Complaint(userId, obj))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);

// export default Form;
