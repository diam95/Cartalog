import React from 'react'
import NavBarComponentView from "./NavBarComponentView";

const NavBarComponent = (props) => {

    console.log("NavBarComponent")

    return (
        <NavBarComponentView matches={props.matches}
        />
    )

}

export default NavBarComponent