import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import MarketplaceScreen from './src/screens/MarketplaceScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('1Fi Marketplace');
  const tabs = ['Top Brands', 'Nearby Stores', '1Fi Marketplace'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>Shop using mutual funds</Text>
        <Text style={styles.headerTitle}>1Fi Shop</Text>
      </View>

      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, isActive && styles.tabActive]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.content}>
        {activeTab === 'Top Brands' && <View style={styles.blankState} />}
        {activeTab === 'Nearby Stores' && <View style={styles.blankState} />}
        {activeTab === '1Fi Marketplace' && <MarketplaceScreen />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20, backgroundColor: '#ffffff' },
  headerSubtitle: { fontSize: 13, fontWeight: '600', color: '#6C28D9', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  headerTitle: { fontSize: 32, fontWeight: '800', color: '#111827' },
  tabContainer: { paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  tabScroll: { paddingHorizontal: 16, gap: 8 },
  tab: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 24, backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: 'transparent' },
  tabActive: { backgroundColor: '#EFDAFF', borderColor: '#6C28D9' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#4B5563' },
  tabTextActive: { color: '#6C28D9', fontWeight: '700' },
  content: { flex: 1, backgroundColor: '#F9FAFB' },
  blankState: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
