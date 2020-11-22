import React from "react";
import Button from "@material-ui/core/Button";

const ButtonComponent = (props) => {

    console.log("ButtonComponent")

    const matches = props.matches

    const getSize = () => {

        if (matches) {
            return "small"
        } else {
            return "large"
        }
    }

    return (
        <Button size={getSize()} style={{textAlign:"left",display:"flex",justifyContent:"flex-start"}}>{props.text.trim()}</Button>
    )

}

export default ButtonComponent