import React, { useState, useEffect } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    useParams
} from "react-router-dom";

function Country({ match }) {
    useEffect(() => {
        fetchCountry();
    })

    const [country, setCountry] = useState({});

    const fetchCountry = async () => {
        const data = await (await fetch(`https://restcountries.eu/rest/v2/alpha/${match.params.id}`)).json();
        setCountry(data);
    }

    return <div>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital} </p>
        <img src={country.flag} alt="" width="400px" />
    </div>
}

export default Country;