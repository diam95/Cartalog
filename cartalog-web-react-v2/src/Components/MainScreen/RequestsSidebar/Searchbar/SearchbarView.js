import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import CloseIcon from '@material-ui/icons/Close';
import {useSpring, animated} from 'react-spring'
import {Divider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

    root: {
        height: 40,
        background: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: theme.spacing(1)
    },
    inputContainer: {
        marginEnd: 25
    },
    input: {
        height: 36,
        marginRight: theme.spacing(1)
    },
    menuButtonContainer: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(1),
        color: "#808080",
        "&:hover": {
            color: "#5a5a5a",
        }
    },
    spacer: {
        width: 48
    },
    closeIconContainer: {
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        color: "#808080",
        "&:hover": {
            color: "#5a5a5a",
        },
        cursor: "default"
    }

}))

const SearchbarView = (props) => {

    const classes = useStyles()

    const searchInput = props.searchInput
    const handleSearchInput = props.handleSearchInput
    const handleClearInput = props.handleClearInput

    const [closeIsShown, setCloseIsShown] = useState(false);

    useEffect(() => {

        if (searchInput.length !== 0) {

            setCloseIsShown(true)

        } else {

            setCloseIsShown(false)

        }

    }, [searchInput])

    const getReset = () => {

        return !closeIsShown;

    }

    const rotateReveal = useSpring({
        to: {
            opacity: 1,
            transform: `rotate(0deg)`
        },
        from: {
            opacity: 0,
            transform: `rotate(90deg)`

        },
        reset: getReset()
    })

    const renderCloseIcon = () => {

        if (searchInput.length !== 0) {
            return <animated.div style={rotateReveal} className={classes.closeIconContainer}><CloseIcon onClick={handleClearInput}/></animated.div>
        }

    }

    return (

        <div className={classes.root}>

            <div className={classes.menuButtonContainer}>
                <MenuIcon/>
            </div>

            <FormControl variant="outlined"
                         fullWidth={true}
            >
                <OutlinedInput
                    className={classes.input}
                    placeholder={"Поиск"}
                    value={searchInput}
                    onChange={handleSearchInput}
                    id="outlined-adornment-weight"
                    endAdornment={
                        <InputAdornment position="end">
                            {renderCloseIcon()}
                        </InputAdornment>
                    }
                />
            </FormControl>

        </div>

    )

}

export default SearchbarView