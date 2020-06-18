import React from 'react';
import './App.css';
import {
    Link,
} from "react-router-dom";

class Country extends React.Component {
    constructor(...props) {
        super();
        // setting the country data in state as data object
        // setting the borders of the country as borders array
        this.state = { data: {}, borders: [], value: 0 }
    }

    // function to fetch single country from rest countries api with the use params passed as props to the component
    fetchCountry = async () => {
        const data = await (await fetch(`https://restcountries.eu/rest/v2/name${this.props.match.url}?fullText=true`)).json();
        this.setState({ data: data[0] })
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1);

    }

    // function that calls the rest countries api with country code name to get full name that will be shown as borders
    getBorderFullName = async () => {
        this.setState({ borders: [] })
        this.state.data.borders.map(async (border) => {
            const fetchBorder = await (await fetch(`https://restcountries.eu/rest/v2/alpha/${border}`)).json();
            this.setState((prevState) => ({
                borders: [...(prevState.borders || []), fetchBorder.name]
            }))
        })
    }

    // calling fetch country when the component mounts
    async componentDidMount() {
        await this.fetchCountry()
        this.getBorderFullName()
    }

    // calling fetch country when user clicks on border countries
    async componentWillReceiveProps() {
        await this.setState({ data: {} });
        await this.fetchCountry()
        this.getBorderFullName()
    }

    /* conditional classNames for dark mode toggle */
    render() {
        return <div className={this.props.uiState === 'light' ? 'light-mode-bg padding-x country-page' : 'dark-mode-bg padding-x country-page'} >
            <Link to={"/"}><button className={this.props.uiState === 'light' ? 'light-mode-el light-mode-button' : 'dark-mode-el dark-mode-button'}><i class="fa fa-long-arrow-left" aria-hidden="true"></i> Back</button></Link>
            <div className="main-container">
                <div className="flex-container">
                    <img className="country-flag" src={this.state.data.flag} alt="" width="400px" />
                </div>
                <div className={this.props.uiState === 'light' ? 'light-mode-bg flex-container' : 'dark-mode-bg flex-container'}>
                    <h2>{this.state.data.name}</h2>
                    <div className="country-details-container">
                        <div>
                            <p><span>Native Name:</span>  {this.state.data.nativeName}</p>
                            <p><span>Population:</span>  {this.state.data.population}</p>
                            <p><span>Region:</span>  {this.state.data.region}</p>
                            <p><span>Sub Region:</span>  {this.state.data.subregion}</p>
                            <p><span>Capital:</span>  {this.state.data.capital}</p>
                        </div>
                        <div>
                            <p><span>Top Level Domain:</span>  {this.state.data.topLevelDomain}</p>
                            <p><span>Currencies:</span> {this.state.data.currencies && this.state.data.currencies[0].name}</p>
                            <p><span>Languages:</span> {this.state.data.languages &&
                                this.state.data.languages.map((language) => {
                                    if (language.name === this.state.data.languages[this.state.data.languages.length - 1].name) {
                                        return language.name;
                                    }
                                    return (language.name + ', ');
                                })
                            }
                            </p>
                        </div>
                    </div>
                    {this.state.borders.length > 0 && <div className="border-container">
                        <p>
                            <span>Border Countries: </span>
                            {this.state.data.borders &&
                                this.state.borders.map((border) => {
                                    return <Link className={this.props.uiState === 'light' ? 'light-mode-el border light-mode-button' : 'dark-mode-el border dark-mode-button'} key={border} to={`/${border}`}>{border}
                                    </Link>
                                })
                            }
                        </p>
                    </div>
                    }
                </div>

            </div>

        </div >
    }
}

export default Country;