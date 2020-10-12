import React from "react";
import PartLinkItemView from "./PartLinkItemView";

const PartLinkItem = (props) => {

    const item = props.item
    const id = props.id


    return(
        <PartLinkItemView item={item}
                          id={id}
        />
    )

}

export default PartLinkItem