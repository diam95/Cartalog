import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {IconButton} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        "&:hover": {
            background: "#eee"
        }
    },
    titleText: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        fontWeight: 500,
        textAlign: "start",
        color: "black",
        cursor: "pointer"
    },
    icon: {
        "&:hover": {
            color: "green"
        },
        color: "#808080",
        marginRight: theme.spacing(1)
    },
    actionsContainer: {
        zIndex: 100
    }
}))

const PartLinkItemView = (props) => {

    const item = props.item
    const id = props.id

    const classes = useStyles()

    const renderTitle = (title, id) => {

        const idddd = id + 1

        if (title.length > 0) {
            return title
        } else return ("Ссылка " + idddd)

    }

    const handleHover = (event) => {

    }

    const handleMouseLeave = (event) => {

    }

    const handleLinkClick = () => {

        const win = window.open(item.url, '_blank');
        win.focus();

    }

    return (

        <div className={classes.root} onMouseOver={handleHover}
             onMouseLeave={handleMouseLeave}>
            <div className={classes.titleText}
                 onClick={handleLinkClick}
            >
                {renderTitle(item.title, id)}
            </div>

            <div className={classes.actionsContainer}>
                <IconButton size={"medium"}
                            onClick={() => {
                            }}
                >
                    <EditIcon size/>
                </IconButton>
                <IconButton onClick={() => {
                }}
                            size={"medium"}
                            className={classes.icon}
                >
                    <DeleteForeverIcon/>
                </IconButton>
            </div>
        </div>

    )

}

export default PartLinkItemView