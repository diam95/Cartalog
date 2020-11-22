import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Dot from "./Dot";

const useStyles = makeStyles(() => ({

    root: {
        marginTop: 16,
        width: `100vw`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

}))

const Dots = (props) => {

    const dotID = props.dotID
    const number = props.number

    const [prevID, setPrevID] = useState(0);

    useEffect(() => {

        return (() => {

            if (dotID < 0) {

                let k = dotID

                while (k < 0) {
                    k += number
                }
                setPrevID(k)
            }

            if (dotID>0){

               if(dotID<number){
                   setPrevID(dotID)
               } else {

                   let k = dotID

                   while (k>=number){
                       k-=number
                   }

                   setPrevID(k)

               }

            }


        })

    }, [dotID, number])

    const classes = useStyles()

    const renderDots = () => {


        const result = []

        for (let i = 0; i < number; i++) {

            result.push(<Dot dotID={dotID}
                             number={number}
                             id={i}
                             prevID={prevID}
                             setPrevID={setPrevID}
                             key={i}
            />)

        }

        return result

    }

    return (

        <div className={classes.root}>
            {renderDots()}
        </div>

    )
}

export default Dots