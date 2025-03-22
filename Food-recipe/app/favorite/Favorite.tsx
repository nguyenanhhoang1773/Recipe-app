import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import images from "@/constant/images";
import { Ionicons, AntDesign, MaterialCommunityIcons, } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import DetailsScreen from "./Details";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Dish {
  id: number;
  name: string;
  image: any;
  description: string;
  ingredients: string;
  instructions: string;
}


type RootStackParamList = {
  Favorite: undefined;
  Details: { item: Dish };
};

type FavoriteNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Favorite"
>;


function Favorite() {
  const dishes = [
    {
      id: 1,
      name: 'Phở Bò',
      image: images.pho,
      description:
        'Phở bò là món ăn truyền thống của Việt Nam, nổi tiếng với nước dùng đậm đà, bánh phở mềm mịn và thịt bò thơm ngon. Nước dùng được ninh từ xương bò và các loại gia vị đặc trưng, tạo nên hương vị đặc biệt khó quên. Phở bò không chỉ là một món ăn ngon miệng mà còn mang đậm bản sắc văn hóa ẩm thực Việt Nam.',
      ingredients: `- 1kg xương bò (xương ống, xương sườn);- 500g thịt bò (nạm, gầu, tái);- 200g bánh phở tươi;- Hành tây, gừng, hoa hồi, quế, thảo quả, đinh hương;- Hành lá, ngò rí, giá đỗ, chanh, ớt;- Gia vị: muối, đường, nước mắm, bột ngọt;`,
      instructions: `1. Ninh xương bò: Rửa sạch xương bò, cho vào nồi lớn cùng với hành tây nướng, gừng nướng, hoa hồi, quế, thảo quả, đinh hương. Đổ nước ngập xương, ninh trong khoảng 3-4 tiếng để nước dùng ngọt và đậm đà. Nêm nếm gia vị cho vừa ăn.;2. Chuẩn bị thịt bò: Thịt bò tái thái mỏng, thịt nạm và gầu luộc chín rồi thái miếng vừa ăn.;3. Trình bày: Chần bánh phở qua nước sôi, cho vào tô. Xếp thịt bò lên trên, rắc hành lá, ngò rí. Chan nước dùng nóng lên và thưởng thức kèm giá đỗ, chanh, ớt.`,
    },
    {
      id: 2,
      name: 'Sushi',
      image: images.clock,
      description:
        'Sushi là món ăn truyền thống của Nhật Bản, nổi tiếng với sự kết hợp tinh tế giữa cơm dấm và các loại hải sản tươi ngon. Mỗi miếng sushi là một tác phẩm nghệ thuật, thể hiện sự tỉ mỉ và khéo léo của người đầu bếp. Sushi không chỉ ngon miệng mà còn mang đến trải nghiệm ẩm thực độc đáo và đầy màu sắc.',
      ingredients: `- 500g gạo Nhật;- 100ml giấm gạo;- 50g đường;- 10g muối;- Các loại hải sản tươi sống (cá hồi, cá ngừ, tôm, mực,...);- Rong biển nori;- Rau củ (dưa leo, cà rốt,...);- Gia vị: wasabi, nước tương, gừng ngâm chua;`,
      instructions: `1. Nấu cơm: Vo gạo sạch, nấu cơm với lượng nước vừa đủ để cơm dẻo và dính.;2. Pha giấm trộn cơm: Trộn giấm gạo, đường và muối cho tan. Trộn đều với cơm khi cơm còn nóng.;3. Chuẩn bị hải sản: Cắt hải sản thành miếng vừa ăn.;4. Cuốn sushi: Trải rong biển lên mành tre, cho cơm lên trên, xếp hải sản và rau củ, cuộn chặt lại. Cắt sushi thành từng miếng vừa ăn.;5. Thưởng thức: Dùng kèm wasabi, nước tương và gừng ngâm chua.`,
    },
    {
      id: 3,
      name: 'Pizza Margherita',
      image: images.chicken,
      description:
        'Pizza Margherita là một trong những loại pizza truyền thống của Ý, nổi tiếng với sự đơn giản nhưng tinh tế. Với lớp vỏ bánh mỏng giòn, sốt cà chua tươi ngon, phô mai mozzarella mềm mịn và lá basil thơm lừng, Pizza Margherita mang đến hương vị đặc trưng của ẩm thực Ý.',
      ingredients: `- 300g bột mì;- 200ml nước ấm;- 7g men nở;- 1 muỗng cà phê đường;- 1/2 muỗng cà phê muối;- 200g sốt cà chua;- 200g phô mai mozzarella;- Lá basil tươi;- Dầu olive;`,
      instructions: `1. Nhào bột: Trộn bột mì, men nở, đường và muối. Từ từ thêm nước ấm vào nhào thành khối bột mịn. Ủ bột trong khoảng 1 giờ để bột nở gấp đôi.;2. Cán bột: Cán bột thành hình tròn mỏng.;3. Phết sốt: Phết sốt cà chua lên mặt bánh.;4. Thêm phô mai và basil: Xếp phô mai mozzarella và lá basil lên trên.;5. Nướng bánh: Nướng bánh ở nhiệt độ 220 độ C trong khoảng 15-20 phút cho đến khi phô mai tan chảy và vỏ bánh vàng giòn.;6. Thưởng thức: Rưới dầu olive lên bánh và thưởng thức.`,
    },
    {
      id: 4,
      name: 'Gà rán KFC',
      image: images.cookie,
      description:
        'Gà rán KFC là món ăn nhanh nổi tiếng trên toàn thế giới, với lớp vỏ giòn rụm và thịt gà mềm ngọt bên trong. Hương vị đặc trưng của gà rán KFC đến từ công thức tẩm ướp gia vị bí mật, tạo nên món ăn hấp dẫn và khó cưỡng.',
      ingredients: `- 1kg gà miếng (đùi, cánh, ức);- 200g bột mì;- 100g bột bắp;- Gia vị: muối, tiêu, bột ớt, bột tỏi, bột hành, bột gừng, bột nghệ, bột ngũ vị hương;- 2 quả trứng gà;- Dầu ăn;`,
      instructions: `1. Tẩm ướp gà: Trộn đều các loại gia vị. Ướp gà với gia vị trong khoảng 1-2 tiếng để gà thấm đều.;2. Chuẩn bị bột: Trộn đều bột mì và bột bắp.;3. Lăn bột: Lăn gà qua bột, nhúng vào trứng gà, rồi lăn lại qua bột.;4. Chiên gà: Chiên gà ngập dầu ở nhiệt độ 170-180 độ C cho đến khi gà vàng giòn.;5. Thưởng thức: Dùng kèm tương ớt, tương cà và salad.`,
    },
    {
      id: 5,
      name: 'Bánh mì',
      image: images.pancake,
      description:
        'Bánh mì Việt Nam là món ăn đường phố nổi tiếng, với lớp vỏ bánh mì giòn tan và nhân bánh đa dạng, phong phú. Từ thịt nướng, chả lụa, pate đến các loại rau thơm và nước sốt đặc trưng, bánh mì Việt Nam mang đến hương vị hấp dẫn và độc đáo.',
      ingredients: `- Bánh mì ổ;- Thịt nướng, chả lụa, pate, trứng ốp la;- Dưa leo, cà rốt, ngò rí, hành lá;- Nước sốt: nước tương, đường, giấm, ớt, tỏi;- Gia vị: muối, tiêu;`,
      instructions: `1. Chuẩn bị nhân bánh: Thịt nướng thái miếng, chả lụa thái lát, pate phết đều lên bánh mì. Trứng ốp la chiên chín.;2. Chuẩn bị rau củ: Dưa leo, cà rốt thái sợi. Ngò rí, hành lá thái nhỏ.;3. Pha nước sốt: Trộn đều nước tương, đường, giấm, ớt và tỏi.;4. Kẹp bánh mì: Rạch đôi ổ bánh mì, cho lần lượt thịt, chả, pate, trứng, rau củ và rưới nước sốt.;5. Thưởng thức: Dùng nóng.`,
    },
  ];
  const navigation = useNavigation<FavoriteNavigationProp>();

  const handlenavigation = (dish: Dish) => {
    navigation.navigate('Details', { item: dish }); // Thêm tham số nếu cần
  };

  const handleUnlike = () => {
    Alert.alert(
      'Thông báo!',
      'Bạn có chắc chắn muốn xóa mục này không?',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Hủy bỏ'),
          style: 'cancel',
        },
        { text: 'Xóa', onPress: () => console.log('Đã xóa') },
      ],
      { cancelable: false }
    );
  }
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Món Ăn Yêu Thích</Text>
        {dishes.map((dish) => (
          <TouchableOpacity key={dish.id} className="bg-gray-300 rounded-lg p-4 mb-4 " onPress={() => handlenavigation(dish)} >
            <View className="relative">
              <Image source={dish.image} className="w-full h-40 rounded-md mb-2  " />
              <Ionicons className="absolute right-1 top-1" name={"heart"} color="#ff0000" size={30} onPress={handleUnlike} />
            </View>
            <Text className="text-lg font-semibold mb-1">{dish.name}</Text>
            <Text className="text-gray-600">{dish.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default Favorite;