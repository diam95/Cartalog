import React from 'react'
import NavBarComponentView from "./NavBarComponentView";

const NavBarComponent = (props) => {

    const matches = props.matches

    return (
        <>
            {matches
                ? <div/>
                : <NavBarComponentView matches={props.matches}
                />
            }
        </>
    )

}

export default NavBarComponent