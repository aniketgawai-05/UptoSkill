export type Role = "student" | "admin" | "instructor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Module {
  title: string;
  lessons: number;
  duration: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  image: string;
  description: string;
  tags: string[];
  progress: number;
  modules: Module[];
}

export interface Enrollment {
  courseId: string;
  enrolledAt: string;
  progress: number;
}
