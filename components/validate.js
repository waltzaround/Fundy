
import React from 'react';
import Axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import DeckGL from '@deck.gl/react';
import {LineLayer} from '@deck.gl/layers';
import CircularProgress from '@material-ui/core/CircularProgress';

class ValidateCharity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: '',
            userInput: '',
            totalExpenditure: '',
            coordinates: '',
            summary: '',
            accountID: '',
            display: true,
            loading: false
        };
        
        this.handleInput = this.handleInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async getStatus(registerationNumber) {
        this.setState({loading: true});
        let url = "https://cors-anywhere.herokuapp.com/http://www.odata.charities.govt.nz/Organisations?$filter=CharityRegistrationNumber eq '" + registerationNumber + "'&$format=json";
        let data = [];
        let financial = [];

        await Axios.get(url).then(function (response) {
            data = JSON.parse(response.request.response);
        });

        let accountID = data.d[0]['AccountId'];

        let suburb = data.d[0]['StreetAddress_suburb'];
        let city = data.d[0]['StreetAddress_city'];
        let location = suburb + ',' + city;

        await Axios.get("https://cors-anywhere.herokuapp.com/" + data.d[0]['AnnualReturn']['__deferred']['uri']).then(function (response) {
            let length = response.data.d.length;
            financial = response.data.d[length - 1]['TotalExpenditure']; 
        });

        this.setState({status: data.d[0]['RegistrationStatus'], totalExpenditure: financial, accountID: accountID});
        this.getCoordinates(location);
    };

    async getCoordinates(location) {
        let KEY = 'a4325464eaf44281b00a9515f9034720';
        let url = 'https://api.opencagedata.com/geocode/v1/json?q=' + location + '&key=' + KEY;
        let coordinates = '';

        await Axios.get("https://cors-anywhere.herokuapp.com/" + url).then(function (response) {
            let lat = response.data.results[0]['geometry']['lat'];
            let long = response.data.results[0]['geometry']['lng'];
            coordinates = lat + ', ' + long;
        });

        this.setState({coordinates: coordinates});
        this.getSummary();
    };

    async getSummary() {
        let url = 'https://www.register.charities.govt.nz/CharitiesRegister/ViewCharity?accountId=' + this.state.accountID;
        let final = '';

        await Axios.get("https://cors-anywhere.herokuapp.com/" + url).then(function (response) {
            let firstSplit = (response.request.response.split("Charitable Purpose")[1]);
            let secondSplit = firstSplit.split("</span>")[0];
            let thirdSplit = secondSplit.split('class="wordWrap">')[1];

            final = thirdSplit;
        });

        this.setState({summary: final, display: false, loading: false});
    }

    handleInput = (e) => {
        this.setState({userInput: e.target.value});
    };

    handleClick() {
        this.getStatus(this.state.userInput);
    };

    render() {
        return(
            <React.Fragment>
                <div style={{backgroundColor: '#FFF', width: '100%', height: '100%', position: 'absolute'}}>
                    <div style={{position: 'absolute', left: '45%', top: '25%', width: 'auto'}}>
                            <React.Fragment>
                                <FormControl>
                                <TextField label="Charity ID" variant="outlined" value={this.state.userInput} onChange={this.handleInput}/>
                                <Button onClick={this.handleClick} variant="outlined" style={{marginTop: '2%'}}>
                                    Search
                                </Button>
                            </FormControl>
                            <br/>

                        {this.state.loading ? <div style={{position: 'absolute', left: '42.5%', top: '115%', width: 'auto'}}><CircularProgress /></div> :
                            <React.Fragment>
                                {this.state.display ? '' :
                                    <div style={{position: 'fixed', marginTop: '3%', marginLeft: '-10%'}}>
                                    <TextField label="Status" value={this.state.status} style={{width: '33%', marginRight: '3%'}}></TextField>
                                    <TextField label="Total Expenditure" value={'$' + this.state.totalExpenditure} style={{width: '27%'}}></TextField>
                                    <TextField label="Geographical Coordinates" value={this.state.coordinates} style={{width: '33%', marginLeft: '3%'}}></TextField>
                                    <br/>
                                    <TextField multiline={true} rows="4" label="Summary" value={this.state.summary} style={{width: '100%', marginTop: '2%'}}></TextField>
                                </div>}
                            </React.Fragment>}
                        </React.Fragment>
                    </div>
                </div>

            </React.Fragment>
        );
    };
    
};

export default ValidateCharity;