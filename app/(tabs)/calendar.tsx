import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { useTasks } from '@/context/TaskContext';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import TaskItem from '@/components/TaskItem';
import CalendarView from '@/components/CalendarView';
import { format } from 'date-fns';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalendarScreen() {
  const { tasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Filter tasks for the selected date
  const filteredTasks = tasks.filter(
    task => format(new Date(task.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/new-task')}
        >
          <Text style={styles.addButtonText}>Add New</Text>
        </TouchableOpacity>
      </View>

      <CalendarView 
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        tasks={tasks}
      />

      <View style={styles.tasksSection}>
        <Text style={styles.sectionTitle}>
          Tasks for {format(selectedDate, 'MMMM d, yyyy')}
        </Text>

        {filteredTasks.length > 0 ? (
          <FlatList
            data={filteredTasks}
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
            <Text style={styles.emptyStateText}>No tasks for this date</Text>
            <TouchableOpacity 
              style={styles.emptyStateButton}
              onPress={() => router.push('/new-task')}
            >
              <Text style={styles.emptyStateButtonText}>Add a task</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

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
  tasksSection: {
    flex: 1,
    paddingTop: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
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