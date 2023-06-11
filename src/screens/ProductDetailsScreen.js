import {
  View,
  Image,
  FlatList,
  useWindowDimensions,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Vibration,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import { addCartItem } from '../store/slices/cartSlice';

const ProductDetailsScreen = () => {
  const product = useSelector((state) => state.products.selectedProduct);
  const dispatch = useDispatch();
  const buttonAnimatedScale = useSharedValue(1);

  const { width } = useWindowDimensions();

  const addToCart = () => {
    dispatch(addCartItem({ product }));
  };

  const vibrate = () => {
    Vibration.vibrate(100);
  };

  const buttonStyle = () => {
    buttonAnimatedScale.value = withSequence(
      withSpring(1.15, undefined, () => {
        buttonAnimatedScale.value = withSpring(1, undefined);
      })
    );
  };

  const handlePressable = () => {
    addToCart();
    buttonStyle();
    vibrate();
  };

  const buttonAnimated = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonAnimatedScale.value }],
    };
  });

  return (
    <View>
      <ScrollView>
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
          <Text style={styles.title}>{product.name}</Text>

          <Text style={styles.price}>${product.price}</Text>

          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      <Animated.View style={buttonAnimated}>
        <Pressable
          onPress={handlePressable}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add to cart</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Georgia',
    fontSize: 34,
    fontWeight: '500',
    marginVertical: 10,
  },
  price: {
    fontFamily: 'Georgia',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1.5,
  },
  description: {
    fontFamily: 'Georgia',
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'justify',
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
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Georgia',
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default ProductDetailsScreen;
