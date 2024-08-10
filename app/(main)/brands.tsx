import { fetchBrands, fetchBrandsLetters } from '@/api/v3/catalog';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
  SectionList,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import debounce from 'lodash/debounce';
import { Ionicons } from '@expo/vector-icons';
import Tabs from '@/components/Tabs';

// TODO: Move this to seperate document
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

enum SearchByKey {
  name = 'name',
  country = 'country',
}

const groupByCountry = (data: any) => {
  const result: any = {};

  // Iterate over each section in the data
  Object.values(data).forEach((items: any) => {
    items.forEach((item: { country: string }): any => {
      const firstLetter = item?.country[0]?.toUpperCase();
      if (!firstLetter) return;
      // If the country doesn't exist in the result, create one entry (remove duplicate)
      if (!result[firstLetter]) {
        result[firstLetter] = [];
      }
      if (
        result[firstLetter] &&
        !result[firstLetter].find(
          (currentItem: any) => item.country === currentItem.country,
        )
      ) {
        result[firstLetter].push(item);
      }
      result[firstLetter];
    });
  });

  return result;
};

const sortKeysAlphabetically = (groupedData: any) => {
  const alphabet = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const sortedData: any = {};
  alphabet.forEach((letter: string) => {
    sortedData[letter] = groupedData[letter] || []; // Assign the sorted keys to the new object
  });

  return sortedData;
};

const BrandSearch = ({
  data,
  placeholder,
  searchBy,
}: {
  data?: any;
  placeholder: string;
  searchBy: SearchByKey;
}) => {
  const listRef = useRef<SectionList>(null);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    setFilter('');
  }, [data]);

  if (!data) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading</Text>
      </View>
    );
  }

  const alphabet = useMemo(() => Object.keys(data), [data]);
  const flattenedData: any = useMemo(
    () =>
      Object.entries(data)
        .map(([key, value]: [string, any]) => ({
          title: key,
          data: value.filter((item: { name: string; country: string }): any =>
            item[searchBy]?.toLowerCase().includes(filter),
          ),
        }))
        .filter(({ data }: { data: any }) => data?.length > 0),
    [data, filter, searchBy],
  );

  const scrollTo = (letter: string) => {
    const sectionIndex = flattenedData.findIndex(
      (section: { title: string }) => section.title === letter,
    );
    if (sectionIndex < 0) return;
    listRef.current?.scrollToLocation({
      sectionIndex,
      itemIndex: 0,
      animated: true,
    });
  };

  const debouncedSetFilter = useMemo(
    () => debounce((text: string) => setFilter(text.toLowerCase()), 100),
    [],
  );

  return (
    <View>
      <View style={{ marginBottom: 16, paddingHorizontal: 16 }}>
        <View style={styles.searchField}>
          <Ionicons
            name='search-outline'
            size={20}
            style={{ position: 'absolute', left: 16, zIndex: 2 }}
          />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            // value={filter}
            onChangeText={debouncedSetFilter}
          ></TextInput>
        </View>
      </View>
      {filter.length === 0 && (
        <ScrollView style={styles.filterContainer} horizontal>
          {alphabet.map((letter, i) => (
            <Pressable
              key={letter + i}
              style={{ padding: 12 }}
              onPress={() => scrollTo(letter)}
              disabled={data[letter].length === 0}
            >
              <Text
                style={[
                  styles.filterText,
                  data[letter].length === 0 ? { color: 'lightgray' } : null,
                ]}
                key={letter}
              >
                {letter}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {flattenedData.length === 0 && (
        <View style={{ padding: 16 }}>
          <Text style={{ textTransform: 'uppercase' }}>
            Sorry - No Brands Found
          </Text>
        </View>
      )}
      {flattenedData.length > 0 && (
        <SectionList
          style={{ maxHeight: 380 }}
          ref={listRef}
          sections={flattenedData}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          keyExtractor={(item, index) => item._id + index}
          onScrollToIndexFailed={() => {
            console.log('FAIL');
          }}
          getItemLayout={(_, index) => ({
            length: 42,
            offset: 42 * index,
            index,
          })}
          renderItem={({ item }) => (
            <Pressable
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderColor: '#eaeaea',
              }}
              onPress={() => {}}
            >
              <Text style={{ textTransform: 'uppercase' }}>
                {item[searchBy]}
              </Text>
            </Pressable>
          )}
          renderSectionHeader={({ section: { title } }) =>
            filter.length === 0 ? (
              <View
                style={{
                  padding: 16,
                  paddingTop: 24,
                  borderBottomWidth: 1,
                  borderColor: '#eaeaea',
                }}
              >
                <Text style={{ fontWeight: '700' }}>{title}</Text>
              </View>
            ) : null
          }
          stickySectionHeadersEnabled={false}
        />
      )}
    </View>
  );
};

export default function BrandScreen() {
  const [featuredBrands, setFeaturedBrands] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [brandLetters, setBrandLetters] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const _featuredBrand = await fetchBrands({
        filter: JSON.stringify({ is_featured: true }),
        fields: '_id name slug logo featured_text',
        skip: 0,
        limit: 15,
        sort: '-featured_created_at',
      });
      console.log(_featuredBrand.data);
      const _brandLetters = await fetchBrandsLetters({
        fields: JSON.stringify(['name', 'logo', 'slug']),
        limit: 100,
        sort: 'name',
      });

      setFeaturedBrands(_featuredBrand?.data);
      setBrandLetters(_brandLetters?.data);
      setCountries(sortKeysAlphabetically(groupByCountry(_brandLetters?.data)));
    };
    fetchData();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={styles.featuredTitle}>Featured Brands</Text>
        <View>
          <ScrollView style={styles.featuredBrands} horizontal>
            {featuredBrands.map((item, i) => (
              <BrandCard key={item?._id} imageSrc={item.logo} index={i} />
            ))}
          </ScrollView>
        </View>
        {/* TODO: Create Tabs element to handle active tab */}
        <Tabs
          tabList={[
            {
              title: 'Brand Name',
              content: (
                <BrandSearch
                  data={brandLetters}
                  placeholder='Search brand...'
                  searchBy={SearchByKey.name}
                />
              ),
            },
            {
              title: 'Brand Origins',
              content: (
                <BrandSearch
                  data={countries}
                  placeholder='Search country...'
                  searchBy={SearchByKey.country}
                />
              ),
            },
          ]}
        ></Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  featuredTitle: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    padding: 16,
    paddingBottom: 8,
  },
  featuredBrands: {
    marginBottom: 16,
  },
  // BrandSearch
  input: {
    flex: 1,
    width: 'auto',
    padding: 12,
    paddingLeft: 48,
    backgroundColor: '#fff',
    color: '#424242',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 4,
  },
  searchField: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  // BrandSearch

  // FilterByFirstLetter
  filterContainer: {
    flexDirection: 'row',
  },
  filterText: {
    textTransform: 'uppercase',
  },
  // FilterByFirstLetter
});
