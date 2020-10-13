import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddBoxIcon from '@material-ui/icons/AddBox';
import {IconButton} from "@material-ui/core";
import PartLinkItem from "./PartLinkItem/PartLinkItem";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        marginTop: theme.spacing(2),
        background: "white",
    },
    contentContainer: {
    },
    plusIcon: {
        "&:hover": {
            color: "green"
        },
        color: "#808080",
        marginRight: theme.spacing(1)
    },
    linksContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    nothingInHere: {
        fontWeight: 500,
        padding: theme.spacing(3)
    }

}))

const PartLinksComponentView = (props) => {

    const linksArray = props.linksArray
    const linkInput = props.linkInput
    const handleAddLink = props.handleAddLink
    const handleInputChange = props.handleInputChange
    const handleRemoveLink = props.handleRemoveLink
    const partnerData = props.partnerData
    const request = props.request

    const classes = useStyles()



    const renderLinks = () => {

        if (linksArray.length > 0) {

            return linksArray.map((item, id) => {

                return <PartLinkItem item={item}
                                     id={id}
                                     handleRemoveLink={handleRemoveLink}
                                     request={request}
                                     partnerData={partnerData}
                />

            })

        } else {
            return <div className={classes.nothingInHere}>Пусто</div>
        }

    }

    return (

        <div className={classes.root}>

            <div className={classes.contentContainer}>

                <Input id="outlined-basic"
                       placeholder={"Ссылка"}
                       value={linkInput}
                       fullWidth={true}
                       onChange={(event => {
                           handleInputChange(event)
                       })}
                       endAdornment={
                           <InputAdornment position="end">
                               <div>
                                   <IconButton className={classes.plusIcon}
                                               onClick={() => {
                                                   handleAddLink(linkInput)
                                               }}
                                   >
                                       <AddBoxIcon/>
                                   </IconButton>
                               </div>
                           </InputAdornment>
                       }
                       inputProps={{
                           style: {
                               paddingTop: 24,
                               paddingBottom: 24,
                               paddingLeft: 16,
                               paddingRight: 16
                           }
                       }}

                />

                <div className={classes.linksContainer}>

                    {renderLinks()}

                </div>

            </div>

        </div>

    )

}

export default PartLinksComponentView