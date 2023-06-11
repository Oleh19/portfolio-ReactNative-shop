import { FlatList, StyleSheet, Pressable, Text, Vibration } from 'react-native';
import CartListItem from '../components/CartListItem';
import { useSelector, useDispatch } from 'react-redux';
import ShoppingCartTotals from '../components/ShoppingCartTotals';
import { useNavigation } from '@react-navigation/native';
import { makeOrder, selectSubtotal } from '../store/slices/cartSlice';
import EmptyCart from './EmptyCart';

const ShoppingCart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = useSelector(selectSubtotal);

  const order = () => {
    dispatch(makeOrder());
  };

  const vibrate = () => {
    Vibration.vibrate(100);
  };

  const handlePressable = () => {
    order();
    vibrate();
  };

  return subtotal > 0 ? (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={<ShoppingCartTotals />}
      />
      <Pressable
        style={styles.button}
        onPress={() => {
          handlePressable();
          navigation.navigate('Order');
        }}
      >
        <Text style={styles.buttonText}>Checkout </Text>
      </Pressable>
    </>
  ) : (
    <EmptyCart />
  );
};

const styles = StyleSheet.create({
  button: {
    fontFamily: 'Georgia',
    position: 'absolute',
    backgroundColor: 'black',
    bottom: 30,
    width: '80%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default ShoppingCart;
