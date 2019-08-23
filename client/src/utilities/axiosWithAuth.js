import axios from 'axios';

export const axiosWithAuth= () => {
    const token = localStorage.getItem("token")

    return axios.create({
        headers: {
            "content": "application/json",
            Authorization: `${token}`
        }
    })
}