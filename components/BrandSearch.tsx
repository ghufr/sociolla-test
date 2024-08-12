import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import debounce from 'lodash/debounce';
import { TextInput } from 'react-native';

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
  const { height: screenHeight } = useWindowDimensions();

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
      <View>
        {flattenedData.length > 0 && (
          <SectionList
            style={{ maxHeight: screenHeight - 419 - 52 }}
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
    </View>
  );
};

export enum SearchByKey {
  name = 'name',
  country = 'country',
}

const styles = StyleSheet.create({
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
  filterContainer: {
    flexDirection: 'row',
  },
  filterText: {
    textTransform: 'uppercase',
  },
});

export default BrandSearch;
