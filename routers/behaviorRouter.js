/**
 * Created by hungvx's author on 16/10/2019.
 * src/routes/api.js
 * use server5.js for fetch, axios
 */
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const FormData = require("form-data");

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

    // POST
    app.post("/retail-login", async (req, res) => {
        const data = {
            UserName: "kinretail.test",
            Password: "KINRetail@test",
            RememberMe: true,
        };
        const result = await fetch("https://rentail.shopd7pro.com/api/Account", {
            credentials: "same-origin", // 'include', default: 'omit'
            method: "POST", // 'GET', 'PUT', 'DELETE', etc.
            body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json;charset=UTF-8",
            },
        });
        const dataJson = await result.json();
        console.log(dataJson);
        res.json(dataJson);
    });

    app.post("/rentail/bao-cao-1", async (req, res) => {
        const data = {
            TuNgay: "01/05/2022",
            DenNgay: "11/05/2022",
            PageIndex: 1,
            PageSize: 10,
            LOC_ID: "ALL",
            Term: "",
            VENDOR_ID: "ALL",
        };
        let formData = new FormData();
        formData.append("TuNgay", "01/05/2022");
        formData.append("DenNgay", "11/05/2022");
        formData.append("PageIndex", "1");
        formData.append("PageSize", "10");
        formData.append("LOC_ID", "ALL");
        formData.append("Term", "");
        formData.append("VENDOR_ID", "ALL");
        const result = await fetch("https://rentail.shopd7pro.com/api/BangKe/NhapHangSi", {
            credentials: "same-origin", // 'include', default: 'omit'
            method: "POST", // 'GET', 'PUT', 'DELETE', etc.
            body: formData, // Coordinate the body type with 'Content-Type'
            headers: {
                // Accept: "application/json, text/plain",
                // "Content-Type": "application/json;charset=UTF-8",
                // "Content-Type": "application/x-www-form-urlencoded",
                // "Content-Type": "application/form-data",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJREFjY1Nlc3Npb24iOiI1NyIsIlBhc3N3b3JkIjoiQTUxMTQ1REJCNEQyQzhDRTU0RkEzOTNBOUFBRkNBMTAiLCJDb25uZWN0aW9uU3RyaW5nIjoiRGF0YSBTb3VyY2U9MjAyLjkyLjQuMTYxXFxNU1NRTFNFUlZFUjIwMTQsMTQzNDtJbml0aWFsIENhdGFsb2c9ZDdfS0lOUkVOVEFJTDtVc2VyIElkPWQ3cHJvO1Bhc3N3b3JkPWlOM0BUT0NIcFlYTGRTaztNYXggUG9vbCBTaXplPTEwMDA7IENvbm5lY3QgVGltZW91dD03MjAwMDtQb29saW5nPXRydWU7IiwiR2F0ZXdheUtleSI6Ijc1YWEwNTAxMGZjMDcxMzExZTZlYjRiNjRhNzNhMjlmIiwiUmVtZW1iZXIiOiIxIiwiZXhwIjoxNjUyODU2Mjk5fQ.5Y9SBLWd96tC_tHwFXlDpORhMhdWNRokpjeuSnUi7Jg",
            },
            "Content-Type": "application/form-data",
        });
        const dataJson = await result.json();
        //console.log(dataJson);
        res.json(dataJson);
    });

    return app.use("/", router); //default
    // app.use("/common", importRouter); // đưa luôn vào server.js or export thành function, call và pass app tại server.js
    // return app.use("/retail", router); // not http://localhost:3000/retail/home
};

module.exports = retailAPIs;
