// config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Kết nối đến MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/MD19304', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,  
    });
    console.log('Kết nối MongoDB thành công');
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error.message);
    process.exit(1); // Thoát nếu kết nối thất bại
  }
};

// Xuất hàm connectDB để dùng trong các file khác
module.exports = connectDB;
