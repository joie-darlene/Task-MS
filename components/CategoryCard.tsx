import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { Category } from '@/types';
import { ChevronRight } from 'lucide-react-native';

interface CategoryCardProps {
  category: Category;
  taskCount: number;
  onPress?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  taskCount,
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: category.color + '20' }]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Text style={[styles.name, { color: category.color }]}>
          {category.name}
        </Text>
        <Text style={styles.count}>
          {taskCount} {taskCount === 1 ? 'Task' : 'Tasks'}
        </Text>
      </View>
      
      <ChevronRight size={20} color={category.color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
    color: COLORS.neutral[600],
  },
});