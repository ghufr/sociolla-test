import { Image, TouchableOpacity, View } from 'react-native';

const BrandCard = ({
  imageSrc,
  index,
}: {
  imageSrc: string;
  index: number;
}) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          borderColor: 'lightgray',
          borderRadius: 4,
          borderWidth: 1,
          marginRight: 16,
          marginLeft: index === 0 ? 16 : 0,
        }}
        onPress={() => {}}
      >
        <Image
          resizeMode='contain'
          style={{ width: 200, height: 100, borderRadius: 4 }}
          source={{ uri: imageSrc }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BrandCard;
