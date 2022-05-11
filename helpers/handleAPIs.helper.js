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
        // const data = {
        //     TuNgay: "01/05/2022",
        //     DenNgay: "11/05/2022",
        //     PageIndex: 1,
        //     PageSize: 10,
        //     LOC_ID: "ALL",
        //     Term: "",
        //     VENDOR_ID: "ALL",
        // };
        // let formData = new FormData();
        // formData.append("TuNgay", "01/05/2022");
        // formData.append("DenNgay", "11/05/2022");
        // formData.append("PageIndex", "1");
        // formData.append("PageSize", "10");
        // formData.append("LOC_ID", "ALL");
        // formData.append("Term", "");
        // formData.append("VENDOR_ID", "ALL");
        const response = await fetch(url, {
            credentials: "same-origin", // 'include', default: 'omit'
            method: "POST", // 'GET', 'PUT', 'DELETE', etc.
            body: data, // Coordinate the body type with 'Content-Type', form-data
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
