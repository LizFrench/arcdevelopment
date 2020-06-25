import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/logo.svg';


function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: '3em',
        [theme.breakpoints.down('md')]: {
            marginBottom: '2em'
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: '1.25em'
        }
    },
    logo: {
        height: '8em',
        [theme.breakpoints.down('md')]: {
            height: '7em'
        },
        [theme.breakpoints.down('xs')]: {
            height: '5.5em'
        }
    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent",
            overflow: 'scroll'
        }
    },
    tabContainer: {
        marginLeft: 'auto'
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px"
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: "50px",
        marginLeft: "50px",
        marginRight: "25px",
        height: "45px",
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        }
    },
    menu: {
        backgroundColor: theme.palette.common.blue,
        color: "white",
        borderRadius: "0px"
    },
    menuItem: {
        ...theme.typography.tab,
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.blue,
        fontWeight: 400,
        "&:hover": {
            backgroundColor: theme.palette.common.white,
            fontWeight: 700,

        }
    },
    menuItemHeader: {
        ...theme.typography.tab,
        backgroundColor: theme.palette.common.blue,
        color: theme.palette.common.white,
        marginBottom: "1px"
    },
    drawerIcon: {
        height: '50px',
        width: '50px'
    },
    drawerIconContainer: {
        marginLeft: 'auto',
        '&:hover': {
            backgroundColor: 'transparent'

        }
    },
    drawer: {
        backgroundColor: theme.palette.common.blue
    },
    drawerItem: {
        ...theme.typography.tab,
        color: theme.palette.common.white,
        opacity: 0.7

    },
    drawerItemTop: {
        ...theme.typography.tab,
        color: theme.palette.common.white,
        textAlign: 'right',
        opacity: 0.7


    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.orange

    },
    drawerItemSelected: {
        opacity: 1
    },
    list: {
        width: '100vw'
    }
}))


export default function Header(props) {
    const theme = useTheme();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [openMenu4, setOpenMenu4] = useState(false);

    const [openDrawer, setOpenDrawer] = useState(false);
    const [subListVisible, setSubListVisible] = useState(false);
    const [prev, setPrev] = useState(false);
    const [subMenuIndex, setSubMenuIndex] = useState(0);
    const [drawerVisible, setDrawerVisible] = useState(true);

    const handleChange = (e, newValue) => {
        props.setValue(newValue)
    }

    const handleClick = (e, activeIndex) => {
        setAnchorEl(e.currentTarget)

        if (1 === activeIndex) {
            setOpenMenu(true)

        }
        else if (4 === activeIndex) {
            setOpenMenu4(true)

        }
    }

    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null);
        setOpenMenu(false);
        setOpenMenu4(false);
        props.setSelectedIndex(i);
    }

    const handleClose = (e) => {
        setAnchorEl(null)
        setOpenMenu(false)
        setOpenMenu4(false)
    }

    const menuOptions = [
        { name: "Services", link: "/services", classes: { root: classes.menuItemHeader }, activeIndex: 1, selectedIndex: 0 },
        { name: "Custom Software Development", link: "/customsoftware", classes: { root: classes.menuItem }, activeIndex: 1, selectedIndex: 1 },
        { name: "Mobile App Development", link: "/mobileapps", classes: { root: classes.menuItem }, activeIndex: 1, selectedIndex: 2 },
        { name: "Website Development", link: "/websites", classes: { root: classes.menuItem }, activeIndex: 1, selectedIndex: 3 }
    ]

    const menuOptionsContacts = [
        { name: "Contact Us", link: "/contact", classes: { root: classes.menuItemHeader }, activeIndex: 4, selectedIndex: 0 },
        { name: "Contact1", link: "/contact", classes: { root: classes.menuItem }, activeIndex: 4, selectedIndex: 1 },
        { name: "Contact2", link: "/contact", classes: { root: classes.menuItem }, activeIndex: 4, selectedIndex: 2 },
        { name: "Contact3", link: "/contact", classes: { root: classes.menuItem }, activeIndex: 4, selectedIndex: 3 }
    ]

    const routes = [
        { name: 'Home', link: '/', activeIndex: 0 },
        { name: 'Services', link: '/services', activeIndex: 1, ariaOwns: anchorEl ? 'simple-menu' : undefined, ariaPopup: anchorEl ? 'true' : undefined, mouseOver: event => handleClick(event, 1) },
        { name: 'Revolution', link: '/revolution', activeIndex: 2 },
        { name: 'About Us', link: '/about', activeIndex: 3 },
        { name: 'Contact Us', link: '/contactMenu', activeIndex: 4, ariaOwns: anchorEl ? 'contact-menu' : undefined, ariaPopup: anchorEl ? 'true' : undefined, mouseOver: event => handleClick(event, 4) },

    ];

    useEffect(() => {
        [...menuOptions, ...routes].forEach(route => {
            switch (window.location.pathname) {
                case `${route.link}`:
                    if (props.value !== route.activeIndex) {
                        props.setValue(route.activeIndex);
                        if (route.selectedIndex && route.selectedIndex !== props.selectedIndex) {
                            props.setSelectedIndex(route.selectedIndex)
                        }
                    }
                    break;
                default:
                    break;
            }

        })
    }, [props.value, menuOptions, props.selectedIndex, routes]);

    const tabs = (
        <React.Fragment>
            <Tabs
                value={props.value}
                onChange={handleChange}
                className={classes.tabContainer}
                indicatorColor="secondary"
            >
                {routes.map((route, index) => (
                    <Tab
                        key={`${route}${index}`}
                        className={classes.tab}
                        component={Link} to={route.link}
                        label={route.name}
                        aria-owns={route.ariaOwns}
                        aria-haspopup={route.ariaPopup}
                        onMouseOver={route.mouseOver}
                    >
                    </Tab>
                ))}
            </Tabs>
            <Button variant="contained" color="secondary" className={classes.button}>
                Free Estimate
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                classes={{ paper: classes.menu }}
                MenuListProps={{ onMouseLeave: handleClose }}
                elevation={0}
                keepMounted
            >
                {menuOptions.map((option, i) => (
                    <MenuItem
                        key={`${option}${i}`}
                        component={Link}
                        to={option.link}
                        classes={option.classes}
                        onClick={(event) => { handleMenuItemClick(event, i); props.setValue(1); handleClose() }}
                        selected={i === props.selectedIndex && props.value === option.activeIndex}
                    >
                        {option.name}
                    </MenuItem>

                )

                )}
            </Menu>
            <Menu
                id="contact-menu"
                anchorEl={anchorEl}
                open={openMenu4}
                onClose={handleClose}
                classes={{ paper: classes.menu }}
                MenuListProps={{ onMouseLeave: handleClose }}
                elevation={0}
                keepMounted
            >
                {menuOptionsContacts.map((option, i) => (
                    <MenuItem
                        key={`${option}${i}`}
                        component={Link}
                        to={option.link}
                        classes={option.classes}
                        onClick={(event) => { handleMenuItemClick(event, i); props.setValue(4); handleClose() }}
                        selected={i === props.selectedIndex && props.value === option.activeIndex}
                    >
                        {option.name}
                    </MenuItem>
                )
                )}
            </Menu>
        </React.Fragment>
    )

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
                classes={{ paper: classes.drawer }}
                transition={false}
            >
                <List disablePadding className={classes.list}>
                    <ListItem
                        onClick={() => { setOpenDrawer(false); }}
                        divider
                        button
                    >
                        <ListItemText className={props.value === 0 ? [classes.drawerItemTop, classes.drawerItemSelected] : classes.drawerItemTop} disableTypography>X</ListItemText>
                    </ListItem>

                    <ListItem
                        button
                        divider
                        // onClick prop toggles the nested list state
                        // prev is the current state and we set it to the opposite
                        onClick={() => setSubListVisible(prev => !prev)}
                        className={classes.drawerItem}
                        classes={{ selected: classes.drawerItemSelected }}
                    >
                        <ListItemText className={classes.drawerItemText}>
                            Services
                        </ListItemText>
                        {subListVisible ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={subListVisible} timeout="auto" unmountOnExit>
                        <List dense disablePadding>
                            {menuOptions.map((item, index) => (
                                <ListItem
                                    key={index}
                                    button
                                    onClick={() => {
                                        props.setValue(1);
                                        setSubMenuIndex(index);
                                        setDrawerVisible(false);
                                    }}
                                    component={Link}
                                    to={item.link}
                                    selected={index === subMenuIndex}
                                >
                                    <ListItemText>{item.name}</ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                    {routes.map((route) => (
                        <ListItem
                            key={`${route}${route.activeIndex}`}
                            divider
                            button
                            component={Link}
                            to={route.link}
                            selected={props.value === route.activeIndex}
                            onClick={() => { setOpenDrawer(false); props.setValue(route.activeIndex) }}
                        >
                            <ListItemText className={props.value === route.activeIndex ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}>{route.name}</ListItemText>
                        </ListItem>
                    ))}

                    <ListItem
                        onClick={() => { setOpenDrawer(false); props.setValue(5) }}
                        divider
                        button
                        component={Link}
                        to='/estimate'
                        className={classes.drawerItemEstimate}
                        selected={props.value === 5}
                    >
                        <ListItemText className={props.value === 5 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} disableTypography>Free Estimate</ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)} disableRipple>
                <MenuIcon className={classes.drawerIcon} />
            </IconButton>
        </React.Fragment >

    )
    return (
        <>
            <ElevationScroll>
                <AppBar position="fixed">
                    <Toolbar disableGutters>
                        <Button
                            component={Link}
                            to="/"
                            disableRipple
                            onClick={() => props.setValue(0)}
                            className={classes.logoContainer}
                        >
                            <img alt="logo" className={classes.logo} src={logo} />
                        </Button>
                        {matches ? drawer : tabs}


                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </>
    );
}


