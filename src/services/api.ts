import type { Course, User, Enrollment } from "../store/types";

const COURSES: Course[] = [
  {
    id: "c1",
    title: "Mastering React 19 ",
    instructor: "Katrina Kaif",
    category: "Web Development",
    level: "Intermediate",
    price: 49.99,
    rating: 4.9,
    students: 1240,
    duration: "10h 42m",
    lessons: 124,
    image: "react",
    description:
      "Build production-grade interfaces with React 19.",
    tags: ["React", "TypeScript", "Vite"],
    progress: 62,
    modules: [
      { title: "Foundations", lessons: 12, duration: "2h 10m" },
      { title: "Components & State", lessons: 18, duration: "2h 25m" },
      { title: "Hooks Deep-Dive", lessons: 22, duration: "2h 05m" },
      { title: "Server Components", lessons: 16, duration: "2h 30m" },
      { title: "Performance & Deployment", lessons: 14, duration: "2h" },
    ],
  },
  {
    id: "c2",
    title: "Data Structures & Algorithms in Python",
    instructor: "Tony Stark",
    category: "Computer Science",
    level: "Beginner",
    price: 39.99,
    rating: 4.8,
    students: 9320,
    duration: "22h 10m",
    lessons: 156,
    image: "python",
    description:
      "A clear, visual journey through arrays, trees, graphs, and dynamic programming with Pythonic code samples.",
    tags: ["Python", "DSA", "Interview"],
    progress: 28,
    modules: [
      { title: "Big-O & Recursion", lessons: 14, duration: "2h 30m" },
      { title: "Linear Structures", lessons: 24, duration: "3h 50m" },
      { title: "Trees & Heaps", lessons: 28, duration: "4h 20m" },
      { title: "Graphs", lessons: 22, duration: "3h 40m" },
      { title: "Dynamic Programming", lessons: 26, duration: "4h 10m" },
    ],
  },
  {
    id: "c3",
    title: "UI/UX Design Fundamentals with Figma",
    instructor: "Sachin Tendulkar",
    category: "Design",
    level: "Beginner",
    price: 29.99,
    rating: 4.7,
    students: 6740,
    duration: "9h 15m",
    lessons: 68,
    image: "design",
    description:
      "Learn typography, color theory, accessibility and prototyping by shipping a polished design system in Figma.",
    tags: ["Figma", "Design", "Prototyping"],
    progress: 0,
    modules: [
      { title: "Design Principles", lessons: 10, duration: "1h 20m" },
      { title: "Color & Typography", lessons: 12, duration: "1h 45m" },
      { title: "Component Systems", lessons: 18, duration: "2h 30m" },
      { title: "Prototyping", lessons: 14, duration: "2h 00m" },
      { title: "Handoff", lessons: 14, duration: "1h 40m" },
    ],
  },
  {
    id: "c4",
    title: "Machine Learning with TensorFlow",
    instructor: "Dr. Strange",
    category: "AI & Data",
    level: "Advanced",
    price: 79.99,
    rating: 4.9,
    students: 4210,
    duration: "26h 30m",
    lessons: 184,
    image: "ml",
    description:
      "End-to-end ML workflows — from data pipelines to deploying neural networks at scale with TensorFlow & Keras.",
    tags: ["ML", "TensorFlow", "Keras"],
    progress: 14,
    modules: [
      { title: "ML Foundations", lessons: 20, duration: "3h 00m" },
      { title: "Neural Networks", lessons: 32, duration: "5h 10m" },
      { title: "CNNs & Vision", lessons: 40, duration: "6h 40m" },
      { title: "Sequence Models", lessons: 44, duration: "6h 50m" },
      { title: "MLOps & Deploy", lessons: 48, duration: "4h 50m" },
    ],
  },
  {
    id: "c5",
    title: "Digital Marketing",
    instructor: "Rahul Dravid",
    category: "Marketing",
    level: "Intermediate",
    price: 34.99,
    rating: 4.6,
    students: 8810,
    duration: "11h 40m",
    lessons: 92,
    image: "marketing",
    description:
      "Grow audiences with SEO, content, paid ads and data-driven funnels — taught with real campaigns.",
    tags: ["SEO", "Ads", "Analytics"],
    progress: 0,
    modules: [
      { title: "Strategy", lessons: 12, duration: "1h 30m" },
      { title: "SEO & Content", lessons: 22, duration: "2h 40m" },
      { title: "Paid Ads", lessons: 24, duration: "3h 00m" },
      { title: "Email & Funnels", lessons: 18, duration: "2h 10m" },
      { title: "Analytics", lessons: 16, duration: "2h 20m" },
    ],
  },
  {
    id: "c6",
    title: "Cloud DevOps with AWS & Kubernetes",
    instructor: "Vikky Kaushal",
    category: "DevOps",
    level: "Advanced",
    price: 69.99,
    rating: 4.8,
    students: 5530,
    duration: "20h 05m",
    lessons: 138,
    image: "cloud",
    description:
      "Ship reliable systems with CI/CD, IaC, container orchestration and observability on modern cloud infrastructure.",
    tags: ["AWS", "K8s", "Terraform"],
    progress: 0,
    modules: [
      { title: "Cloud Foundations", lessons: 18, duration: "2h 30m" },
      { title: "Containers & K8s", lessons: 32, duration: "5h 20m" },
      { title: "CI/CD", lessons: 28, duration: "4h 00m" },
      { title: "Infrastructure as Code", lessons: 30, duration: "4h 15m" },
      { title: "Observability", lessons: 30, duration: "4h 00m" },
    ],
  },
];

// Simulated network latency
const delay = <T,>(data: T, ms = 300) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(data), ms));

export const api = {
  async getCourses(): Promise<Course[]> {
    return delay(COURSES);
  },
  async getCourse(id: string): Promise<Course | undefined> {
    return delay(COURSES.find((c) => c.id === id));
  },
  async login(email: string, password: string): Promise<User> {
    if (!email || !password) throw new Error("Email and password required");
    const isAdmin = email.toLowerCase().includes("admin");
    return delay({
      id: "u1",
      name: isAdmin ? "Admin User" : email.split("@")[0],
      email,
      role: isAdmin ? "admin" : "student",
      avatar: "",
    });
  },
  async register(name: string, email: string): Promise<User> {
    return delay({
      id: "u" + Math.random().toString(36).slice(2, 7),
      name,
      email,
      role: "student",
      avatar: "",
    });
  },
  async getEnrollments(): Promise<Enrollment[]> {
    return delay([
      { courseId: "c1", enrolledAt: "2026-01-10", progress: 62 },
      { courseId: "c2", enrolledAt: "2026-02-02", progress: 28 },
      { courseId: "c4", enrolledAt: "2026-02-20", progress: 14 },
    ]);
  },
};
