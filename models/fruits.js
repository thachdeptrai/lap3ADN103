const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Sử dụng Schema từ mongoose

// Định nghĩa schema người dùng
const Fruits = new Schema({
  name: { type: String },   
  quantity: { type: Number },   
  price: { type: Number  },  
  status: { type: Number  }, 
  image: { type: Array },  
  description: { type: String },  
  id_distributor: { type: Schema.Types.ObjectId, ref: 'distributor' }   
}, {
  timestamps: true  // Tạo trường `createdAt` và `updatedAt`
});

// Export model
module.exports = mongoose.model('fruits', Fruits);
