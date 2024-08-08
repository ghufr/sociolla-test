import { fetchBrands, fetchBrandsLetters } from '@/api/v3/catalog';
import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { ScrollView, View, Image, StyleSheet, Text, TouchableOpacity, SectionList, SectionListComponent } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

// TODO: Move this to seperate document
const BrandCard = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <View style={{ borderColor: 'gray', borderRadius: 4, borderWidth: 1, marginRight: 16 }}>
      <Image resizeMode='cover' style={{ width: 200, height: 100 }} source={{ uri: imageSrc }} />
    </View>
  )
}

const BrandSearch = ({ data }: { data: any }) => {
  return (
    <View>
      <TextInput style={styles.searchField} placeholder='Search Brands'></TextInput>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Text>{item}</Text>}
        renderSectionHeader={({ section: { title } }) => <Text style={{ fontWeight: 700 }}>{title}</Text>}
        stickySectionHeadersEnabled={true}
      />
    </View>
  )
}

export default function BrandScreen() {
  const [featuredBrands, setFeaturedBrands] = useState([]);
  const [countries, setCountries] = useState([]);
  const [brandLetters, setBrandLetters] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const _featuredBrand = await fetchBrands({
        filter: { is_featured: true },
        fields: '_id+name+slug+logo+featured_text',
        skip: 0,
        limit: 15,
        sort: '-featured_created_at'
      });
      const _brandLetters = await fetchBrandsLetters({
        fields: 'name,logo,slug',
        limit: 100,
        sort: 'name'
      })
      console.log(_featuredBrand);
      console.log(_brandLetters);

      // await fetchTodos('');

    }
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.featuredTitle}>Featured Brands</Text>
      <ScrollView style={styles.featuredBrands} horizontal>
        {featuredBrands.map((item) => <BrandCard key={0} imageSrc={'https://picsum.photos/200/100'} />)}
        <BrandCard imageSrc='https://placehold.co/600x400' />
        <BrandCard imageSrc='https://picsum.photos/200/100' />
        <BrandCard imageSrc='https://picsum.photos/200/100' />
        <BrandCard imageSrc='https://picsum.photos/200/100' />
        <BrandCard imageSrc='https://picsum.photos/200/100' />
      </ScrollView>
      {/* TODO: Create Tabs element to handle active tab */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 0 ? styles.tabActive : null]}
          onPress={() => setActiveTab(0)}
        >
          <Text
            style={styles.tabTitle}
          >
            Brand Name
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 1 ? styles.tabActive : null]}
          onPress={() => setActiveTab(1)}
        >
          <Text
            style={styles.tabTitle}
          >
            Brand Origins
          </Text>
        </TouchableOpacity>
      </View>
      <BrandSearch data={[]} />
      {/* <BrandSearch data={} /> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  featuredTitle: {
    textTransform: 'uppercase', fontWeight: 700, fontSize: 12,
    marginBottom: 12
  },
  featuredBrands: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 16,
  },
  tabTitle: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 600
  },
  tabActive: {
    borderColor: Colors.light.tint
  },
  tabItem: {
    padding: 8,
    borderColor: 'gray',
    borderBottomWidth: 4,
    flexGrow: 1,
  },
  tabContainer: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  // BrandSearch
  searchField: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'lightgray'
  }
  // BrandSearch
});
