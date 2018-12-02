import React, { Component } from 'react';
import Container from '../../Container/container/container';
import firebase from 'firebase'
// import swal from 'sweetalert2'
import { connect } from 'react-redux'
import { TextField, Button, Radio } from '@material-ui/core';
import FeedbackIcon from '../../Assets/logo/feedback.png'
import './feedback.css'
import RatingStars from '../../Assets/logo/ratingStars.png'
import RatingStarsBlue from '../../Assets/logo/ratingStars-blue.png'


class FeedBack extends Component {
    constructor() {
        super()

        this.state = {
            user: null,
            rating: [1, 2, 3, 4, 5],
            ratingIndex: null,
            status: ['Resolved', 'Partially Resolved', 'Not Resolved'],
            statusIndex: null,
            feedback: ''
        }
    }
    logout() {
        firebase.auth().signOut()
    }

    handleChange(value) {
        this.setState({
            selectedValue: value
        })
    }

    submit() {
        const { ratingIndex, statusValue, selectedValue, feedback } = this.state
        const obj = {
            rating: ratingIndex + 1,
            complaintStatus: statusValue,
            satisfaction: selectedValue,
            feedback
        }

        console.log(obj)
    }

    render() {
        const { user, rating, ratingIndex, status, statusIndex, feedback } = this.state
        return (
            <Container user={true} logout={this.logout}>
                <div className={'complaint-status'}>
                    <div className={'heading'}>
                        <div>
                            <img src={FeedbackIcon} width={30} />
                            Feedback
                        </div>
                        <hr />
                        {/* <div className={'search-complain'}>
                            <div>
                                <TextField
                                    id="outlined-bare"
                                    className="Input"
                                    value={regNo}
                                    label={'Compliant ID'}
                                    placeholder="Search By Complaint ID"
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <Button
                                    variant={'raised'}
                                    className={'btn'}
                                    color={'primary'}
                                >
                                    Get Details
                                </Button>
                            </div>
                        </div> */}
                        <div className={'feedback'}>
                            <div>
                                Rate this complaint resolution<br />
                                <span>Please write your feedback</span>
                            </div>
                            <div>
                                {

                                }
                                {
                                    rating.map((items, index) => {
                                        return (
                                            ratingIndex !== null &&
                                                index <= ratingIndex ?
                                                <img src={RatingStarsBlue} onClick={() => this.setState({ ratingIndex: index })} width={30} />
                                                :
                                                <img src={RatingStars} onClick={() => this.setState({ ratingIndex: index })} width={30} />
                                        )
                                    })
                                }
                            </div>
                            <div>
                                <TextField
                                    id="standard-multiline-static"
                                    multiline
                                    className={'text-field'}
                                    rows="4"
                                    value={feedback}
                                    onChange={(e) => this.setState({ feedback: e.target.value })}
                                    variant="outlined"
                                    label={'Feedback'}
                                    placeholder="Write feedback here..."
                                    margin="normal"
                                />
                            </div>
                            <div>
                                Resolution Status
                            </div>
                            <div>
                                {
                                    status.map((items, index) => {
                                        return (
                                            index !== statusIndex ?
                                                <span className={'status'} onClick={() => this.setState({ statusIndex: index, statusValue: items })}>
                                                    {items}
                                                </span>
                                                :
                                                <span className={'status-blue'} onClick={() => this.setState({ statusIndex: null, statusValue: '' })}>
                                                    {items}
                                                </span>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                Are You Satisfied With The Complaint Resolution
                            </div>
                            <div>
                                <Radio
                                    checked={this.state.selectedValue === 'Yes'}
                                    onChange={(e) => this.handleChange(e.target.value)}
                                    value="Yes"
                                    name="radio-button"
                                    aria-label="Yes"
                                    color={'primary'}
                                />
                                Yes
                                    <Radio
                                    checked={this.state.selectedValue === 'No'}
                                    onChange={(e) => this.handleChange(e.target.value)}
                                    value="No"
                                    name="radio-button"
                                    aria-label="No"
                                    color={'primary'}
                                />
                                No
                            </div>
                            <div>
                                <Button
                                    variant={'contained'}
                                    color={'primary'}
                                    onClick={() => this.submit()}
                                >Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);


// export default Dashboard;
