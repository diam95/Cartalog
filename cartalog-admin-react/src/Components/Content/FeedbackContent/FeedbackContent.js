import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme)=>({
    root:{
    },
    messageCard:{
        display:'inline-block',
        margin:theme.spacing(1),
        padding:theme.spacing(2),
        float:'left',
        fontSize:16,
        fontWeight:400,
        textAlign:'left'
    }
}));

const FeedbackContent = (props) => {

    const store = props.store;

    const feedback = () => {

        const allFeedback = store.feedback;
        const magadanFeedback = allFeedback.magadan;

        const magadanFeedbackKeys = Object.keys(magadanFeedback);

        const result = magadanFeedbackKeys.map(key => {

            const allMessages = magadanFeedback[key];

            const allMessagesKeys = Object.keys(allMessages);

            const res = allMessagesKeys.map(key2 => {

                const message = allMessages[key2].message;

                return(
                    <Paper className={classes.messageCard}>
                    <Typography variant="h6" component="p">{message}</Typography>
                </Paper>
                )

            });

            return(res)

        });

        return(result)

    };

    const classes = useStyles();

    return(
        <div className={classes.root}>
            {feedback()}
        </div>
    )

};

export default FeedbackContent;
