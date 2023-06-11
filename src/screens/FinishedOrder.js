import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';

const FinishedOrder = () => {
  const order = useSelector((state) => state.cart.numberOrder);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animatable.View animation="fadeIn" duration={1000} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animatable.Text
        animation="bounceIn"
        duration={1000}
        delay={0}
        style={{ fontSize: 24, fontWeight: 'bold' }}
      >
        Your order number: {order}
      </Animatable.Text>
      <Animatable.Image
        animation="zoomIn"
        duration={1000}
        delay={500}
        source={require('../assets/image/tick-mark.png')}
        style={{ width: 200, height: 200, marginTop: 20 }}
      />
    </Animatable.View>
  );
};

export default FinishedOrder;
