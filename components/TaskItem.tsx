import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { Task } from '@/types';
import { useTasks } from '@/context/TaskContext';
import { format } from 'date-fns';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSpring,
  runOnJS
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Check, Pencil } from 'lucide-react-native';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskCompletion, categories } = useTasks();
  const translateX = useSharedValue(0);
  const taskHeight = useSharedValue(80);
  const taskOpacity = useSharedValue(1);

  // Find category for the task
  const category = task.categoryId 
    ? categories.find(c => c.id === task.categoryId) 
    : null;

  // Format time
  const formattedTime = format(new Date(task.date), 'h:mm a');

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return COLORS.priority.high;
      case 'medium': return COLORS.priority.medium;
      case 'low': return COLORS.priority.low;
      default: return COLORS.priority.medium;
    }
  };

  const handleToggleCompletion = () => {
    // Animate completion
    taskOpacity.value = withTiming(0.6, { duration: 300 });
    setTimeout(() => {
      toggleTaskCompletion(task.id);
      taskOpacity.value = withTiming(1, { duration: 300 });
    }, 300);
  };

  const handleEdit = () => {
    router.push(`/edit-task?id=${task.id}`);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Limit dragging to left only and up to -100
      translateX.value = Math.max(Math.min(event.translationX, 0), -100);
    })
    .onEnd(() => {
      // If dragged more than halfway, snap to reveal action buttons
      // Otherwise, snap back to original position
      if (translateX.value < -50) {
        translateX.value = withSpring(-100);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      height: taskHeight.value,
      opacity: taskOpacity.value,
    };
  });

  const actionsStyle = useAnimatedStyle(() => {
    return {
      opacity: translateX.value < -10 ? 1 : 0,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.actionsContainer, actionsStyle]}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]} 
          onPress={handleEdit}
        >
          <Pencil color={COLORS.white} size={20} />
        </TouchableOpacity>
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.taskItem, animatedStyle]}>
          <TouchableOpacity 
            style={[
              styles.checkbox, 
              task.completed && styles.checkboxChecked
            ]}
            onPress={handleToggleCompletion}
          >
            {task.completed && <Check size={16} color={COLORS.white} />}
          </TouchableOpacity>
          
          <View style={styles.content}>
            <View style={styles.titleRow}>
              <Text 
                style={[
                  styles.title,
                  task.completed && styles.completedText
                ]}
                numberOfLines={1}
              >
                {task.title}
              </Text>
              <Text style={styles.time}>{formattedTime}</Text>
            </View>
            
            {task.description ? (
              <Text 
                style={[
                  styles.description,
                  task.completed && styles.completedText
                ]}
                numberOfLines={1}
              >
                {task.description}
              </Text>
            ) : null}

            <View style={styles.footer}>
              {category && (
                <View 
                  style={[
                    styles.category,
                    { backgroundColor: category.color + '30' } // 30% opacity
                  ]}
                >
                  <Text 
                    style={[
                      styles.categoryText,
                      { color: category.color }
                    ]}
                  >
                    {category.name}
                  </Text>
                </View>
              )}
              
              <View 
                style={[
                  styles.priority,
                  { backgroundColor: getPriorityColor(task.priority) + '30' }
                ]}
              >
                <Text 
                  style={[
                    styles.priorityText,
                    { color: getPriorityColor(task.priority) }
                  ]}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
    position: 'relative',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    minHeight: 80,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: COLORS.neutral[400],
  },
  time: {
    fontSize: 14,
    color: COLORS.neutral[500],
    marginLeft: SPACING.sm,
  },
  description: {
    fontSize: 14,
    color: COLORS.neutral[600],
    marginBottom: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: SPACING.sm,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  priority: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionsContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  editButton: {
    backgroundColor: COLORS.secondary,
  },
});

export default TaskItem;