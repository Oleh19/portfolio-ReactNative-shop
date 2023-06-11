import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductsScreen from './screens/ProductsScreen';
import ProductDeatailsScreen from './screens/ProductDetailsScreen';
import ShoppingCart from './screens/ShoppingCart';
import { Pressable, Text } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectNumberItems } from './store/slices/cartSlice';
import { selectSubtotal } from './store/slices/cartSlice';
import EmptyCart from './screens/EmptyCart';
import FinishedOrder from './screens/FinishedOrder';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const subtotal = useSelector(selectSubtotal);

  const numberItems = useSelector(selectNumberItems);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: 'white' } }}
      >
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                onPress={() =>
                  subtotal > 0
                    ? navigation.navigate('Cart')
                    : navigation.navigate('EmptyCart')
                }
                style={{ flexDirection: 'row' }}
              >
                <FontAwesome5
                  name="shopping-cart"
                  size={18}
                  color="gray"
                />
                <Text style={{ marginLeft: 5, fontWeight: '500' }}>
                  {numberItems > 0 && numberItems}
                </Text>
              </Pressable>
            ),
          })}
        />

        <Stack.Screen
          name="Product Deatails"
          component={ProductDeatailsScreen}
          options={{ presentation: 'modal' }}
        />

        <Stack.Screen
          name="Cart"
          component={ShoppingCart}
        />

        <Stack.Screen
          name="EmptyCart"
          component={EmptyCart}
        />

        <Stack.Screen
          name="Order"
          component={FinishedOrder}
          options={{ presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
