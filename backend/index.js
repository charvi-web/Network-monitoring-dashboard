const express = require("express");
const client = require("prom-client");
const cors = require("cors");

const app = express();
app.use(cors());

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Custom metrics
const cpuUsage = new client.Gauge({
  name: "cpu_usage_percentage",
  help: "CPU usage in percentage",
});

const memoryUsage = new client.Gauge({
  name: "memory_usage_percentage",
  help: "Memory usage in percentage",
});

// Fake data generator
setInterval(() => {
  cpuUsage.set(Math.random() * 100);
  memoryUsage.set(Math.random() * 100);
}, 3000);

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// Health check
app.get("/", (req, res) => {
  res.send("Network Monitoring Backend is running");
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
