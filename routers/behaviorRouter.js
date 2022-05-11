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
    // GET
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
        // console.log(result); // Promise ??
        return res.json(result);
    });

    // async/await function
    // async function fetchMoviesJSON() {
    //     const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    //     const movies = await response.json();
    //     return movies;
    // }
    // const testData = fetchMoviesJSON();
    // console.log(testData);
    // fetchMoviesJSON().then((movies) => {
    //     console.log(movies); // fetched movies
    // });

    app.get("/get-test", async (req, res) => {
        async function fetchMoviesJSON() {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
            const movies = await response.json();
            return movies;
        }
        const testData = await fetchMoviesJSON(); //Promise get data (await, then())
        console.log(testData);
        return res.json(testData);
    });

    // HANDLE ERROR
    app.get("/get-handle-error", async (req, res) => {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/aaa");
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            //throw new Error(message);
            return res.json(message);
        }
        const movies = await response.json();
        return res.json(movies);
    });

    app.get("/get-handle-error-test", async (req, res) => {
        async function fetchMoviesBadStatus() {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos/aaa");
            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                //throw new Error(message);
                //return res.json(message);
                return Promise.reject(message);
            } else {
                const movies = await response.json();
                return Promise.resolve(movies);
            }
        }
        function fetchMoviesBadStatus2() {
            // not async
            return new Promise(async (resolve, reject) => {
                const response = await fetch("https://jsonplaceholder.typicode.com/todos/aaa");
                if (!response.ok) {
                    const message = `An error has occured: ${response.status}`;
                    //throw new Error(message);
                    //return res.json(message);
                    console.log("ERROR");
                    return reject(message);
                } else {
                    const movies = await response.json();
                    return resolve(movies);
                }
            });
        }
        const testData = fetchMoviesBadStatus2(); //Promise get data (await, then())
        testData
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log("catch!");
                res.json(err);
            });
    });

    // Parallel fetch request
    app.get("/get-parallel", async (req, res) => {
        async function fetchMoviesAndCategories() {
            const [moviesResponse, categoriesResponse] = await Promise.all([fetch("https://jsonplaceholder.typicode.com/todos/1"), fetch("https://jsonplaceholder.typicode.com/todos/2")]);
            const movies = await moviesResponse.json();
            const categories = await categoriesResponse.json();
            return [movies, categories];
        }
        fetchMoviesAndCategories()
            .then(([movies, categories]) => {
                console.log(movies, categories);
                //res.json( movies, categories ); //  false because not object
                //res.json({ movies, categories }); // fetched object
                res.json([movies, categories]); // fetched array
            })
            .catch((error) => {
                // /movies or /categories request failed
            });
    });

    return app.use("/", router); //default
    // app.use("/common", importRouter); // đưa luôn vào server.js or export thành function, call và pass app tại server.js
    // return app.use("/retail", router); // not http://localhost:3000/retail/home
};

module.exports = retailAPIs;
