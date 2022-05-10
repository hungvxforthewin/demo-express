const demoRouter = require("./demoRouting");
const apiRouter = require("./apiRouter");
const accountRouter = require("./accountRouter");
const fakeDataRouter = require("./fakeDataRouter");
const homeRouter = require("./homeRouter");
const corsRouter = require("./corsRouter");
const demoJwtRouter = require("./demoJwtRouter");
const demoTokenRouter = require("./demoAccessRefeshTokenRouter");
const behaviorRouter = require("./behaviorRouter");

module.exports = {
    demoRouter: demoRouter,
    apiRouter: apiRouter,
    accountRouter: accountRouter,
    fakeDataRouter,
    homeRouter,
    corsRouter,
    demoJwtRouter,
    demoTokenRouter,
    behaviorRouter
};
