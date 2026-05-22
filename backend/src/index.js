const express = require('express');
const cors = require('cors');
const roomRoutes = require('./routes/roomRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use('/api', roomRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});
// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.resolve(__dirname, '../../frontend/dist');
  app.use(express.static(staticPath));

}


// Start server
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});

