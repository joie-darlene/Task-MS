import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { Category } from '@/types';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.category,
            { backgroundColor: category.color + '20' },
            selectedCategory === category.id && styles.selectedCategory,
            selectedCategory === category.id && { backgroundColor: category.color + '40' },
          ]}
          onPress={() => onSelectCategory(category.id)}
        >
          <Text
            style={[
              styles.categoryText,
              { color: category.color },
              selectedCategory === category.id && styles.selectedCategoryText,
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
  },
  category: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    marginRight: SPACING.sm,
  },
  selectedCategory: {
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
    fontWeight: '600',
  },
});

export default CategorySelector;