import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';

import history from '../History/History'
import Dashboard from '../screens/Dashboard/dashboard';
import Login from '../screens/Login/login';
import SignUp from '../screens/SignUp/signup';
import { connect } from 'react-redux'
import { OnAuth } from '../store/action/action';
import { UserInfo, UserComplaints, allFir } from '../store/action/action';
import MainPage from '../screens/MainPage/mainpage';
import Admin from '../screens/AdminPanel/admin';
import Form from '../components/Form/form';
import ComplaintStatus from '../screens/ComplaintStatus/complaintStatus';
import Feedback from '../screens/Feedback/feedback';
import FirHistory from '../screens/FirHistory/firHistory';
import AdminPage from '../screens/Admin/admin';
// import CrimeReport from '../components/ComplainCard/';

class Routers extends Component {

    componentDidMount() {
        const { UserCheck, AllFir } = this.props

        UserCheck();
        AllFir();
    }

    static getDerivedStateFromProps(props) {
        const { UserData, Complaints } = props
        if (props.user) {
            console.log(props.user, 'user here')
            UserData(props.user.userUid)
            Complaints(props.user.userUid)
        }
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/form" component={Form} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path='/home' component={Dashboard} />
                    <Route exact path='/status' component={ComplaintStatus} />
                    <Route exact path='/feedback' component={Feedback} />
                    <Route exact path='/history' component={FirHistory} />
                    <Route exact path='/policeDepart' component={AdminPage} />
                    {/* <Route exact path='/reports' component={CrimeReport} /> */}
                </div>
            </Router>
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
        UserCheck: (text) => {
            dispatch(OnAuth(text))
        },
        UserData: (text) => {
            dispatch(UserInfo(text))
        },
        Complaints: (text) => {
            dispatch(UserComplaints(text))
        },
        AllFir: () => {
            dispatch(allFir())
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Routers);
