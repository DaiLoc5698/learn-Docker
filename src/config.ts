export default {
  redis: {
    addr: process.env.REDIS_ADDR,
    port: Number.parseInt(process.env.REDIS_PORT)
  },
}