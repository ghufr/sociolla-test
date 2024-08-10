import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: 'white' }}
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        tabBarInactiveTintColor: Colors.light.text,
        tabBarStyle: {
          backgroundColor: '#fedfe2',
        },
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='categories'
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={'document-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='brands'
        options={{
          title: 'Brands',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='pricetag-outline' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='wishlist'
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='heart-outline' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='my-profile'
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
