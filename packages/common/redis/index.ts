import Redis from 'ioredis'
import secrets from "@repo/secrets"
const redis = new Redis({
    path : secrets.REDIS_URL
})

export default redis;