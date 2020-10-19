import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import TopAppBar from "../common/TopAppBar/TopAppBar";
import bckgrImg from "../../assets/backgr.jpg";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => createStyles({

    root: {
        width: "100%",
        minHeight: "100vh",
        background: `url(${bckgrImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflow: "hidden",
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    filterContainer: {
        marginTop:theme.spacing(3),
        width:"75%",
        padding: theme.spacing(3),
        background: "white",
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    item:{
        padding:theme.spacing(2)
    },
    urlDELETE:{
        color:"white",
        marginTop: theme.spacing(3),
        fontSize:24,
        fontWeight:500
    }

}))

const BazonSearchScreenView = (props) => {

    const classes = useStyles()

    const carBrands = props.carBrands
    const categories = props.categories
    const handleInputChange = props.handleInputChange
    const makeInput = props.makeInput
    const url = props.url

    return (

        <div className={classes.root}>

            <TopAppBar/>

            <div className={classes.filterContainer}>

                <div className={classes.item}>
                    <Autocomplete
                        autoSelect={true}
                        id="combo-box-demo"
                        options={carBrands}
                        getOptionLabel={(option) => option.brand}
                        style={{width: 300}}
                        onInputChange={(event,value)=>{handleInputChange(3,value)}}
                        renderInput={(params) =>
                            <TextField {...params}
                                       label="Марка"
                                       variant="outlined"
                                       value={makeInput}
                                       onChange={(event)=>{handleInputChange(0,event)}}
                            />
                        }
                    />

                </div>

                <div className={classes.item}>

                    <Autocomplete
                        autoSelect={true}
                        id="combo-box-demo"
                        options={carBrands}
                        getOptionLabel={(option) => option.brand}
                        style={{width: 300}}
                        onInputChange={(event,value)=>{handleInputChange(4,value)}}
                        renderInput={(params) =>
                            <TextField {...params}
                                       label="Модель"
                                       variant="outlined"
                                       value={makeInput}
                                       onChange={(event)=>{handleInputChange(1,event)}}
                            />
                        }
                    />
                </div>

                <div className={classes.item}>

                    <Autocomplete
                        autoSelect={true}
                        id="combo-box-demo"
                        options={categories}
                        getOptionLabel={(option) => option.category}
                        style={{width: 300}}
                        onInputChange={(event,value)=>{handleInputChange(5,value)}}
                        renderInput={(params) =>
                            <TextField {...params}
                                       label="Название детали"
                                       variant="outlined"
                                       value={makeInput}
                                       onChange={(event)=>{handleInputChange(2,event)}}
                            />
                        }
                    />

                </div>

                <Button variant="contained" color="primary">
                    найти
                </Button>

            </div>

            <div className={classes.urlDELETE}>{url}</div>



        </div>

    )

}

export default BazonSearchScreenView