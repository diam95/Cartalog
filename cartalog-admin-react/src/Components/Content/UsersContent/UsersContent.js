import React, {useEffect, useState} from "react";
import TotalUsersCard from "./TotalUsersCard/TotalUsersCard";

const UsersContent = (props) => {

    const store = props.store;

    const [usersCount,setUsersCount] = useState(0);

    useEffect(()=>{

        const allUsers = store.users;

        const count = Object.keys(allUsers).length;

        setUsersCount(count);

    });

    return(
        <div>
            <TotalUsersCard usersCount={usersCount}/>
        </div>
    )

};

export default UsersContent;
