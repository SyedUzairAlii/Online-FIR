import actionTypes from '../constant/constant'
import History from '../../History/History';
import swal from 'sweetalert2'
import firebase from '../../Config/Firebase/firebase'
import { func } from 'prop-types';

export function SignUpAuth(user) {
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((success) => {
                // user.User = 'user'
                delete user.password
                console.log('success signup')
                firebase.database().ref('/users/' + success.user.uid + '/').set(user)
                    .then(() => {
                        swal({
                            position: 'center',
                            type: 'success',
                            title: 'Successfully Registered',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        History.push('/home')
                        dispatch({ type: actionTypes.CURRENTUSER, payload: user })
                    })
            })
    }
}


export function SignInAuth(user) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((success) => {
                delete user.password
                swal({
                    position: 'center',
                    type: 'success',
                    title: 'Successfully Login',
                    showConfirmButton: false,
                    timer: 1000
                })
                // History.push('/home')
                console.log('user signin success')
                firebase.database().ref('users/' + success.user.uid + '/').on('value', (snapShot) => {
                    console.log(snapShot.val())
                    const currentUser = snapShot.val()
                    // if (currentUser.User === 'admin') {
                    //     History.push('/policeDepart')
                    // }
                    // else {
                    History.push('/home')
                    // }
                    dispatch({ type: actionTypes.CURRENTUSER, payload: currentUser })
                })
            })
    }
}



export function OnAuth() {
    return dispatch => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                const obj = {
                    email: user.email,
                    userUid: user.uid,
                }
                // console.log(user,'user')
                dispatch({ type: actionTypes.USERUID, payload: obj })
                firebase.database().ref('users/' + user.uid + '/').on('value', (snapShot) => {
                    console.log(snapShot.val())
                    const currentUser = snapShot.val()
                    // if (currentUser.User === 'admin') {
                    //     History.push('/policeDepart')
                    // }
                    // else {
                    History.push('/home')
                    // }
                    dispatch({ type: actionTypes.CURRENTUSER, payload: currentUser })
                })
                // History.push('/home')
                // ...
            } else {
                // User is signed out.
                // ...
                History.push('/')

            }
        });
    }
}

export function UserInfo(id) {
    return dispatch => {
        firebase.database().ref('users/' + id + '/').on('value', (snapShot) => {
            console.log(snapShot.val(), 'dyatas')
            localStorage.setItem('user', snapShot.val().User)
            dispatch({ type: actionTypes.USERDATA, payload: snapShot.val() })
        })
    }
}


export function Complaint(user, obj) {
    console.log(user, 'id')
    console.log(obj, 'object')
    if (!obj.email) {
        obj.email = 'not available'
    }
    swal({
        onOpen: () => {
            swal.showLoading()
        },
    })
    return dispatch => {
        firebase.database().ref('complaint/' + user + '/').push(obj)
            .then(() => {
                swal({
                    position: 'center',
                    type: 'success',
                    title: 'Your Complaint Added',
                    showConfirmButton: false,
                    timer: 1500
                })
                History.push('/home')
            })
    }
}


export function UserComplaints(user) {
    const arr2 = []
    return dispatch => {
        firebase.database().ref('/complaint/' + user + '/').on('child_added', (snapShot) => {
            // console.log(snapShot.val(),'complaints')
            // console.log(snapShot.val(), 'complaints')

            arr2.push(snapShot.val())
            arr2.forEach((element) => {
                element.key = snapShot.key
            })
        })

        dispatch({ type: actionTypes.COMPLAINT, payload: arr2 })
    }
}


export function allFir() {
    let arr = []
    return dispatch => {
        firebase.database().ref('/complaint/').on('child_added', snapShot => {
            console.log('snapShotval******', snapShot.val())
            var val = snapShot.val();
            for (var key in val) {
                console.log('val[key]*******', val[key])
                console.log('snapShotkey******', key)
                console.log('=====================')
                const obj = {
                    data: val[key],
                    key
                }
                arr.push(obj)
                dispatch({ type: actionTypes.ALLFIR, payload: arr })

            }
        })
    }
}