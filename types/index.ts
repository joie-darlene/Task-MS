export interface Task {
  id: string;
  title: string;
  description?: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  categoryId: string | null;
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}