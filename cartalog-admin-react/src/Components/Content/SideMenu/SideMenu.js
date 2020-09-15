import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
    },
}));

const SideMenu = (props) => {

    console.log('<SideMenu/>');

    const classes = useStyles();
    const clickedSideMenu = props.clickedSideMenu;
    const setClickedSideMenu = props.setClickedSideMenu;

    const handleMenuItemClick = (id) => {

        setClickedSideMenu(id);

    };

    return (
        <div className={classes.root}>
            <List>
                <ListItem button selected={clickedSideMenu === 0} onClick={() => {
                    handleMenuItemClick(0)
                }}>
                    <ListItemIcon>
                        <SearchOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Заявки"/>
                </ListItem>
                <ListItem button selected={clickedSideMenu === 1} onClick={() => {
                    handleMenuItemClick(1)
                }}>
                    <ListItemIcon>
                        <ShoppingCartOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Автомагазины"/>
                </ListItem>
                <ListItem button selected={clickedSideMenu === 2} onClick={() => {
                    handleMenuItemClick(2)
                }}>
                    <ListItemIcon>
                        <BuildOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Автосервисы"/>
                </ListItem>
                <ListItem button selected={clickedSideMenu === 3} onClick={() => {
                    handleMenuItemClick(3)
                }}>
                    <ListItemIcon>
                        <PermIdentityOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Пользователи"/>
                </ListItem>
                <ListItem button selected={clickedSideMenu === 4} onClick={() => {
                    handleMenuItemClick(4)
                }}>
                    <ListItemIcon>
                        <FeedbackOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Обратная связь"/>
                </ListItem>
            </List>
        </div>
    );

};

export default SideMenu;
