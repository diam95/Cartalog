import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddBoxIcon from '@material-ui/icons/AddBox';
import {Accordion, AccordionSummary, IconButton} from "@material-ui/core";
import PartLinkItem from "./PartLinkItem/PartLinkItem";
import Input from "@material-ui/core/Input";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        background: "white",
    },
    contentContainer: {},
    plusIcon: {
        marginRight:theme.spacing(1),
        "&:hover": {
            color: "green"
        },
        color: "#808080",
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
    },
    accordionSummary:{
        minHeight:56,
        fontWeight:"500"
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

        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              className={classes.accordionSummary}
            >
                <div className={classes.accordionTitleContainer}>Ссылки на запчасти ({linksArray.length})</div>
            </AccordionSummary>
            <AccordionDetails style={{padding:0}}>

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

            </AccordionDetails>
        </Accordion>

    )

}

export default PartLinksComponentView