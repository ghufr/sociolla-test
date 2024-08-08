import { View, StyleSheet, Text } from 'react-native';

export default function MyProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyProfile Screen</Text>
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
