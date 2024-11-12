var express = require('express');
var router = express.Router();

const Distributors = require('../models/distributors');
const Fruits = require('../models/fruits');

// API thêm distributor
router.post('/add-distributor', async (req, res) => {
  try {
    const data = req.body; // Lấy dữ liệu từ body
    const newDistributors = new Distributors({
      name: data.name
    }); // Tạo một đối tượng mới

    const result = await newDistributors.save(); // Thêm vào database

    if(result) {
      // Nếu thêm thành công, result != null và trả về dữ liệu
      res.json({
        "status": 200,
        "messenger": "Thêm thành công",
        "data": result
      });
    } else {
      // Nếu thêm không thành công result null, thông báo không thành công
      res.json({
        "status": 400,
        "messenger": "Lỗi, thêm không thành công",
        "data": []
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
// API thêm fruit
router.post('/add-fruit', async (req, res) => {
  try {
    const data = req.body; // Lấy dữ liệu từ body
    const newFruit = new Fruits({
      name: data.name,
      quantity: data.quantity,
      price: data.price,
      status: data.status,
      image: data.image,
      description: data.description,
      id_distributor: data.id_distributor
    }); // Tạo một đối tượng mới

    const result = await newFruit.save(); // Thêm vào database

    if(result) {
      // Nếu thêm thành công, result != null và trả về dữ liệu
      res.json({
        "status": 200,
        "messenger": "Thêm thành công",
        "data": result
      });
    } else {
      // Nếu thêm không thành công result null, thông báo không thành công
      res.json({
        "status": 400,
        "messenger": "Lỗi, thêm không thành công",
        "data": []
      });
    }
  } catch (error) {
    console.log(error);
  }
});
// API lấy danh sách fruits
router.get('/get-list-fruit', async (req, res) => {
  try {
    const fruits = await Fruits.find(); // Tìm tất cả các fruits trong database
      res.json({
        "status": 200,
        "messenger": "Lấy danh sách thành công",
        "data": fruits
      });
  } catch (error) {
    console.log(error);
  }
});
router.get('/get-list-fruit-by-id/:id', async (req, res) => {
  try {
    const {id} =req.params
    const fruits = await Fruits.findById(id).populate('id_distributor'); // Tìm tất cả các fruits trong database
      res.json({
        "status": 200,
        "messenger": "Lấy danh sách thành công",
        "data": fruits
      });
  } catch (error) {
    console.log(error);
  }
});
// API lấy danh sách fruits với bộ lọc giá và sắp xếp theo quantity
router.get('/get-list-fruits-in-price', async (req, res) => {
  try {
    // Lấy giá trị query từ request
    const { minPrice, maxPrice } = req.query;

    // Xây dựng điều kiện lọc dựa trên khoảng giá
    const filter = {
      price: { $gte: minPrice  , $lte: maxPrice } // Lọc theo giá trong khoảng minPrice và maxPrice
    };

    // Tìm và lọc fruits theo điều kiện, chỉ lấy các trường cần thiết và sắp xếp theo quantity giảm dần
    const fruits = await Fruits.find(filter, 'name quantity price id_distributor')
    .populate('id_distributor')
      .sort({ quantity: -1 })
      .skip(0)
      .limit(2) // Lấy 2 fruits đầu tiên
      res.json({
        "status": 200,
        "messenger": "Lấy danh sách thành công",
        "data": fruits
      });
  } catch (error) {
    console.log(error);
  }
});
// API lấy danh sách fruits với tên bắt đầu bằng "A" hoặc "X"
router.get('/fruits', async (req, res) => {
  try {
    // Tạo bộ lọc để lấy các fruits có tên bắt đầu bằng "A" hoặc "X"
    const filter ={$or:[ 
      { name: { $regex: 'T'}},
      { name: { $regex: 'X'}}, // Biểu thức chính quy để tìm tên bắt đầu bằng "A" hoặc "X"
      ]}

    // Tìm và lọc fruits theo điều kiện, chỉ lấy các trường cần thiết
    const fruits = await Fruits.find(filter, 'name quantity price id_distributor');
      res.json({
        "status": 200,
        "messenger": "Lấy danh sách thành công",
        "data": fruits
      })
  } catch (error) {
    console.log(error);
  }
});
// API cập nhật fruit
router.put('/update-fruit-by-id/:id', async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ params
    const data = req.body; // Lấy dữ liệu từ body
    const updatefruit = await Fruits.findById(id); // Tìm fruit theo ID
    let result = null;

    if (updatefruit) {
      // Cập nhật các trường nếu có dữ liệu mới
      updatefruit.name = data.name ?? updatefruit.name;
      updatefruit.quantity = data.quantity ?? updatefruit.quantity;
      updatefruit.price = data.price ?? updatefruit.price;
      updatefruit.status = data.status ?? updatefruit.status;
      updatefruit.image = data.image ?? updatefruit.image;
      updatefruit.description = data.description ?? updatefruit.description;
      updatefruit.id_distributor = data.id_distributor ?? updatefruit.id_distributor;

      // Lưu lại cập nhật vào database
      result = await updatefruit.save();
    }
      // Kiểm tra kết quả lưu
      if (result) {
        res.json({
          "status": 200,
          "messenger": "Cập nhật thành công",
          "data": result
        });
      } else {
        res.json({
          "status": 400,
          "messenger": "Lỗi, cập nhật không thành công",
          "data": []
        });
      }
  } catch (error) {
    console.log(error);
  }
});
