import React, {Component} from "react";
import axios from 'axios';
import './ZipSearch.css';

class ZipSearch extends Component {
    constructor() {
        super();
        this.state = this.initialState;

        this.handleChange = this.handleChange.bind(this);
    }

    get initialState() {
        return {
            // variables that we assign from API
            zipCode: "",
            stateName: "",
            cityName: "",
            locationText: "",
            latitude: "",
            longitude: "",
            population: "",
            wages: "",

            // used in conditional rendering
            showInfo: false,
        };
}


resetState() { //go back to initial state
    this.setState(this.initialState);
}

handleChange(event){
    this.setState({ zipCode: event.target.value });
}

componentDidUpdate() {
    if(this.state.zipCode.length !== 5) { //zip codes only 5 numbers long
        if(this.state.showInfo === true) //check if showing any info
            this.setState({showInfo: false});
    }

    else { //zip code is 5 numbers so run the request
        axios.get("http://ctp-zip-api.herokuapp.com/zip/" + this.state.zipCode).then((response) => {
            const data = response.data;

            console.log(data); //test

            const newZipSearchObj = { //obj, hold info
                stateName: data[0].State,
                cityName: data[0].City,
                locationText: data[0].LocationText,
                latitude: data[0].Lat,
                longitude: data[0].Long,
                population: data[0].EstimatedPopulation,
                wages: data[0].TotalWages,
                showInfo: true,
            };

            this.setState(newZipSearchObj); //update variables
            console.log(this.state.population);
        }).catch((err) => console.log(err)); //catching error
    }
}

render() {
    return (
        <div>
        <div>
            {/* A Test */}
        </div>
        <label>Zip Code:</label>
        {/* label makes text next to input field */}
        <input
        // text field
            className="zipcode_input"
            type="text"
            name="zipcode"
            value={this.state.zipCode}
            placeholder="Try 10016"
            onChange={this.handleChange.bind(this)}
           
            />

            <div className="locationInfo_container">
                {/* if data is retrieved, display data. Otherwise hide li */}
                {this.state.showInfo ?

                    <div className="locationInfo">
                
                
                <ul> 

                <h1>{this.state.locationText}</h1>
                {/* heading inside the box^^ */}
                    <li>State: {this.state.stateName}</li>
                    <li>Location: ({this.state.latitude}, {this.state.longitude})</li>

                    {this.state.population ? <li>Population (estimated): {this.state.population}</li>: ""}

                    {this.state.wages ? <li>Total Wages: {this.state.wages}</li>: ""}

                </ul> 
            </div>
            : <p className="p_info">No Results</p>
        }
        </div>

        </div>
        
    );//end of return
}//end of render

}//end of class
export default ZipSearch;