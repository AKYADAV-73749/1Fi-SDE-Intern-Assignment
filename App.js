import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, TextInput, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MarketplaceScreen from './src/screens/MarketplaceScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('1Fi Marketplace');
  const tabs = ['Top Brands', 'Nearby Stores', '1Fi Marketplace'];

  return (
    <View style={styles.webContainer}>
      <SafeAreaView style={styles.mobileWrapper}>
        <StatusBar barStyle="light-content" backgroundColor="#581c87" />
        
        {/* Purple Background Block at the top */}
        <View style={styles.purpleHeaderBackground} />

        {/* Header Content */}
        <View style={styles.header}>
          
          {/* Main Tab Pill */}
          <View style={styles.tabContainer}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={styles.tab}
                  onPress={() => setActiveTab(tab)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
                  {isActive && <View style={styles.activeUnderline} />}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Search Bar (Matching screenshot) */}
          <View style={styles.searchContainer}>
            <Feather name="search" size={18} color="#9CA3AF" />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search online stores..."
              placeholderTextColor="#9CA3AF"
              editable={false}
            />
          </View>
        </View>

        {/* Main Content Area */}
        <View style={styles.content}>
          {activeTab === 'Top Brands' && <View style={styles.blankState} />}
          {activeTab === 'Nearby Stores' && <View style={styles.blankState} />}
          {activeTab === '1Fi Marketplace' && <MarketplaceScreen />}
        </View>

        {/* Floating Bottom Navigation */}
        <View style={styles.bottomNavContainer}>
          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem}>
              <Feather name="home" size={20} color="#9CA3AF" />
              <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Feather name="shopping-bag" size={20} color="#6C28D9" />
              <Text style={[styles.navText, styles.navTextActive]}>Shop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Feather name="file-text" size={20} color="#9CA3AF" />
              <Text style={styles.navText}>EMI Dues</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Feather name="bar-chart-2" size={20} color="#9CA3AF" />
              <Text style={styles.navText}>Limit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Feather name="user" size={20} color="#9CA3AF" />
              <Text style={styles.navText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  webContainer: { 
    flex: 1, 
    backgroundColor: '#E5E7EB', // Gray background for the desktop web view
    alignItems: 'center' 
  },
  mobileWrapper: { 
    flex: 1, 
    width: '100%', 
    maxWidth: 480, // Constrains width to look like a mobile phone on web
    backgroundColor: '#F9FAFB',
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10
  },
  purpleHeaderBackground: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 140, // Purple block behind tabs
    backgroundColor: '#4c1d95',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  header: { 
    paddingHorizontal: 20, 
    paddingTop: Platform.OS === 'web' ? 40 : 60, 
    paddingBottom: 10,
    zIndex: 10
  },
  tabContainer: { 
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    padding: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4
  },
  tab: { 
    flex: 1, 
    paddingVertical: 12, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  tabText: { 
    fontSize: 12, 
    fontWeight: '600', 
    color: '#6B7280',
    textAlign: 'center'
  },
  tabTextActive: { 
    color: '#6C28D9', 
    fontWeight: '800' 
  },
  activeUnderline: {
    position: 'absolute',
    bottom: 4,
    width: 20,
    height: 3,
    backgroundColor: '#6C28D9',
    borderRadius: 2
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 14,
    color: '#111827',
    flex: 1
  },
  content: { 
    flex: 1,
    paddingBottom: 100 // Leave space so content doesn't hide behind bottom nav
  },
  blankState: { 
    flex: 1 
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    zIndex: 20
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 32,
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    shadowColor: '#6C28D9',
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
    color: '#9CA3AF',
    fontWeight: '600'
  },
  navTextActive: {
    color: '#6C28D9',
    fontWeight: '800'
  }
});
