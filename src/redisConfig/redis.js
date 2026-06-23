import { createClient } from "redis";

export const redisClient = createClient();

redisClient.on("connect", () => {
  console.log("🔄 Redis connecting...");
});

redisClient.on("ready", () => {
  console.log("✅ Redis is ready");
});

redisClient.on("error", (error) => {
  console.error("❌ Redis client error:", error);
});

export const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (error) {
    console.error("❌ Failed to connect to Redis:", error);
    throw error;
  }
};
