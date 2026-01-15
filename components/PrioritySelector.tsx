import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';

interface PrioritySelectorProps {
  selectedPriority: 'low' | 'medium' | 'high';
  onSelectPriority: (priority: 'low' | 'medium' | 'high') => void;
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  selectedPriority,
  onSelectPriority,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.priorityButton,
          { backgroundColor: COLORS.priority.low + '20' },
          selectedPriority === 'low' && styles.selectedPriority,
          selectedPriority === 'low' && { backgroundColor: COLORS.priority.low + '40' },
        ]}
        onPress={() => onSelectPriority('low')}
      >
        <Text
          style={[
            styles.priorityText,
            { color: COLORS.priority.low },
            selectedPriority === 'low' && styles.selectedPriorityText,
          ]}
        >
          Low
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.priorityButton,
          { backgroundColor: COLORS.priority.medium + '20' },
          selectedPriority === 'medium' && styles.selectedPriority,
          selectedPriority === 'medium' && { backgroundColor: COLORS.priority.medium + '40' },
        ]}
        onPress={() => onSelectPriority('medium')}
      >
        <Text
          style={[
            styles.priorityText,
            { color: COLORS.priority.medium },
            selectedPriority === 'medium' && styles.selectedPriorityText,
          ]}
        >
          Medium
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.priorityButton,
          { backgroundColor: COLORS.priority.high + '20' },
          selectedPriority === 'high' && styles.selectedPriority,
          selectedPriority === 'high' && { backgroundColor: COLORS.priority.high + '40' },
        ]}
        onPress={() => onSelectPriority('high')}
      >
        <Text
          style={[
            styles.priorityText,
            { color: COLORS.priority.high },
            selectedPriority === 'high' && styles.selectedPriorityText,
          ]}
        >
          High
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  selectedPriority: {
    borderWidth: 1,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedPriorityText: {
    fontWeight: '600',
  },
});

export default PrioritySelector;