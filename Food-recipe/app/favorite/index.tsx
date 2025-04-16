// index.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemDetail from '../../components/ItemDetail';
import Favorite from './Favorite';


const Stack = createNativeStackNavigator();

function index() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Feedback" component={Feedback}  options={{ headerShown: false }}/> */}
      <Stack.Screen name="Favorite" component={Favorite} options={{ headerShown: false }} />
      <Stack.Screen name="ItemDetail" component={ItemDetail} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default index;