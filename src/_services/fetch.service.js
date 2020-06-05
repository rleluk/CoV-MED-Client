import { authenticationService } from "./authentication.service";

export const fetchService = {
    getData,
    putData,
    deleteData
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

async function putData(endPoint, body = null) {
    let res = body ? (
        await fetch(process.env.REACT_APP_SERVER + endPoint, { 
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${authenticationService.authToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    ) : (
        await fetch(process.env.REACT_APP_SERVER + endPoint, { 
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${authenticationService.authToken}`
            }
        })
    )

    return res.status === 200;
}

async function deleteData(endPoint, body) {
    let res = await fetch(process.env.REACT_APP_SERVER + endPoint, { 
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${authenticationService.authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    return res.status === 200;
}