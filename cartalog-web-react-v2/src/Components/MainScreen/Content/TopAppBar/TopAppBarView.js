import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(() => ({

    root: {
        width: "100%",
        height: 48,
        background: "#7778e2",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    titleText: {
        marginLeft: 15,
        color: "white",
        fontSize: 20,
        fontWeight: 600
    },
    selectContainer: {
        marginRight: 25
    }

}))

const TopAppBarView = (props) => {

    const citiesArray = props.citiesArray
    const selectedCity = props.selectedCity
    const handleChange = props.handleChange
    const partnerData = props.partnerData

    const classes = useStyles()

    const renderMenuItems = () => {

        const countValue = (ind) =>{

            return (ind+1)*10

        }

        const result = citiesArray.map((city,ind) => {

            return <MenuItem value={countValue(ind)} key={ind}>{city}</MenuItem>

        })

        return result

    }

    const isCartalog = () => {

        if (partnerData.info){
            return partnerData.info.name === "Cartalog";
        } else return false

    }

    return (

        <div className={classes.root}>

            <div className={classes.titleText}>Cartalog</div>

            <div className={classes.selectContainer}>
                {isCartalog()?<Select
                    variant={"outlined"}
                    style={{backgroundColor: "white", height: 30, fontWeight: 500, color: "#4e4e4e"}}
                    value={selectedCity}
                    onChange={handleChange}
                >
                    {renderMenuItems()}
                </Select>
                :""}

            </div>

        </div>

    )

}

export default TopAppBarView