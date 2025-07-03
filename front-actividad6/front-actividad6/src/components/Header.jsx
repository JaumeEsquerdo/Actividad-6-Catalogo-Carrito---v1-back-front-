import { NavLink } from "react-router-dom";

import { useState } from "react";

const header = () => {

    return (
        <header className="Header">
            {/* <h1 className="Header-h1">SUSHIRO</h1> */}

            {/* <nav className="Header-nav">
                <NavLink to={"/menu"} className={`Nav-link `} >Top</NavLink>
                <NavLink to={"/"} className={`Nav-link `}>Sushi</NavLink>
                <NavLink to={"/"} className={`Nav-link `}>Nigiri</NavLink>
                <NavLink to={"/"} className={`Nav-link `}>Otros platos</NavLink>
            </nav>

            <nav className="Header-subNav">
                <NavLink to={"/"} className={`Nav-link `} >Call Staff</NavLink>
                <NavLink to={"/"} className={`Nav-link `} >Check-Out</NavLink>
            </nav> */}

        </header>

    );
}

export default header;