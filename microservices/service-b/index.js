const express = require('express');
const client = require('prom-client');

const app = express();
const register = new client.Registry();

// Collect default metrics
client.collectDefaultMetrics({ register });

app.get('/', (req, res) => {
  res.json({ service: 'A', status: 'running' });
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

const port = 3000;
app.listen(port, () => {
  console.log(`Service A listening on port ${port}`);
});
