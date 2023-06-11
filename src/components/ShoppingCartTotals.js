import { View, StyleSheet, Text } from 'react-native';
import {
  selectedDeliveryPrice,
  selectSubtotal,
  selectTotal,
} from '../store/slices/cartSlice';
import { useSelector } from 'react-redux';

const ShoppingCartTotals = () => {
  const subtotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectedDeliveryPrice);
  const total = useSelector(selectTotal);

  return (
    <View style={styles.totalContainer}>
      <View style={styles.row}>
        <Text style={styles.text}> Subtotal </Text>
        <Text style={styles.text}>{subtotal} US </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.text}> Delivery </Text>
        <Text style={styles.text}> {subtotal > 0 ? deliveryFee : 0} US </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.textBold}> Total </Text>
        <Text style={styles.textBold}> {subtotal > 0 ? total : 0} US </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  totalContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: 'gainsboro',
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  text: {
    color: 'gray',
    fontSize: 16,
  },
  textBold: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ShoppingCartTotals;
