const express = require('express');
const cors = require('cors');
const sequelize = require('./db.config');
const delegateRoutes = require('./delegate.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/delegates', delegateRoutes);

// Database Sync & Start Server
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }) // force: false won't delete existing data
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.error('Failed to sync database: ' + err.message);
  });