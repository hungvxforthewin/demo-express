const mongoose = require("mongoose");

const connect = async () => {
    const result = await mongoose.connect("mongodb://localhost/Test1");
    // .then(() => {
    //     console.log(`Database connected`);
    // })
    // .catch((err) => {
    //     console.log(`Database not connected, error: ${err}`);
    // });
    //console.log(result);
    console.log("connected mongodb");
};

module.exports = {
    connectDatabase: connect,
};
