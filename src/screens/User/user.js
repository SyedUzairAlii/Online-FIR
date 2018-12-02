import React, { Component } from 'react';
import { connect } from 'react-redux'
import Icon1 from '../../Assets/logo/police-station.png'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faBoxes, faCheckCircle, faUserCheck, faHistory } from '@fortawesome/free-solid-svg-icons'
import History from '../../History/History'
import Icon2 from '../../Assets/logo/status-white.png'
import firebase from '../../Config/Firebase/firebase'


library.add(faClipboardList, faBoxes, faCheckCircle, faUserCheck, faHistory)


class User extends Component {
    constructor() {
        super()

        this.state = {
            complaint: [],
            pending: [],
            resolved: []
        }
    }

    complaint() {
        History.push('/form')
    }

    complaintStatus() {
        History.push('/status')
    }

    complaintHistory() {
        History.push('/history')
    }

    componentDidMount() {
        const { user } = this.props
        const arr = []
        const arr2 = []
        const arr3 = []
        firebase.database().ref('/complaint/' + user.userUid + '/').on('child_added', (snapShot) => {
            // console.log(snapShot.val(),'complaints')
            if (snapShot.val().status === 'inprogress') {
                // console.log(snapShot.val(), 'pending')
                arr.push(snapShot.val())
                this.setState({ pending: arr })
            }
            else if (snapShot.val().status === 'resolved') {
                // console.log(snapShot.val(), 'resolved')
                arr3.push(snapShot.val())
                this.setState({ resolved: arr3 })
            }
            if (snapShot.val()) {
                arr2.push(snapShot.val())
                this.setState({ complaint: arr2 })
            }
            // console.log(snapShot.val(), 'complaints')
        })

        firebase.database().ref('/complaint/' + user.userUid + '/').on('child_changed', (snapChanged) => {
            console.log(snapChanged.val(), 'complaints')
            if (snapChanged.val().status === 'resolved') {
                const { pending, resolved } = this.state
                var pend = pending.indexOf(snapChanged.val())
                pending.splice(pend, 1)
                resolved.push(snapChanged.val())
                this.setState({ pending, resolved })
            }
            else if (snapChanged.val().status === 'inprogress') {
                const { pending, resolved } = this.state
                // var res = resolved.indexOf(snapChanged.val())
                // resolved.splice(res, 1)
                pending.push(snapChanged.val())
                this.setState({ pending, resolved })
            }
            // console.log(snapShot.val(), 'complaints')
        })
    }

    render() {
        const { complaint, pending, resolved } = this.state
        return (
            <div className='flex-container'>
                <div className='icon'>
                    <div onClick={() => this.complaint()}>
                        <FontAwesomeIcon icon='clipboard-list' style={{marginTop: '10px'}} size={'2x'} />
                        <span>Complaint</span>
                    </div>
                    <div onClick={() => this.complaintStatus()}>
                        <img src={Icon2} width={40} />
                        <span>Complaint <br />Status</span>
                    </div>
                    <div>
                        <img src={Icon1} width={40} />
                        <span>Police Station</span>
                    </div>
                    <div onClick={() => this.complaintHistory()}>
                        <FontAwesomeIcon icon='history' style={{marginTop: '10px'}} size={'2x'} />
                        <span>FIR History</span>
                    </div>
                </div>
                <div className={'user-complaint-status'}>
                    <div>
                        <div>
                            {
                                complaint &&
                                complaint.length}
                        </div>
                        <div>
                            <FontAwesomeIcon icon={'boxes'} color={'white'} size={'1x'} />
                        </div>
                        <div>
                            TOTAL COMPLAINTS
                        </div>
                    </div>
                    <div>
                        <div>
                            {
                                pending &&
                                pending.length}
                        </div>
                        <div>
                            <FontAwesomeIcon icon={'user-check'} color={'white'} size={'1x'} />
                        </div>
                        <div>
                            IN-PROGRESS COMPLAINTS
                        </div>
                    </div>
                    <div>
                        <div>
                            {
                                resolved &&
                                resolved.length}
                        </div>
                        <div>
                            <FontAwesomeIcon icon={'check-circle'} color={'white'} size={'1x'} />
                        </div>
                        <div>
                            RESOLVED COMPLAINTS
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
        // LoginMethod: (text) => {
        //     dispatch(SignInAuth(text))
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(User);


// export default Dashboard;
