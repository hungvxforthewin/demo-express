/**
 * Created by hungvx's author on 16/10/2019.
 * src/helpers/handleAPIs.helper.js
 * use server5.js for fetch, axios
 * method
 * Content-Type (body)
 * headers
 */
// https://dmitripavlutin.com/javascript-fetch-async-await/

const fetch = require("node-fetch");
const FormData = require("form-data");

const getFetch = (url, option = {}) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(url, option);
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            //throw new Error(message);
            //return res.json(message);
            return reject(message);
        } else {
            const data = await response.json();
            return resolve(data);
        }
    });
};

const postFetch = (url, data, token) => {
    return new Promise(async (resolve, reject) => {
        let form_data = new FormData();
        if(Object.keys(data).length > 0){
            for ( var key in data ) {
                form_data.append(key, data[key]);
            }
        }
        const response = await fetch(url, {
            credentials: "same-origin", // 'include', default: 'omit'
            method: "POST", // 'GET', 'PUT', 'DELETE', etc.
            body: form_data, // Coordinate the body type with 'Content-Type', form-data
            headers: {
                // Accept: "application/json, text/plain",
                // "Content-Type": "application/json;charset=UTF-8",
                // "Content-Type": "application/x-www-form-urlencoded",
                // "Content-Type": "application/form-data",
                Authorization: `Bearer ${token}`,
            },
            "Content-Type": "application/form-data",
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            //throw new Error(message);
            //return res.json(message);
            return reject(message);
        } else {
            const data = await response.json();
            return resolve(data);
        }
    });
};

module.exports = {
    getFetch,
    postFetch,
};
