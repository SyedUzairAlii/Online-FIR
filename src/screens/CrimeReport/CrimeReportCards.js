import React, { Component } from 'react';
import Container from '../../Container/container/container';
import firebase from 'firebase'
// import swal from 'sweetalert2'
import { connect } from 'react-redux'
import { homeDistrict, south, city, central, malir, korangi, east, west } from '../../components/District/district'
// import './complaintStatus.css'
// import { homeDistrict, south, city, central, malir, korangi, east, west } from '../District/district'
import { TextField, Button, Radio, InputLabel, Select, MenuItem, Input } from '@material-ui/core';
import StatusIcon from '../../Assets/logo/status.png'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import ReportCard from '../../components/ComplainCard/Card';
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

class CrimeReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allFir: [],
            district: ''
        }
    }

    componentWillMount() {
        const { allFir } = this.props;
        console.log('AllFir******', allFir)
        if(allFir){
            this.setState({ allFir })
        }
    }

    componentWillReceiveProps(props) {
        const { allFir } = props;
        console.log('AllFir******', allFir)
        if(allFir){
            this.setState({ allFir })
        }
    }


    // getResult() {
    //     const { regNo, complaints } = this.state

    // }

    handleChange = name => event => {
        this.setState({
            // [name]: event.target.value,
            district: event.target.value,
        });
    };

    render() {
        const { allFir, district } = this.state
        const { classes } = this.props;
        return (
            // <Container user={true} logout={this.logout}>
            <div className={'complaint-status'}>
                    {/* <div>
                        <img src={StatusIcon} width={30} />
                        Complaint Status
                        </div>
                    <hr />
                    <br /> */}
                {/* <h1>complaint-status</h1> */}
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
                {!district ?
                    <div>
                        {allFir.length &&
                            allFir.map(item => {
                                return <ReportCard data={item.data} key={item.key} />
                            })
                        }
                    </div>
                    :
                    <div>
                        {allFir.length &&
                            allFir.map(item => {
                                return <div>
                                    {
                                        item.data.district === district &&
                                        <ReportCard data={item.data} key={item.key} />
                                    }
                                </div>
                            })
                        }
                    </div>
                }
            </div>
            //  </Container> 
        )
    }
}


function mapStateToProps(state) {
    return ({
        allFir: state.firReducer.ALLFIR
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // LoginMethod: (text) => {
        //     dispatch(SignInAuth(text))
        // }
    })
}
CrimeReport.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CrimeReport));
