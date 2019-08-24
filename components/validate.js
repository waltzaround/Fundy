import Axios from "axios";

const ValidateCharity = (registerationNumber) => {
    registerationNumber = 'CC49286'
    let url = "https://cors-anywhere.herokuapp.com/http://www.odata.charities.govt.nz/Organisations?$filter=CharityRegistrationNumber eq '" + registerationNumber + "'&$format=json";
    
    let status = '';

    Axios.get(url).then(function (response) {
        let data = JSON.parse(response.request.response);
        status = (data.d[0]['RegistrationStatus']);
    })

    return status;
};

export default ValidateCharity;