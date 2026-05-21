import { useContext } from "react";
import { CourseContext } from "../store/CourseContext";

export const useCourses = () => {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourses must be used inside <CourseProvider>");
  return ctx;
};
