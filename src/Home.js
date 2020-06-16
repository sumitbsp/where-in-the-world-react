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
    const [allCountryCopy, setAllCountryCopy] = useState([]);

    useEffect(() => {
        fetchAllCountry();
    }, [])

    const fetchAllCountry = async () => {
        const data = await (await fetch('https://restcountries.eu/rest/v2/all')).json();
        setAllCountry(data);
        setAllCountryCopy(data);
    }

    const onChangeSeachCountry = () => {
        const searchInput = document.getElementById('search-counrty');
        const filteredCountriesByName = allCountryCopy.filter((country) => {
            if (country.name.toLowerCase().includes(searchInput.value)) {
                return country;
            };
        })
        setAllCountry(filteredCountriesByName);
    }

    const onChangeSelectRegion = () => {
        const selectEl = document.getElementById('region');
        const filteredCountriesByRegion = allCountryCopy.filter((country) => {
            if (country.region.toLowerCase().includes(selectEl.value)) {
                return country;
            }
        })
        setAllCountry(filteredCountriesByRegion);
    }

    return <div className="padding-x">
        <div className='search-container'>
            <input id="search-counrty" type="text" placeholder='Search for a country' onChange={onChangeSeachCountry} />
            <select defaultValue={'DEFAULT'} name="region" id="region" onChange={onChangeSelectRegion}>
                <option disabled value="DEFAULT">Filter By Region</option>
                <option value="africa">Africa</option>
                <option value="america">America</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="oceania">Oceania</option>
            </select>
        </div>
        <div>
            {allCountry.map((country) => {
                return <Link to={`/${country.name}`} key={country.alpha3Code}><div >{country.name}</div></Link>
            })}
        </div>
    </div>
}

export default Home;