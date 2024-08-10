import { ReactElement, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TabListItem {
  title: string;
  content: ReactElement;
}

interface TabsProps {
  tabList: TabListItem[];
}

const Tabs = ({ tabList }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const activeContent = tabList[activeTab].content;
  return (
    <View>
      <View style={styles.tabContainer}>
        {tabList.map((tab, i) => {
          const isActive = activeTab === i;
          return (
            <TouchableOpacity
              key={tab.title}
              style={[styles.tabItem, isActive ? styles.tabActive : null]}
              onPress={() => setActiveTab(i)}
            >
              <Text
                style={[styles.tabTitle, isActive ? null : { color: 'gray' }]}
              >
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {activeContent}
    </View>
  );
};

const styles = StyleSheet.create({
  tabTitle: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 12,
  },
  tabActive: {
    borderColor: '#eb395f',
  },
  tabItem: {
    padding: 8,
    borderColor: 'lightgray',
    borderBottomWidth: 3,
    flexGrow: 1,
  },
  tabContainer: {
    padding: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Tabs;
