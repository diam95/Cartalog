import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import "moment/locale/ru";
import TheTable from "./TheTable/TheTable";
import ToolbarIcon from "./ToolbarIcon/ToolbarIcon";
import SideDrawer from "./SideDrawer/SideDrawer";
import Stats from "./Stats/Stats";
import Feedback from "./Feedback/Feedback";

const drawerWidth = 290;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        backgroundColor: `#daedf5`,
    },
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    drawerPaper: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(3),
        zIndex: 0,
        backgroundColor: `#daedf5`,
        borderRight: 0,
        marginTop: 64,
        [theme.breakpoints.up('lg')]: {
            marginTop: 56,
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: 48,
        },
        width: drawerWidth,
    },
    content: {
        backgroundColor: `#daedf5`,
        flexGrow: 1,
        marginTop: 64 + theme.spacing(3),
        paddingBottom: theme.spacing(3),
        marginRight: 350,
        [theme.breakpoints.down('md')]: {
            marginTop: 64,
            marginRight: 0,
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: 48,
            marginRight: 0,
        },
    },
    icon: {
        width: 36,
        minWidth: 36
    },
    circle: {
        height: `7px`,
        width: `7px`,
        backgroundColor: `#5570bb`,
        borderRadius: `50%`,
        display: `inline-block`,
    },

}));

function Content(props) {

    console.log(`<Content/>`);

    const {container} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    };

    //START
    const [vendorData] = useState(props.vendorData);
    const [clickedMenuItemIndex, setClickedMenuItemIndex] = useState(0);
    const [tableTitle, setTableTitle] = useState(`Все заявки`);

    const body = () => {

        switch (clickedMenuItemIndex) {
            case 0:
                return (<TheTable clickedMenuItemIndex={clickedMenuItemIndex}
                                  vendorData={vendorData} tableTitle={tableTitle}/>);
            case 1:
                return (<TheTable clickedMenuItemIndex={clickedMenuItemIndex}
                                  vendorData={vendorData} tableTitle={tableTitle}/>);
            case 2:
                return (
                    <Stats vendorData={vendorData} />
                );
            case 3:
                return (
                    <Feedback vendorData={vendorData}/>
                );
            default:
                return (<TheTable clickedMenuItemIndex={clickedMenuItemIndex}
                                  vendorData={vendorData} tableTitle={tableTitle}/>);
        }

    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <ToolbarIcon vendorData={vendorData}/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Cartalog
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden mdDown implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <SideDrawer clickedMenuItemIndex={clickedMenuItemIndex}
                                    setClickedMenuItemIndex={setClickedMenuItemIndex}
                                    setTableTitle={setTableTitle} handleDrawerToggle={handleDrawerToggle}
                                    vendorData={vendorData}/>
                    </Drawer>
                </Hidden>
                <Hidden mdDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        <SideDrawer clickedMenuItemIndex={clickedMenuItemIndex}
                                    setClickedMenuItemIndex={setClickedMenuItemIndex}
                                    setTableTitle={setTableTitle} handleDrawerToggle={handleDrawerToggle}
                                    vendorData={vendorData}/>
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                {body()}
            </main>
        </div>
    );
}

export default Content;