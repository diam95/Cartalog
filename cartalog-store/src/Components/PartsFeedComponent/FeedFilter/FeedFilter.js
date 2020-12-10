import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FilterListIcon from '@material-ui/icons/FilterList';
import {useLocation} from 'react-router-dom';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl, Input, InputLabel, MenuItem, Select,
    Slide
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

    filterButtonStyle: {
        width: `calc(100% - ${theme.spacing(4)}px)`,
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    formContainer: {
        display: 'flex',
        flexDirection: "column"
    },

}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
});

const FeedFilter = (props) => {

    const matches = props.matches
    const filterState = props.filterState

    const classes = useStyles()

    const locationArray = useLocation().pathname.split("/")

    const [filterDialogIsOpen, setFilterDialogIsOpen] = useState(false);
    const [make, setMake] = useState(0);
    const [model, setModel] = useState(0);
    const [partName, setPartName] = useState(0);
    const [frame, setFrame] = useState(0);
    const [engine, setEngine] = useState(0);

    useEffect(() => {

        setMake(filterState.all_brands.indexOf(locationArray[1]))

        if(filterState.all_models[locationArray[1]]){
            setModel(filterState.all_models[locationArray[1]].indexOf(locationArray[2]))
        }

        if (filterState.parts_filter_detailed[locationArray[1]]) {

            if (filterState.parts_filter_detailed[locationArray[1]][locationArray[2]]) {
                setPartName(Object.keys(filterState.parts_filter_detailed[locationArray[1]][locationArray[2]]).indexOf(locationArray[3]))
            }

        }

    }, [locationArray, filterState])

    const handleClose = () => {

        setFilterDialogIsOpen(false)

    }

    const renderFeedFilter = () => {

        if (props.matches) {
            return (
                <Button variant={"outlined"}
                        color={"primary"}
                        className={classes.filterButtonStyle}
                        startIcon={<FilterListIcon/>}
                        onClick={() => {
                            setFilterDialogIsOpen(!filterDialogIsOpen)
                        }}
                >
                    Фильтр
                </Button>
            )
        } else {
            return (
                <div>
                    <div>
                        <div>Марка</div>
                        <div>Модель</div>
                    </div>
                    <div>
                        <div>Кузов</div>
                        <div>Двигатель</div>
                        <div>запчасть</div>
                    </div>
                </div>
            )
        }

    }

    const handleChange = (type, event) => {

        console.log(event.target.value)

        switch (type) {

            case"make":
                setMake(event.target.value)
                break;

            case"models":
                setMake(event.target.value)
                break;

            case"partName":
                setMake(event.target.value)
                break;

        }

    }

    const renderOptions = (type) => {

        switch (type) {

            case "make":

                return (
                    <>
                        {filterState.all_brands.map((brand, ind) => {

                            return (
                                <option value={ind} key={brand}>{brand.toUpperCase()}</option>
                            )

                        })}
                    </>
                )

            case "models":

                if (filterState.all_models[locationArray[1]]) {
                    return (
                        <>
                            {filterState.all_models[locationArray[1]].map((model, ind) => {

                                return (
                                    <option value={ind} key={model}>{model.toUpperCase()}</option>
                                )

                            })}
                        </>
                    )
                }
                break;

            case "partName": {
                if (filterState.parts_filter_detailed[locationArray[1]]) {

                    if (filterState.parts_filter_detailed[locationArray[1]][locationArray[2]]) {
                        return (
                            <>
                                {Object.values(filterState.parts_filter_detailed[locationArray[1]][locationArray[2]]).map((partName, ind) => {

                                    return (
                                        <option value={ind} key={partName}>{partName.toUpperCase()}</option>
                                    )

                                })}
                            </>
                        )
                    }
                }
            }

            default:
                break;

        }

    }

    return (
        <>
            {renderFeedFilter()}
            <Dialog
                fullScreen
                open={filterDialogIsOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Фильтр запчастей</DialogTitle>
                <DialogContent>

                    <form className={classes.formContainer}>

                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="demo-dialog-native">Марка</InputLabel>
                            <Select
                                native
                                value={make}
                                onChange={(value) => {
                                    handleChange("make", value)
                                }}
                                input={<Input id="demo-dialog-native"/>}
                            >
                                {renderOptions("make")}
                            </Select>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-dialog-select-label">Модель</InputLabel>
                            <Select
                                native
                                value={model}
                                onChange={(value) => {
                                    handleChange("models", value)
                                }}
                                input={<Input id="demo-dialog-native"/>}
                            >
                                {renderOptions("models")}
                            </Select>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-dialog-select-label">Модель</InputLabel>
                            <Select
                                native
                                value={partName}
                                onChange={(value) => {
                                    handleChange("partName", value)
                                }}
                                input={<Input id="demo-dialog-native"/>}
                            >
                                {renderOptions("partName")}
                            </Select>
                        </FormControl>

                    </form>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Ок
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default FeedFilter