import React from 'react'
import SearchComponent from "../../Components/SearchComponent/SearchComponent";
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme)=>createStyles({

    root:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    }

}))

const HomeScreenView = () => {

    const classes= useStyles()

    return (
        <div className={classes.root}>

            <SearchComponent/>

        </div>
    )

}

export default HomeScreenView