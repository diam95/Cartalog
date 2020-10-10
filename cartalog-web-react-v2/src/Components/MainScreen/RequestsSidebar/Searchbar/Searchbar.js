import React, {useRef, useState} from "react";
import SearchbarView from "./SearchbarView";

const Searchbar = () => {

    const [searchInput, setSearchInput] = useState("");

    const handleSearchInput = (e) => {

        setSearchInput(e.target.value)

    }

    const handleClearInput = () => {

        setSearchInput("")

    }

    return(
        <SearchbarView searchInput={searchInput}
                       handleSearchInput={handleSearchInput}
                       handleClearInput={handleClearInput}
        />
    )

}

export default Searchbar