import React, { Component } from 'react';
import Container from '../../Container/container/container';
import firebase from 'firebase'
// import swal from 'sweetalert2'
import { connect } from 'react-redux'
// import './complaintStatus.css'
import { TextField, Button, Radio } from '@material-ui/core';
import StatusIcon from '../../Assets/logo/status.png'
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


const styles = theme => ({
    root: {
        // width: '100%',
        minWidth: '315px',
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

class ReportCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

        this.resolve = this.resolve.bind(this)

    }

    getResult() {
        const { regNo, complaints } = this.state

        this.setState({ regNo: '' })
        if (regNo) {
            if (complaints) {
                complaints.map((items) => {
                    if (items.id === regNo) {
                        this.setState({ data: items, notFound: false })
                    }
                })
            }
        } else {
            console.log('please check your complaint id')
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }

    }

    resolve() {

    }

    render() {
        const { classes, data, item } = this.props;
        console.log('Data**************', data, item)
        return (
            <div className={'complaint-status'}>
                <div className={'heading'}>
                    <div>
                        <img src={StatusIcon} width={30} />
                        Complaint Status
                        </div>
                    <hr />
                    {/* <div className={'search-complain'}>
                            <div>
                                <TextField
                                    id="outlined-bare"
                                    className="Input"
                                    value={regNo}
                                    label={'Compliant ID'}
                                    onChange={(e) => this.setState({ regNo: e.target.value })}
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
                                    onClick={() => { this.getResult() }}
                                >
                                    Get Details
                                </Button>
                            </div>
                        </div> */}
                    <div>
                        {
                            // data && !notFound &&
                            data &&
                            <div className={classes.root}>
                                <ExpansionPanel defaultExpanded={false}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <div className={classes.column}>
                                            <div><b>Complaint ID:</b></div>
                                            <Typography className={classes.heading}>{data.id}</Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <div><b>Complainant's Name:</b></div>
                                            <Typography className={classes.secondaryHeading}>{data.name}</Typography>
                                        </div>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <div className={'expand-details'}>
                                            <div>
                                                <div>
                                                    Incident Place:
                                                </div>
                                                <div>
                                                    {data.pIncident}
                                                </div>
                                                <div>
                                                    Incident Date:
                                                </div>
                                                <div>
                                                    {data.dIncident}
                                                </div>
                                                <div>
                                                    Incident Time:
                                                </div>
                                                <div>
                                                    {data.tIncident}
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    Home District:
                                                </div>
                                                <div>
                                                    {data.district}
                                                </div>
                                                <div>
                                                    Home Police Station:
                                                </div>
                                                <div>
                                                    {data.pStation}
                                                </div>
                                                <div>
                                                    Email:
                                                </div>
                                                <div>
                                                    {data.email}
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    Incident District:
                                                </div>
                                                <div>
                                                    {data.disIncident}
                                                </div>
                                                <div>
                                                    Incident PS Jurisdiction:
                                                </div>
                                                <div>
                                                    {data.PSJuris}
                                                </div>
                                                <div>
                                                    CNIC:
                                                </div>
                                                <div>
                                                    {data.cnic}
                                                </div>
                                            </div>
                                        </div>
                                    </ExpansionPanelDetails>
                                    <ExpansionPanelDetails>
                                        <div className={'incident-details'}>
                                            <div>
                                                <div>
                                                    Incident Details:
                                                </div>
                                                <div>
                                                    {data.detailInc}
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    Address:
                                                </div>
                                                <div>
                                                    {data.address}
                                                </div>
                                            </div>
                                        </div>
                                    </ExpansionPanelDetails>
                                    <Divider />
                                    <ExpansionPanelActions>
                                        {/* <Button size="small" color="primary">
                                            FEEDBACK
                                        </Button> */}
                                        <div className={'panel-footer'}>
                                            {
                                                data.status === 'pending' &&
                                                // <div>
                                                //     Pending...
                                                //     </div>
                                                <div>
                                                    <Button variant={"outlined"} onClick={() => this.resolve()} size="small" color="primary">
                                                        Resolve
                                                    </Button>
                                                    <Button variant={"outlined"} onClick={() => this.inProgress()} size="small" color="primary">
                                                        In Progress
                                                    </Button>
                                                </div>
                                            }
                                            {
                                                data.status === 'inprogress' &&
                                                <div style={{ color: 'red' }}>
                                                    In Progress...
                                                    </div>
                                            }
                                            {
                                                data.status === 'resolved' &&
                                                <div style={{ color: 'green' }}>
                                                    Resolved
                                                </div>
                                            }
                                            {/* <div>
                                                <Button onClick={() => this.feedBack()} size="small" color="primary">
                                                    FEEDBACK
                                                </Button>
                                            </div> */}
                                        </div>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                            </div>
                        }
                        {/* {
                            !data && notFound &&
                            <div style={{ color: 'red', fontSize: '20px' }}>
                                Data Not Found !!!
                                </div>
                        } */}
                    </div>
                </div>
            </div>
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
ReportCard.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReportCard));
