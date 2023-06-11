import { Image, StyleSheet, View } from 'react-native';
const EmptyCart = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/image/empty-cart.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    aspectRatio: 0.7,
  },
});

export default EmptyCart;
