/**
 * Created by hungvx's author on 16/10/2019.
 * src/routes/api.js
 * use server5.js for fetch, axios
 */
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

//const fetch2 = require("fetch")
// const fetchUrl = require("fetch").fetchUrl;
/**
 * Init all APIs on your application
 * @param {*} app from express
 */

const retailAPIs = (app) => {
    app.get("/home", function (req, res) {
        res.json({ mess: "home" });
    });
    app.post("/login", function (req, res) {
        res.json({ mess: "login from api web retail" });
    });
    // GET
    // npm fetch
    // fetchUrl("https://jsonplaceholder.typicode.com/todos/1", function (error, meta, body) {
    //     console.log(body.toString());
    // });

    // fetch
    //     .fetchUrl("https://jsonplaceholder.typicode.com/todos/1")
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log(data); // Prints result from `response.json()` in getRequest
    //     })
    //     .catch((error) => console.error(error));

    // async function check() {
    //     const data = await fetch("https://jsonplaceholder.typicode.com/todos/1")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data); // Prints result from `response.json()` in getRequest
    //         })
    //         .catch((error) => console.error(error));
    // }
    // check();

    // npm node-fetch

    app.get("/get", async (req, res) => {
        // Promise then
        // fetch("https://jsonplaceholder.typicode.com/todos/1")
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data); // Prints result from `response.json()` in getRequest
        //         res.json(data);
        //     })
        //     .catch((error) => console.error(error));

        // async/await
        const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        const result = await data.json();
        console.log(result);
        return res.json(result);
    });

    async function fetchMoviesJSON() {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        const movies = await response.json();
        return movies;
    }
    const testData = fetchMoviesJSON();
    console.log(testData);
    fetchMoviesJSON().then((movies) => {
        console.log(movies); // fetched movies
    });

    return app.use("/", router); //default
    // app.use("/common", importRouter); // đưa luôn vào server.js or export thành function, call và pass app tại server.js
    // return app.use("/retail", router); // not http://localhost:3000/retail/home
};

module.exports = retailAPIs;
