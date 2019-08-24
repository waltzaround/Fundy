import Axios from "axios";

class ValidateCharity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 'Null',
            userInput: ''
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

        console.log(data);

        await Axios.get("https://cors-anywhere.herokuapp.com/" + data.d[0]['AnnualReturn']['__deferred']['uri']).then(function (response) {
        let length = response.data.d.length;
        financial = response.data.d[length - 1]['TotalExpenditure']; 
        });

        this.setState({status: data.d[0]['RegistrationStatus'], totalExpenditure: financial});
    }

    handleInput = (e) => {
        this.setState({userInput: e.target.value});
    }

    handleClick() {
        console.log(this.state.userinput);
        this.getStatus(this.state.userInput);
    }

    render() {
        return(
            <React.Fragment>
                <input type="text" onChange={this.handleInput}></input>
                <input type="submit" onClick={this.handleClick}></input>

                <p>Current Status: {this.state.status}</p>
                <p>Last Total Expenditure: {this.state.totalExpenditure}</p>
            </React.Fragment>
        );
    };
};

export default ValidateCharity;