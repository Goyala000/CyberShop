import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.bgYellow.underline.black)
    } catch (err) {
        console.error(`Error: ${err.message}`.red)
        process.exit(1);
    }
}

export default connectDB;