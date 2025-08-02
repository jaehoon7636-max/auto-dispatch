const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const orderRoutes = require('./routes/orders');
const driverRoutes = require('./routes/drivers');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/auto_dispatch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB 연결 성공"))
  .catch(err => console.error("❌ MongoDB 연결 실패:", err));

app.use('/orders', orderRoutes);
app.use('/drivers', driverRoutes);

app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});