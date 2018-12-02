import React, { Component } from 'react';
import Container from '../../Container/container/container';
import firebase from 'firebase'
// import swal from 'sweetalert2'
import { connect } from 'react-redux'
import { TextField, Button, Radio } from '@material-ui/core';
import StatusIcon from '../../Assets/logo/history.png'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import swal from 'sweetalert2'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { CopyToClipboard } from 'react-copy-to-clipboard';

library.add(faCopy)


const styles = theme => ({
    root: {
        // width: '100%',
        minWidth: '450px',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        color: 'rgba(0, 0, 0, 0.54)'
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

class FirHistory extends Component {
    constructor() {
        super()

        this.state = {
            user: null,
            regNo: '',
            data: null,
        }
    }
    logout() {
        firebase.auth().signOut()
    }

    static getDerivedStateFromProps(props) {
        if (props.complaint) {
            return ({ complaints: props.complaint })
        }
    }

    card(id, name, index) {
        const { indexNum, copied } = this.state
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <ExpansionPanel expanded={false}>
                    <ExpansionPanelSummary >
                        <div className={classes.column}>
                            <div><b>Complaint ID:</b></div>
                            <Typography className={classes.heading}>{id}</Typography>
                        </div>
                        <div className={classes.column}>
                            <div><b>Complainant's Name:</b></div>
                            <Typography className={classes.secondaryHeading}>{name}</Typography>
                        </div>
                        <div className={classes.column}>
                            <CopyToClipboard text={id}
                                onCopy={() => this.setState({ copied: true, indexNum: index })}>
                                <FontAwesomeIcon icon='copy' size={'2x'} color={'grey'} />
                            </CopyToClipboard>
                            {
                                copied &&
                                index === indexNum &&
                                <div>
                                    Copied
                            </div>
                            }
                        </div>
                    </ExpansionPanelSummary>
                </ExpansionPanel>
            </div>
        )
    }

    render() {
        const { complaints } = this.state
        return (
            <Container user={true} logout={this.logout}>
                <div className={'complaint-status'}>
                    <div className={'heading'}>
                        <div>
                            <img src={StatusIcon} width={30} />
                            FIR History
                        </div>
                        <hr />
                        <div></div>
                        <div>
                            {
                                complaints &&
                                complaints.map((items, index) => {
                                    return (
                                        this.card(items.id, items.name, index)
                                    )
                                })

                            }
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
        complaint: state.authReducer.COMPLAINT
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // LoginMethod: (text) => {
        //     dispatch(SignInAuth(text))
        // }
    })
}
FirHistory.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FirHistory));
