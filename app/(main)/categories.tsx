import { View, StyleSheet, Text } from 'react-native';

export default function CategoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
});
