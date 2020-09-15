import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        flexDirection: 'row',
    },
    item: {
        flexGrow: 1
    }

}));


const WorkingHours = (props) => {

    console.log('<WorkingHours/>');

    const partner = props.partner;
    const classes = useStyles();

    const handleWorkingHours = (hours) => {

        if (hours) {

            const open = hours.substring(0, 5);
            const close = hours.substring(6, 11);

            if (hours === 'Выходной') {

                return (
                    <div>

                        <div>
                            <Typography variant="body2" component="p">
                                Выход
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body2" component="p">
                                ной
                            </Typography>
                        </div>
                    </div>
                )

            } else {

                return (
                    <div>
                        <div>
                            <Typography variant="body2" component="p">
                                {open}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body2" component="p">
                                {close}
                            </Typography>
                        </div>
                    </div>
                )

            }

        }

    };

    return (

        <div className={classes.root}>

            <div className={classes.item}>
                <div>
                    <div>ПН</div>
                    {handleWorkingHours(partner.mon)}
                </div>
            </div>

            <div className={classes.item}>
                <div>
                    <div>ВТ</div>
                    {handleWorkingHours(partner.tue)}
                </div>
            </div>

            <div className={classes.item}>
                <div>
                    <div>СР</div>
                    {handleWorkingHours(partner.wed)}
                </div>
            </div>

            <div className={classes.item}>
                <div>
                    <div>ЧТ</div>
                    {handleWorkingHours(partner.thu)}
                </div>
            </div>

            <div className={classes.item}>
                <div>
                    <div>ПТ</div>
                    {handleWorkingHours(partner.fri)}
                </div>
            </div>

            <div className={classes.item}>
                <div>
                    <div>СБ</div>
                    {handleWorkingHours(partner.sat)}
                </div>
            </div>

            <div className={classes.item}>
                <div>
                    <div>ВС</div>
                    {handleWorkingHours(partner.sun)}
                </div>
            </div>

        </div>

    )

};

export default WorkingHours;
