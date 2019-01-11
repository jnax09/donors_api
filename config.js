module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://jnax09:jnax09@ds151383.mlab.com:51383/donors-api',
    JWT_SECRET: process.env.JWT_SECRET || 'mySecret'
}