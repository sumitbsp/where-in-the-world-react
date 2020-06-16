import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    useParams
} from "react-router-dom";

class Country extends React.Component {
    constructor(...props) {
        super();
        this.state = { data: {}, borders: [], value: 0 }
    }

    fetchCountry = async () => {
        const data = await (await fetch(`https://restcountries.eu/rest/v2/name${this.props.match.url}?fullText=true`)).json();
        console.log(data)
        console.log('fetch country is called')
        this.setState({ data: data[0] }, console.log(this.state.data))
    }

    getBorderFullName = async () => {
        this.setState({ borders: [] })
        this.state.data.borders.map(async (border) => {
            const fetchBorder = await (await fetch(`https://restcountries.eu/rest/v2/alpha/${border}`)).json();
            console.log(fetchBorder.name)
            this.setState((prevState) => ({
                borders: [...(prevState.borders || []), fetchBorder.name]
            }))
        })
    }

    async componentDidMount() {
        await this.fetchCountry()

        this.getBorderFullName()
        console.log(this.props.match)
    }

    handleClick = () => {
        this.forceUpdate();
    }

    async componentWillReceiveProps() {
        await this.setState({ data: {} }, console.log(this.state.data));
        await this.fetchCountry()
        this.getBorderFullName()
    }

    render() {
        return <div className="padding-x" >
            <Link to={"/"}><button>Back</button></Link>
            <div className="main-container">
                <div className="flex-container">
                    <img className="country-flag" src={this.state.data.flag} alt="" width="400px" />
                </div>
                <div className="flex-container">
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



                    <div className="border-container">
                        <p>
                            <span>Border Countries: </span>
                            {this.state.data.borders &&
                                this.state.borders.map((border) => {
                                    return <Link className="border" key={border} to={`/${border}`}>{border}
                                    </Link>
                                })
                            }
                        </p>
                    </div>
                </div>

            </div>

        </div >
    }
}

export default Country;