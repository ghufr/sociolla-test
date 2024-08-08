import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name='(main)'
        options={{
          headerTitle: () => (
            <Image
              resizeMode='contain'
              style={{ height: 46, width: 100 }}
              source={require('@/assets/images/sociolla.png')}
            />
          ),
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name='menu' size={24} style={{ padding: 16 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name='bag-outline' size={24} style={{ padding: 16 }} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
