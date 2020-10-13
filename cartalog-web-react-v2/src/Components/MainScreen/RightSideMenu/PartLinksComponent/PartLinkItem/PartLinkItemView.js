import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {IconButton} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddBoxIcon from "@material-ui/icons/AddBox";

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
    removeIcon: {
        "&:hover": {
            color: "red"
        },
        color: "#808080",
        marginRight: theme.spacing(1)
    },
    actionsContainer: {
        zIndex: 100
    },
    columnContainer: {
        padding:theme.spacing(1),
        background: "#b6efcb",
        width:"100%",
        display: "flex",
        flexDirection: "column"
    }

}))

const PartLinkItemView = (props) => {

    const item = props.item
    const id = props.id
    const handleRemoveLink = props.handleRemoveLink
    const handleToggleEdit = props.handleToggleEdit
    const isEditMode = props.isEditMode
    const titleInput = props.titleInput
    const urlInput = props.urlInput
    const handleTitleInputChange = props.handleTitleInputChange
    const handleUrlInputChange = props.handleUrlInputChange

    const classes = useStyles()

    const renderTitle = (title, id) => {

        const idddd = id + 1

        if (title.length > 0) {
            return title
        } else return ("Ссылка " + idddd)

    }

    const handleLinkClick = () => {

        const win = window.open(item.url, '_blank');
        win.focus();

    }

    const renderLink = () => {

        if (isEditMode) {

            return (

                <div className={classes.root}>

                    <div className={classes.columnContainer}>

                        <Input id="outlined-basic"
                               placeholder={"Название"}
                               value={titleInput}
                               fullWidth={true}
                               onChange={(event => {
                                   handleTitleInputChange(event)
                               })}
                               inputProps={{
                                   style: {
                                       paddingTop: 24,
                                       paddingBottom: 24,
                                       paddingLeft: 16,
                                       paddingRight: 16
                                   }
                               }}
                               endAdornment={
                                   <InputAdornment position="end">
                                       <div>
                                           <IconButton onClick={() => {
                                               handleToggleEdit()
                                           }}
                                                       size={"medium"}
                                                       className={classes.icon}
                                           >
                                               <CheckCircleIcon/>
                                           </IconButton>
                                       </div>
                                   </InputAdornment>
                               }
                        />

                        <Input id="outlined-basic"
                               placeholder={"Ссылка"}
                               value={urlInput}
                               fullWidth={true}
                               onChange={(event => {
                                   handleUrlInputChange(event)
                               })}
                               inputProps={{
                                   style: {
                                       paddingTop: 24,
                                       paddingBottom: 24,
                                       paddingLeft: 16,
                                       paddingRight: 16
                                   }
                               }}

                        />

                    </div>

                </div>

            )

        } else {

            return (
                <div className={classes.root}>
                    <div className={classes.titleText}
                         onClick={handleLinkClick}
                    >
                        {renderTitle(item.title, id)}
                    </div>
                    <div className={classes.actionsContainer}>
                        <IconButton size={"medium"}
                                    onClick={() => {
                                        handleToggleEdit()
                                    }}
                        >
                            <EditIcon size/>
                        </IconButton>
                        <IconButton onClick={() => {
                            handleRemoveLink(item)
                        }}
                                    size={"medium"}
                                    className={classes.removeIcon}
                        >
                            <DeleteForeverIcon/>
                        </IconButton>
                    </div>
                </div>
            )

        }

    }

    return (

        <div className={classes.root}>

            {renderLink()}


        </div>

    )

}

export default PartLinkItemView