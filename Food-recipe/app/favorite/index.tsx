// index.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './Details';
import Favorite from './Favorite';

const Stack = createNativeStackNavigator();

function index() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorite" component={Favorite}  options={{ headerShown: false }}/>
      <Stack.Screen name="Details" component={DetailsScreen}  options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default index;