export default () => ({
    mongoURI: `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_URL}/<dbname>?retryWrites=true&w=majority`
});