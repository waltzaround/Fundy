import Axios from "axios";

class ValidateCharity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: '',
            userInput: '',
            totalExpenditure: '',
            coordinates: ''
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async getStatus(registerationNumber) {
        let url = "https://cors-anywhere.herokuapp.com/http://www.odata.charities.govt.nz/Organisations?$filter=CharityRegistrationNumber eq '" + registerationNumber + "'&$format=json";
        let data = [];
        let financial = [];

        await Axios.get(url).then(function (response) {
            data = JSON.parse(response.request.response);
        });

        let suburb = data.d[0]['StreetAddress_suburb'];
        let city = data.d[0]['StreetAddress_city'];
        let location = suburb + ',' + city;

        await Axios.get("https://cors-anywhere.herokuapp.com/" + data.d[0]['AnnualReturn']['__deferred']['uri']).then(function (response) {
            let length = response.data.d.length;
            financial = response.data.d[length - 1]['TotalExpenditure']; 
        });

        this.setState({status: data.d[0]['RegistrationStatus'], totalExpenditure: financial});
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
    };

    handleInput = (e) => {
        this.setState({userInput: e.target.value});
    };

    handleClick() {
        this.getStatus(this.state.userInput);
    };

    render() {
        return(
            <React.Fragment>
                Charity ID:<input type="text" onChange={this.handleInput}></input>
                <input type="submit" onClick={this.handleClick}></input>

                <p>Current Status: {this.state.status}</p>
                <p>Last Total Expenditure: {this.state.totalExpenditure}</p>
                <p>Geographical Coordinates: {this.state.coordinates}</p>
            </React.Fragment>
        );
    };
};

export default ValidateCharity;