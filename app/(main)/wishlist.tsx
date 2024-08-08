import { View, StyleSheet, Text } from 'react-native';

export default function WishListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WishList Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '700'
  }
});
