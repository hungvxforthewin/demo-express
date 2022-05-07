const demoRouter = require("./demoRouting");
const apiRouter = require("./apiRouter");
const accountRouter = require("./accountRouter");
const fakeDataRouter = require("./fakeDataRouter");
const homeRouter = require("./homeRouter");

module.exports = {
    demoRouter: demoRouter,
    apiRouter: apiRouter,
    accountRouter: accountRouter,
    fakeDataRouter,
    homeRouter
};
