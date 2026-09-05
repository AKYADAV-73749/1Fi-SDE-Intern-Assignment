import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, Alert } from 'react-native';
import ProductCard from '../components/ProductCard';
import { fetchProducts, fetchEmiPlans } from '../api/mockApi';

export default function MarketplaceScreen() {
  const [products, setProducts] = useState([]);
  const [emiPlans, setEmiPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedEMI, setSelectedEMI] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch both APIs concurrently
      const [productsData, emiData] = await Promise.all([
        fetchProducts(),
        fetchEmiPlans()
      ]);
      
      setProducts(productsData);
      setEmiPlans(emiData);
    } catch (err) {
      setError('Failed to load marketplace data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVariant = (product, variant) => {
    setSelectedProduct(product);
    setSelectedVariant(variant);
    setSelectedEMI(null); // Reset EMI when changing product or variant
  };

  const handleCheckout = () => {
    Alert.alert(
      'Checkout Processing', 
      `Processing your ${selectedVariant} ${selectedProduct.name} on a ${selectedEMI.months}-month EMI.`
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6C28D9" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          isSelected={selectedProduct?.id === item.id}
          selectedVariant={selectedProduct?.id === item.id ? selectedVariant : null}
          emiPlans={emiPlans}
          selectedEMI={selectedEMI}
          onSelectProduct={(product) => {
            setSelectedProduct(product);
            if (product.id !== selectedProduct?.id) {
              setSelectedVariant(null);
              setSelectedEMI(null);
            }
          }}
          onSelectVariant={handleSelectVariant}
          onSelectEMI={setSelectedEMI}
          onCheckout={handleCheckout}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    color: '#6B7280',
    fontSize: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  }
});
