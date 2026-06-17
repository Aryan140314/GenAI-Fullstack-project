const mongoose = require("mongoose")



async function connectToDB() {

    try {
        const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI

        if (!mongoUri) {
            throw new Error("MONGO_URI or MONGODB_URI is required in backend/.env")
        }

        await mongoose.connect(mongoUri)

        console.log("Connected to Database")
    }
    catch (err) {
        console.error(err)
        throw err
    }
}

module.exports = connectToDB
