import dotenv from 'dotenv'

dotenv.config({
    path : "../../.env"
})


const ENVS = {
    PORT : process.env.PORT || 4000,
    NODE_ENV : process.env.NODE_ENV || "development",
    DATBASE_URL : process.env.DATBASE_URL || "localhost",
    JWT_SECRET : process.env.JWT_SECRET || "dammmmm_secret"
}

export default ENVS