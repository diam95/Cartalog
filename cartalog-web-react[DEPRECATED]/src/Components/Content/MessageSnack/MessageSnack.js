import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useSnackbar} from 'notistack';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 310,
        minWidth: 310,
    },
    header: {
        height: 80,
        backgroundColor: `#546c85`,
    },
    headerText: {
        fontWeight: 600,
        fontSize: 20,
        color: `white`,
        position: `absolute`,
        left: 0,
        top: 0,
        margin: 16
    },
    headerText2: {
        fontWeight: 400,
        fontSize: 18,
        color: `white`,
        position: `absolute`,
        left: 0,
        top: 25,
        margin: 16
    },
    content: {
        margin: 10
    },
    contentText: {
        fontSize: 18
    },
    close: {
        position: `absolute`,
        right: 0,
        top: 0,
        color: `white`,
        margin: 10
    }
}));

const MessageSnack = React.forwardRef((props, ref) => {

    const classes = useStyles();
    const {closeSnackbar} = useSnackbar();
    const request = useState(props.request);

    const handleDismiss = () => {
        closeSnackbar(props.id);
    };

    const message = () => {

        if (request[0].message.viewType === 1 || request[0].message.viewType === 3) {

            return (`Изображение`)

        } else {

            return (request[0].message.message);
        }
    };

    return (
        <Card className={classes.card} ref={ref}>
            <div className={classes.header} onClick={() => {
                request[0].handleMessageSnackClick(request[0].request.key)
            }}>
                <span
                    className={classes.headerText}>{request[0].request.make} {request[0].request.model}, {request[0].request.year}</span>
                <span className={classes.headerText2}>{request[0].request.description}</span>
            </div>
            <IconButton className={classes.close} onClick={handleDismiss}>
                <CloseIcon/>
            </IconButton>
            <div className={classes.content} onClick={() => {
                request[0].handleMessageSnackClick(request[0].request.key)
            }}>
                <span className={classes.contentText}>{message()}</span>
            </div>
        </Card>
    );
});

export default MessageSnack;