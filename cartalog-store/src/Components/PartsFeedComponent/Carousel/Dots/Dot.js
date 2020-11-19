import React from "react";
import {animated, useSpring,config} from "react-spring";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({


    dot: {
        margin: 5,
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#3f51b5"
    }

}))

const Dot = (props) => {

    const dotID = props.dotID
    const number = props.number
    const id = props.id
    const prevID = props.prevID

    const classes = useStyles()

    const inflate = useSpring({

        from: {
            transform: 'scale(1)'
        },
        to: {
            transform: 'scale(2.5)'
        },
        reset: true

    })

    const deflate = useSpring({

        from: {
            transform: 'scale(2.5)'
        },
        to: {
            transform: 'scale(1)'
        },
        config:config.slow,
        reset: true

    })

    const getComparition = () => {

        if (dotID > id) {

            let comparition = dotID - number

            while (comparition >= number) {
                comparition -= number
            }

            return comparition

        } else if (dotID === id) {

            return dotID

        } else if (dotID < id) {

            let comparition = dotID + number

            while (comparition < 0) {
                comparition += number
            }

            return comparition

        }


    }

    const getAnimation = () => {

        if (id === getComparition()) {
            return (inflate)
        } else if (id === prevID) {
            return (deflate)
        }

    }

    return (
        <animated.div className={classes.dot} style={getAnimation()}/>
    )

}

export default Dot