import axios from 'axios';


//Build axiosWithAuth module = authentication header 

export const axiosWithAuth= () => {
    const token = localStorage.getItem("token")

    return axios.create({
        headers: {
            "content": "application/json",
            Authorization: `${token}`
        }
    })
}