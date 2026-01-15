import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { format } from 'date-fns';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { useTasks } from '@/context/TaskContext';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import TaskItem from '@/components/TaskItem';
import { CategoryCard } from '@/components/CategoryCard';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { tasks, categories } = useTasks();
  const today = new Date();
  const todayTasks = tasks.filter(
    task => format(new Date(task.date), 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
  );

  // Get upcoming dates for the date selector
  const upcomingDates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const [selectedDate, setSelectedDate] = useState(upcomingDates[0]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Today</Text>
          <Text style={styles.subtitle}>{format(today, 'EEEE, MMMM d')}</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/new-task')}
        >
          <Text style={styles.addButtonText}>Add New</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dateSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {upcomingDates.map((date, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.dateCard,
                format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') && styles.dateCardActive
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text style={[
                styles.dateDay,
                format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') && styles.dateTextActive
              ]}>
                {format(date, 'dd')}
              </Text>
              <Text style={[
                styles.dateWeekday,
                format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') && styles.dateTextActive
              ]}>
                {format(date, 'EEE')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.sectionTitle}>My Tasks</Text>

      {todayTasks.length > 0 ? (
        <FlatList
          data={todayTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInUp.delay(index * 100)}>
              <TaskItem task={item} />
            </Animated.View>
          )}
          contentContainerStyle={styles.taskList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No tasks for today</Text>
          <TouchableOpacity 
            style={styles.emptyStateButton}
            onPress={() => router.push('/new-task')}
          >
            <Text style={styles.emptyStateButtonText}>Add your first task</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/new-task')}
      >
        <Plus color={COLORS.white} size={24} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.neutral[500],
    marginTop: SPACING.xs,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  dateSelector: {
    marginVertical: SPACING.md,
    paddingLeft: SPACING.lg,
  },
  dateCard: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: COLORS.neutral[100],
    marginRight: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateCardActive: {
    backgroundColor: COLORS.primary,
  },
  dateDay: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  dateWeekday: {
    fontSize: 14,
    color: COLORS.neutral[500],
  },
  dateTextActive: {
    color: COLORS.white,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    color: COLORS.text,
  },
  taskList: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 100, // Add extra padding for FAB
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.neutral[500],
    marginBottom: SPACING.md,
  },
  emptyStateButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 30,
  },
  emptyStateButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});