import React, { Component } from 'react';
import './container.css'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Grid } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import classNames from 'classnames';
import Lock from '../../Assets/logo/baseline-lock-24px.svg';
import MaterialIcon, { colorPalette } from 'material-icons-react';
import History from '../../History/History'
import logo from '../../Assets/logo/logo.png'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';


const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    appFrame: {
        height: 430,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
    'appBarShift-right': {
        marginRight: drawerWidth,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'absolute',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    'content-right': {
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    'contentShift-right': {
        marginRight: 0,
    },
});


class Container extends Component {
    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        open: false,
        anchor: 'left',
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleChangeAnchor = event => {
        this.setState({
            anchor: event.target.value,
        });
    };

    pageChange(path, text) {
        History.push(path);
        console.log('Text', path, text);
        this.setState({ text: text })
    }

    home() {
        History.push('/home')
    }

    render() {
        const { children, user, logout } = this.props
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
        const { theme } = this.props;
        const { anchor, open } = this.state;

        const drawer = (
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <img src={logo} style={{ width: 60, height: 60, marginRight: '20px' }} alt="Log" />
                    {/* <h3>{text}</h3> */}

                    <h3>{'ONLINE FIR'}</h3>
                    <IconButton style={{ marginLeft: '20px' }} onClick={this.handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {[{ Text: 'Home', icon: 'InboxIcon', path: '/home' }, { Text: 'Complaint', icon: 'InboxIcon', path: '/form' }, { Text: 'Complaint Status', icon: 'InboxIcon', path: '/status' }, { Text: 'Police Station', icon: 'InboxIcon', path: '/station' }].map((item, index) => (
                        <ListItem button onClick={() => this.pageChange(item.path, item.Text)} className={classes.listItem} key={item.Text}>
                            {/* <ListItemIcon>{<item.icon />}</ListItemIcon> */}

                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={item.Text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {[{ text: 'Profile' }, { text: 'Notifications' }, { text: 'Notifications' }, { text: 'Notifications' }].map((item, index) => (
                        <ListItem button key={item.text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        );

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem>
                    <IconButton color="inherit">
                        {/* <Badge className={classes.margin} badgeContent={11} color="secondary"> */}
                        <NotificationsIcon />
                        {/* </Badge> */}
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
                <MenuItem onClick={logout}>
                    <IconButton color="inherit">
                        <MaterialIcon icon="lock" color='black' />
                    </IconButton>
                    <p>Logout</p>
                </MenuItem>
            </Menu>
        );

        let before = null;
        let after = null;

        if (anchor === 'left') {
            before = drawer;
        } else {
            after = drawer;
        }

        return (

            <div>
                {
                    !user &&
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <h2>Online FIR Registration</h2>
                            </Grid>
                        </Toolbar>
                    </AppBar>

                }
                {
                    user &&
                    <div className={classes.root}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton, open && classes.hide)}>
                                    <MenuIcon />
                                </IconButton>
                                <Typography style={{ cursor: 'pointer' }} onClick={() => this.home()} className={classes.title} variant="h6" color="inherit" noWrap>
                                    Online FIR Registration
                                </Typography>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                    />
                                </div>
                                <div className={classes.grow} />
                                <div className={classes.sectionDesktop}>
                                    <IconButton color="inherit">
                                        {/* <Badge className={classes.margin} badgeContent={17} color="secondary"> */}
                                        <NotificationsIcon />
                                        {/* </Badge> */}
                                    </IconButton>
                                    <IconButton
                                        aria-owns={isMenuOpen ? 'material-appbar' : null}
                                        aria-haspopup="true"
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <IconButton color="inherit" onClick={logout}>
                                        <MaterialIcon icon="lock" color='white' />
                                    </IconButton>
                                </div>
                                <div className={classes.sectionMobile}>
                                    <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                        <MoreIcon />
                                    </IconButton>
                                </div>
                            </Toolbar>
                        </AppBar>
                        {renderMenu}
                        {renderMobileMenu}
                        {before}
                        {after}
                    </div>
                }
                {children}
            </div>
        )

    }
}
Container.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Container);

