import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { fetchBrands, fetchBrandsLetters } from '@/api/v3/catalog';
import BrandCard from '@/components/BrandCard';
import BrandSearch, { SearchByKey } from '@/components/BrandSearch';
import Tabs from '@/components/Tabs';
import { groupByCountry, sortKeysAlphabetically } from '@/utils';

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
    <View>
      <View>
        <Text style={styles.featuredTitle}>Featured Brands</Text>
        <View>
          <FlatList
            style={styles.featuredBrands}
            keyExtractor={(item) => item._id}
            data={featuredBrands}
            renderItem={({ item, index }: any) => (
              <BrandCard key={item?._id} imageSrc={item.logo} index={index} />
            )}
            horizontal
          />
        </View>
        <Tabs
          tabList={[
            {
              title: 'Brand Name',
              content: () => (
                <BrandSearch
                  data={brandLetters}
                  placeholder='Search brand...'
                  searchBy={SearchByKey.name}
                />
              ),
            },
            {
              title: 'Brand Origins',
              content: () => (
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
});
