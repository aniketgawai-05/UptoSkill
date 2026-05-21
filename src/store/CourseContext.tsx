import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Course } from "./types";
import { api } from "../services/api";

interface CourseContextValue {
  courses: Course[];
  loading: boolean;
  enrolledIds: string[];
  enroll: (id: string) => void;
  unenroll: (id: string) => void;
}

export const CourseContext = createContext<CourseContextValue | undefined>(undefined);

const ENROLL_KEY = "UpToSkillshub:enrolled";

export function CourseProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolledIds, setEnrolledIds] = useState<string[]>(() => {
    const raw = localStorage.getItem(ENROLL_KEY);
    return raw ? JSON.parse(raw) : ["c1", "c2", "c4"];
  });

  useEffect(() => {
    api.getCourses().then((c) => {
      setCourses(c);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(ENROLL_KEY, JSON.stringify(enrolledIds));
  }, [enrolledIds]);

  const value = useMemo<CourseContextValue>(() => ({
    courses,
    loading,
    enrolledIds,
    enroll: (id) => setEnrolledIds((prev) => (prev.includes(id) ? prev : [...prev, id])),
    unenroll: (id) => setEnrolledIds((prev) => prev.filter((x) => x !== id)),
  }), [courses, loading, enrolledIds]);

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}
