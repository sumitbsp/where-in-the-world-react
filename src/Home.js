import React, { useState, useEffect } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

function Home() {
    const [allCountry, setAllCountry] = useState([]);

    useEffect(() => {
        fetchAllCountry();
    }, [])
    const fetchAllCountry = async () => {
        const data = await (await fetch('https://restcountries.eu/rest/v2/all')).json();
        setAllCountry(data);
    }

    return <div>
        {allCountry.map((country) => {
            return <Link to={`country/${country.alpha3Code}`} key={country.alpha3Code}><div >{country.name}</div></Link>
        })}
    </div>
}

export default Home;