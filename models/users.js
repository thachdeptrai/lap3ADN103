const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Sử dụng Schema từ mongoose

// Định nghĩa schema người dùng
const Users = new Schema({
  username: { type: String, unique: true, maxLength: 255 },  // Tên người dùng, duy nhất, dài tối đa 255 ký tự
  password: { type: String, maxLength: 255 },  // Mật khẩu, dài tối đa 255 ký tự
  email: { type: String, unique: true },  // Email, duy nhất
  name: { type: String },  // Tên người dùng
  avatar: { type: String },  // Đường dẫn ảnh đại diện
  available: { type: Boolean, default: false }  // Trạng thái có sẵn (mặc định là false)
}, {
  timestamps: true  // Tạo trường `createdAt` và `updatedAt`
});

// Export model
module.exports = mongoose.model('User', Users);
