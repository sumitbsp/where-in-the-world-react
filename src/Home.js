import React, { useState, useEffect } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";

function Home(props) {
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

    return <div className={props.uiState === 'light' ? 'light-mode-bg padding-x' : 'dark-mode-bg padding-x'}>
        <div className='search-container'>
            <input className={props.uiState === 'light' ? 'light-mode-el' : 'dark-mode-el'} id="search-counrty" type="text" placeholder='&#xF002; &nbsp; &nbsp; Search for a country' onChange={onChangeSeachCountry} />
            <select className={props.uiState === 'light' ? 'light-mode-el' : 'dark-mode-el'} defaultValue={'DEFAULT'} name="region" id="region" onChange={onChangeSelectRegion}>
                <option disabled value="DEFAULT">Filter By Region</option>
                <option value="africa">Africa</option>
                <option value="america">America</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="oceania">Oceania</option>
                <option value="">All</option>
            </select>
        </div>
        <div className="countries-container">
            {allCountry.map((country) => {
                return <Link className="country-link" to={`/${country.name}`} key={country.alpha3Code}>
                    <div className={props.uiState === 'light' ? 'light-mode-el country' : 'dark-mode-el country'} >
                        <img src={country.flag} alt="image" />
                        <p className="country-name padding-left">{country.name}</p>
                        <p className="padding-left margin-0"><span>Population:</span> {country.population}</p>
                        <p className="padding-left margin-0"><span>Region:</span> {country.region}</p>
                        <p className="padding-left margin-0"><span>Capital:</span> {country.capital}</p>
                    </div>
                </Link>
            })}
        </div>
    </div>
}

export default Home;