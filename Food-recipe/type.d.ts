export interface Recipe {
  _id: string;
  id_recipe: string; // Mã công thức
  title: string; // Tiêu đề món ăn
  image: string; // Đường dẫn ảnh (hoặc URL ảnh)
  type: [string]; // Loại món (món chính, tráng miệng,...)
  duration: number; // Thời gian nấu (phút)
  author: string; // Tên người đăng
  number_of_ingredients: number; // Số lượng nguyên liệu
  ingredients: string; // Danh sách nguyên liệu
  formula: string; // Các bước nấu ăn
  description: string; // Mô tả món ăn
  title_normalized: string;
}
