import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, Alert, Animated } from 'react-native';
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

  // Animation values for the slide-up fade effect
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current; // Starts 40px lower

  useEffect(() => {
    loadData();
  }, []);

  // Trigger animation when loading finishes successfully
  useEffect(() => {
    if (!loading && !error) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [loading, error]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
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
    setSelectedEMI(null);
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
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loadingText: { marginTop: 12, color: '#6B7280', fontSize: 16 },
  errorText: { color: '#EF4444', fontSize: 16, textAlign: 'center' },
  listContainer: { padding: 16 }
});
