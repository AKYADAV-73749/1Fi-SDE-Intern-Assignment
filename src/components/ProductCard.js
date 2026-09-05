import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ product, isSelected, selectedVariant, onSelectProduct, onSelectVariant, emiPlans, selectedEMI, onSelectEMI, onCheckout }) => {
  return (
    <View style={[styles.card, isSelected && styles.cardSelected]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => onSelectProduct(product)} style={styles.productHeader}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price}</Text>
          <Text style={styles.details} numberOfLines={2}>{product.details}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.variantContainer}>
        <Text style={styles.sectionTitle}>Storage Variant</Text>
        <View style={styles.row}>
          {product.variants.map((variant) => {
            const isActive = isSelected && selectedVariant === variant;
            return (
              <TouchableOpacity
                key={variant}
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => onSelectVariant(product, variant)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{variant}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {isSelected && selectedVariant && (
        <View style={styles.emiSection}>
          <Text style={styles.sectionTitle}>Available EMI Plans</Text>
          <View style={styles.row}>
            {emiPlans.map((plan) => {
              const isActive = selectedEMI?.id === plan.id;
              return (
                <TouchableOpacity
                  key={plan.id}
                  style={[styles.emiCard, isActive && styles.emiCardActive]}
                  onPress={() => onSelectEMI(plan)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.emiMonths, isActive && styles.emiTextActive]}>{plan.months} Months</Text>
                  <Text style={[styles.emiInterest, isActive && styles.emiTextActive]}>{plan.interest}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          
          <TouchableOpacity 
            style={[styles.ctaButton, !selectedEMI && styles.ctaDisabled]} 
            onPress={onCheckout}
            disabled={!selectedEMI}
            activeOpacity={0.8}
          >
            <Text style={styles.ctaText}>
              {selectedEMI ? `Proceed with ${selectedEMI.months}m EMI` : 'Select an EMI plan'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#ffffff', borderRadius: 24, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#F3F4F6', shadowColor: '#6C28D9', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4 },
  cardSelected: { borderColor: '#d8b4fe', borderWidth: 1.5 },
  productHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  imageContainer: { backgroundColor: '#F9FAFB', borderRadius: 16, padding: 12, marginRight: 16, width: 90, height: 90, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%', resizeMode: 'contain' },
  info: { flex: 1 },
  name: { fontSize: 19, fontWeight: '800', color: '#111827', marginBottom: 4, letterSpacing: -0.3 },
  price: { fontSize: 18, fontWeight: '700', color: '#6C28D9', marginBottom: 6 },
  details: { fontSize: 13, color: '#6B7280', lineHeight: 18 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: '#9CA3AF', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 },
  variantContainer: { marginTop: 4 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#ffffff' },
  chipActive: { backgroundColor: '#6C28D9', borderColor: '#6C28D9' },
  chipText: { fontSize: 14, color: '#4B5563', fontWeight: '600' },
  chipTextActive: { color: '#ffffff' },
  emiSection: { marginTop: 24, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  emiCard: { flex: 1, minWidth: '46%', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#F9FAFB', alignItems: 'flex-start', marginBottom: 4 },
  emiCardActive: { backgroundColor: '#F5F3FF', borderColor: '#6C28D9' },
  emiMonths: { fontSize: 15, fontWeight: '800', color: '#111827', marginBottom: 4 },
  emiInterest: { fontSize: 12, fontWeight: '500', color: '#10B981' },
  emiTextActive: { color: '#6C28D9' },
  ctaButton: { backgroundColor: '#6C28D9', paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginTop: 24, shadowColor: '#6C28D9', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  ctaDisabled: { backgroundColor: '#E5E7EB', shadowOpacity: 0, elevation: 0 },
  ctaText: { color: '#ffffff', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 }
});

export default React.memo(ProductCard);
