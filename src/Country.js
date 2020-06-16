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
        this.setState({ data: data[0] })
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

    async componentWillMount() {
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
            <button><Link to={"/"}>Back</Link></button>
            <h1>{this.state.data.name}</h1>
            <p>Capital: {this.state.data.capital} </p>
            <img src={this.state.data.flag} alt="" width="400px" />
            <div className="borders">
                {this.state.data.borders &&
                    this.state.borders.map((border) => {
                        return <div key={border}><Link
                            to={`/${border}`}>{border}
                        </Link></div>
                    })
                }
            </div>
        </div >
    }
}

export default Country;