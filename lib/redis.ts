import { Redis } from "@upstash/redis";

const URL = "https://hot-mantis-50070.upstash.io";

export const redis = new Redis({
  url: URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
