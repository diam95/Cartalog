import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import day from "../../assets/day.png"
import night from "../../assets/night.png"

const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 58,
        height: 28,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(30px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundImage: `url(${day})`,
                backgroundSize:"cover",
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 26,
        height: 26,
    },
    track: {
        borderRadius: 28 / 2,
        opacity: 1,
        backgroundImage: `url(${night})`,
        backgroundSize:"cover",
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({classes, ...props}) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});

const StyledSwitch = (props) => {

    return (
        <IOSSwitch {...props}/>
    )

}

export default StyledSwitch
