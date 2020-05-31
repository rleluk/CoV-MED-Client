import { authenticationService } from "./authentication.service";

export const fetchService = {
    getData
};

async function getData(endPoint) {
    let res = await fetch(process.env.REACT_APP_SERVER + endPoint, { 
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authenticationService.authToken}`,
        }
    });

    if(res.status === 200) {
        let data = await res.json();
        return data;
    }
}