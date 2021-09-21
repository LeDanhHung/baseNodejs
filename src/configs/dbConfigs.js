import mongoose from "mongoose";

const connectDatabase = () => {
    const mongoDbUrl = `${process.env.DB}`;
    console.log(`Connecting to ${mongoDbUrl}`);
    mongoose.Promise = global.Promise;
    // Connecting to the database
    mongoose
        .connect(mongoDbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Kết nối database thành công");
        })
        .catch((err) => {
            console.log(`Kết nối database thất bại. Exiting now...\n${err}`);
            process.exit();
        });
};

export default connectDatabase;