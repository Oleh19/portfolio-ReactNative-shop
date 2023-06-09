import {
  View,
  Image,
  FlatList,
  useWindowDimensions,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import products from '../data/products';
import { useSelector, useDispatch } from 'react-redux';
import { cartSlice } from '../store/slices/cartSlice';

const ProductDetailsScreen = () => {
  const product = useSelector((state) => state.products.selectedProduct);
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  addToCart = () => {
    dispatch(cartSlice.actions.addCartItem({ product }));
  };

  return (
    <View>
      <ScrollView>
        {/* image carousel */}

        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{ width: width, aspectRatio: 1 }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />

        <View style={{ padding: 20 }}>
          {/* title */}
          <Text style={styles.title}> {product.name} </Text>

          {/* price */}
          <Text style={styles.price}> {product.price} </Text>

          {/* description */}
          <Text style={styles.description}> {product.description} </Text>
        </View>
      </ScrollView>

      {/* add to cart button */}
      <Pressable
        onPress={addToCart}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add to cart</Text>
      </Pressable>

      {/* nav icon */}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: '500',
    marginVertical: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1.5,
  },
  description: {
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '300',
    marginVertical: 10,
  },
  button: {
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

export default ProductDetailsScreen;
