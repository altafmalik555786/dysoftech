const cloudinary = require("cloudinary").v2;

const config = () => {

    // Cloudinary Files
    cloudinary.config({
        cloud_name: "dti8kpm5d",
        api_key: "312751717784482",
        api_secret: "a0Mw1XIVPe-EkEflZeKuykb8iHk",
    });

    // Handling the unhandledRejection
    process.on("unhandledRejection", (err) => {
        console.error("Unhandled Promise Rejection:", err);
    });

    // Handling the uncaughtException
    process.on("uncaughtException", (err) => {
        console.error("Uncaught Exception:", err);
    });

};

module.exports = config;
