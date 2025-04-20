import images from "./images";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
const recipes = [
  {
    id_recipe: uuidv4(),
    title: "Salad trứng trộn",
    image: "saladTrung.jpg",
    duration: "15 phút",
    type: "Vegetable",
    author: "Nguyễn Anh Hoàng",
    number_or_ingredients: 6,
    ingredients: "Dưa leo; Xà lách; Cà chua; Trứng; Sốt mayonnaise ;Đường",
    formula:
      "1. Sơ chế nguyên liệu: Đầu tiên bạn tách từng nhánh lá xà lách ra, bỏ những lá già đi. Ngâm rau với nước muối loãng trong 2 phút rồi rửa sạch lại với nước. Để rau ráo nước rồi cắt rau thành từng khúc dài khoảng 3 - 4cm.; 2. Pha nước trộn salad: Cho vào chén 1 muỗng cà phê đường, vắt lấy nước cốt 3 trái tắc rồi cho vào chén đường. Khuấy đều cho phần đường tan hết.; 3. Trộn salad: Cho tất cả các nguyên liệu gồm rau xà lách, cà chua và dưa leo vào tô lớn. Thêm vào phần sốt tắc đã chuẩn bị cùng 1 ít muối và 1 ít sốt mayonnaise vào tô. Trộn đều cho gia vị quyện vào.; 4. Thành phẩm: Món salad trứng giảm cân beo béo thơm ngon dễ ăn. Bởi đa phần là các loại rau củ nên món ăn chứa nhiều chất xơ sinh năng lượng ít giúp hỗ trợ quá trình ăn thâm hụt Calories của mình đấy.",
    description:
      "Ngoài việc luyện tập thể dục bạn cần xếp cho mình một chế độ ăn lành mạnh và thâm hụt calo. Hôm nay hãy cùng chúng tôi vào bếp làm món Salad trứng giúp hỗ trợ quá trình giảm cân của bạn nhé.",
  },
  {
    id_recipe: uuidv4(),
    title: "Bánh chuối nướng mật ong",
    image: "pancake.jpg",
    duration: "24 phút",
    type: "Sweets",
    author: "Nguyễn Anh Hoàng",
    number_or_ingredients: 3,
    ingredients: "Chuối tiêu; Chanh ; Mật ong",
    formula:
      "1. Rán chuối: Đầu tiên, bóc vỏ chuối rồi cho vào chảo dầu nóng, chiên cho tới khi 2 mặt của chuối được vàng đều.  ; 2.Sốt mật ong: Cho chuối ra khay và rưới đều mật ong lên trên. Cho vào lò nướng hoặc lò vi sóng, chỉnh nhiệt độ ở mức 160 độ C trong 10 phút. ; 3. Thành phẩm:Giờ chỉ cần chờ đợi là bạn sẽ có món bánh chuối mật ong thật hấp dẫn và tốt cho cơ thể như thế này rồi! Mật ong, chuối và chanh đều là những loại thực phẩm ít năng lượng, rất tốt cho sức khỏe.",
    description:
      "Sau mỗi dịp tết, cơ thể của bạn hấp thụ một lượng thức ăn dồi dào và nhiều dinh dưỡng khiến mỡ thừa tăng nhanh. Đừng lo lắng vì với công thức chuối nướng mật ong dưới đây, bạn sẽ tự làm được món ăn mới thơm ngon và còn đánh bay mỡ thừa đấy!",
  },
  {
    id_recipe: uuidv4(),
    title: "Bánh mì thịt chả",
    image: "banhmi.jpg",
    duration: "17 phút",
    type: "Breakfast",
    author: "Nguyễn Anh Hoàng",
    number_or_ingredients: 5,
    ingredients:
      "1 ổ bánh mì.; 3 – 4 lát chả lụa.; 15g bơ hoặc nước sốt mayonnaise; 1 trái dưa leo.; Sốt 1 nhúm ngò và hành lá.",
    formula:
      "1. Bạn bắt đầu bẻ mở ổ bánh mì để tạo rãnh cho việc nhét nhân vào. Để đảm bảo bánh mì giòn rụm, hãy chọn ổ bánh mới ra lò.; 2. Bạn thái chả lụa thành từng lát, có thể thay đổi kích thước tùy theo sở thích của bạn.; 3. Rửa sạch và cắt nhỏ ngò và hành lá. Rửa sạch dưa leo và thái thành những lát mỏng.; 4. Lập ra các nguyên liệu trên một chiếc dĩa sạch để dễ dàng thao tác trong quá trình làm.; 5. Tách mảng ổ bánh mì ra và phết một lớp bơ hoặc nước sốt mayonnaise lên hai mặt bánh. Hãy điều chỉnh lượng bơ để không làm át vị của các nguyên liệu khác.; 6. Đặt lát chả lụa lên một mặt bánh, sau đó đặt lát dưa leo lên trên. Hãy sắp xếp chúng sao cho không làm bánh trở nên quá dày.; 8. Đặt lát chả lụa lên một mặt bánh, sau đó đặt lát dưa leo lên trên. Hãy sắp xếp chúng sao cho không làm bánh trở nên quá dày.; 9. Tiếp theo, rải đều ngò và hành lá lên trên lớp dưa leo.; 10. Cuối cùng, bạn có thể ăn ngay hoặc cắt ổ bánh mì làm đôi nếu muốn chia sẻ với người khác. Bạn đã hoàn thành một bữa ăn ngon lành và đầy đủ chất dinh dưỡng chỉ trong thời gian rất ngắn. ",
    description:
      "Bánh mì thịt chả với hương vị thơm ngon, lớp thịt chả mềm mịn kết hợp cùng với vỏ bánh giòn giòn đã tạo nên một món ăn hoàn hảo, thường thức cho mọi bữa ăn trong ngày. Trong bài viết này, chúng ta sẽ cùng nhau khám phá bí quyết tạo ra những chiếc bánh mì thịt chả ngon tuyệt tại gia đình, mà không cần phải đến cửa hàng. Hãy sẵn sàng bắt tay vào bếp nhé!",
  },
];
const recipe = [
  {
    type: "Breakfast",
    title: "Salad trứng trộn",
    author: "Nguyễn Anh Hoàng",
    time: "15 phút",
    ingredients: "7",
    source: images.saladTrung,
  },
  {
    type: "Sweets",
    title: "Bánh chuối nướng mật ong",
    author: "Hoàng Tiến Đạt",
    time: "24 phút",
    ingredients: "9",
    source: images.pancake,
  },
  {
    type: "Breakfast",
    title: "Bánh mì thịt chả",
    author: "Nguyễn Anh Hoàng",
    time: "16 phút",
    ingredients: "7",
    source: images.banhmi,
  },
];

export default {
  recipe,
};
