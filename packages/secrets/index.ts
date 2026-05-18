import dotenv from 'dotenv'

dotenv.config({
    path : "../../.env"
})

const secrets = {
    PORT : process.env.PORT || 4000,
    NODE_ENV : process.env.NODE_ENV || "development",
    DATABASE_URL : process.env.DATABASE_URL || "",
    JWT_SECRET : process.env.JWT_SECRET || "dammmmm_secret",
    GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET || "",
    GOOGLE_AUTH_REDIRECT_URL : process.env.GOOGLE_AUTH_REDIRECT_URL || "http://localhost:4000/api/auth/google/callback",
    REDIS_URL : process.env.REDIS_URL
}

export default secrets