import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, Input,
    InputLabel,
    Select,
    Slide
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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
    }

}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const FeedFilterView = (props) => {

    const classes = useStyles()

    const matches = props.matches
    const locationArray = props.locationArray

    const brandsArray = props.brandsArray
    const brand = props.brand

    const modelsArray = props.modelsArray
    const model = props.model

    const partNamesArray = props.partNamesArray
    const partName = props.partName

    const frameNumbersArray = props.frameNumbersArray
    const frameNumber = props.frameNumber

    const enginesArray = props.enginesArray
    const engine = props.engine

    const filterDialogIsOpen = props.filterDialogIsOpen

    const handleChange = props.handleChange
    const handleClose = props.handleClose
    const handleApplyFilter = props.handleApplyFilter
    const handleOpen = props.handleOpen

    const renderFeedFilter = () => {

        if (matches) {
            return (
                <Button variant={"outlined"}
                        color={"primary"}
                        className={classes.filterButtonStyle}
                        startIcon={<FilterListIcon/>}
                        onClick={handleOpen}
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

    const renderOptions = (type) => {

        switch (type) {

            case "brand":

                return (
                    <>
                        {brandsArray.map((brand, ind) => {

                            return (
                                <option value={ind} key={brand + ind}>{brand.toUpperCase()}</option>
                            )

                        })}
                    </>
                )

            case "model":

                return (
                    <>
                        {modelsArray.map((model, ind) => {

                            return (
                                <option value={ind} key={model + ind}>{model.toUpperCase()}</option>
                            )

                        })}
                    </>
                )

            case "partName":

                return (
                    <>
                        {partNamesArray.map((partName, ind) => {

                            return (
                                <option value={ind}
                                        key={partName.partHref + ind}>{partName.partName.toUpperCase()}</option>
                            )

                        })}
                    </>
                )

            case "frameNumber":

                return (
                    <>
                        {frameNumbersArray.map((frameNumber, ind) => {

                            return (
                                <option value={ind} key={frameNumber + ind}>{frameNumber}</option>
                            )

                        })}
                    </>
                )

            case "engine":

                return (
                    <>
                        {enginesArray.map((engine, ind) => {

                            return (
                                <option value={ind} key={engine + ind}>{engine}</option>
                            )

                        })}
                    </>
                )

            default:
                break
        }

    }

    const renderEmptyOption = (type) => {

        switch (type){

            case "brand":
                if(locationArray[1]==="partsFilter"){
                    return <option value={undefined}>Все марки</option>
                }
            break

            case "model":
                if(locationArray[1]==="partsFilter"){
                    return <option value={undefined}>Все модели</option>
                }
            break

            case "partName":
                if(locationArray[1]==="partsFilter"){
                    return <option value={undefined}>Все модели</option>
                }
            break

            default:
                break

        }

    }

    return (
        <>
            {renderFeedFilter()}
            <Dialog
                fullScreen
                open={filterDialogIsOpen}
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <div>Фильтр запчастей</div>
                        <IconButton onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>

                    <form className={classes.formContainer}>

                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-dialog-select-label">Марка</InputLabel>
                            <Select
                                native
                                value={brand}
                                onChange={(value) => {
                                    handleChange("brand", value)
                                }}
                                input={<Input id="demo-dialog-native"/>}
                            >
                                {renderEmptyOption("brand")}
                                {renderOptions("brand")}
                            </Select>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-dialog-select-label">Модель</InputLabel>
                            <Select
                                native
                                value={model}
                                onChange={(value) => {
                                    handleChange("model", value)
                                }}
                                input={<Input id="demo-dialog-native"/>}
                            >
                                {renderEmptyOption("model")}
                                {renderOptions("model")}
                            </Select>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-dialog-select-label">Наименование детали</InputLabel>
                            <Select
                                native
                                value={partName}
                                onChange={(value) => {
                                    handleChange("partName", value)
                                }}
                                input={<Input id="demo-dialog-native"/>}
                            >
                                {renderEmptyOption("partName")}
                                {renderOptions("partName")}
                            </Select>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-dialog-select-label">Кузов</InputLabel>
                            <Select
                                native
                                value={frameNumber}
                                onChange={(value) => {
                                    handleChange("frameNumber", value)
                                }}
                                input={<Input id="demo-dialog-native"/>}
                            >
                                <option value={undefined}>Любой кузов</option>
                                {renderOptions("frameNumber")}
                            </Select>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-dialog-select-label">Двигатель</InputLabel>
                            <Select
                                native
                                value={engine}
                                onChange={(value) => {
                                    handleChange("engine", value)
                                }}
                                input={<Input id="demo-dialog-native"/>}
                            >
                                <option value={undefined}>Любой двигатель</option>
                                {renderOptions("engine")}
                            </Select>
                        </FormControl>

                    </form>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleApplyFilter} color="primary">
                        Ок
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

export default FeedFilterView