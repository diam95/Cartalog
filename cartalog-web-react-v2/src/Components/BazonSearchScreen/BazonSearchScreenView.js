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
    },
    filterContainer: {
        margin: theme.spacing(3),
        background: "white",
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    item: {
        padding: theme.spacing(2)
    },
    partItemsContainer: {
        paddingBottom:theme.spacing(3),
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-around",
    },
    partItemContainer: {
        width:`20vw`,
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-start",
        justifyContent:"flex-start",
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"#Ffffff00",
        "&:hover":{
            borderColor:"grey"
        }
    },
    partItemImage: {
        width:`20vw`,
        height:`20vw`,
        aspectRatio:1,
        objectFit:"cover"
    },
    partItemTitle: {
        color:"white",
        fontSize:26,
        fontWeight:700
    },
    partItemPrice: {
        color:"white",
        fontSize:20,
        fontWeight:400
    }

}))

const BazonSearchScreenView = (props) => {

    const classes = useStyles()

    const loadingBrands = props.loadingBrands
    const loadingModels = props.loadingModels
    const loadingParts = props.loadingParts

    const carBrands = props.carBrands
    const carModels = props.carModels
    const partNames = props.partNames

    const brandInput = props.brandInput
    const modelInput = props.modelInput
    const partNameInput = props.partNameInput

    const handleInputChange = props.handleInputChange
    const handleSearch = props.handleSearch

    const partsList = props.partsList

    return (

        <div className={classes.root}>

            <TopAppBar/>

            <div className={classes.filterContainer}>

                <div className={classes.item}>
                    <Autocomplete
                        autoSelect={true}
                        id="combo-box-demo"
                        options={carBrands}
                        getOptionLabel={(option) => option}
                        style={{width: 300}}
                        onInputChange={(event, value) => {
                            handleInputChange(3, value)
                        }}
                        loading={loadingBrands}
                        renderInput={(params) =>
                            <TextField {...params}
                                       label="Марка"
                                       variant="outlined"
                                       value={brandInput}
                                       onChange={(event) => {
                                           handleInputChange(0, event)
                                       }}
                            />
                        }
                    />

                </div>

                <div className={classes.item}>

                    <Autocomplete
                        autoSelect={true}
                        id="combo-box-demo"
                        options={carModels}
                        getOptionLabel={(option) => option}
                        style={{width: 300}}
                        onInputChange={(event, value) => {
                            handleInputChange(4, value)
                        }}
                        loading={loadingModels}
                        renderInput={(params) =>
                            <TextField {...params}
                                       label="Модель"
                                       variant="outlined"
                                       value={modelInput}
                                       onChange={(event) => {
                                           handleInputChange(1, event)
                                       }}
                            />
                        }
                    />
                </div>

                <div className={classes.item}>

                    <Autocomplete
                        autoSelect={true}
                        id="combo-box-demo"
                        options={partNames}
                        getOptionLabel={(option) => option.category}
                        getOptionSelected={(option, value) => option.category === value.category}
                        style={{width: 300}}
                        onInputChange={(event, value) => {
                            handleInputChange(5, value)
                        }}
                        loading={loadingParts}
                        renderInput={(params) =>
                            <TextField {...params}
                                       label="Название детали"
                                       variant="outlined"
                                       value={partNameInput}
                                       onChange={(event) => {
                                           handleInputChange(2, event)
                                       }}
                            />
                        }
                    />

                </div>

                <Button variant="contained" color="primary" onClick={handleSearch}>
                    найти
                </Button>

            </div>

            <div className={classes.partItemsContainer}>
                {partsList.map(item => {
                    return (
                        <div className={classes.partItemContainer}>
                            <img src={item.imageSrc} className={classes.partItemImage}/>
                            <div className={classes.partItemTitle}>{item.title}</div>
                            <div className={classes.partItemPrice}>{item.price}</div>
                        </div>
                    )
                })}
            </div>

        </div>

    )

}

export default BazonSearchScreenView