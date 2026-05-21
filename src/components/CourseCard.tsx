import { Link } from "react-router-dom";
import type { Course } from "../store/types";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { ProgressBar } from "./ProgressBar";
import { CourseArt } from "../assets/courseArt";
import { formatCurrency, truncate } from "../utils/helpers";

const levelTone: Record<Course["level"], "emerald" | "amber" | "rose"> = {
  Beginner: "emerald",
  Intermediate: "amber",
  Advanced: "rose",
};

export const CourseCard = ({ course, showProgress }: { course: Course; showProgress?: boolean }) => (
  <Card hover className="overflow-hidden flex flex-col">
    <Link to={`/courses/${course.id}`} className="block">
      <div className="aspect-[16/9] overflow-hidden">
        <CourseArt variant={course.image} className="h-full w-full" />
      </div>
    </Link>
    <div className="p-5 flex flex-col flex-1">
      <div className="flex items-center justify-between gap-2 mb-2">
        <Badge tone="indigo">{course.category}</Badge>
        <Badge tone={levelTone[course.level]}>{course.level}</Badge>
      </div>
      <Link to={`/courses/${course.id}`}>
        <h3 className="text-base font-semibold text-slate-900 leading-snug hover:text-indigo-600 transition">
          {course.title}
        </h3>
      </Link>
      <p className="mt-1 text-xs text-slate-500">By {course.instructor}</p>
      <p className="mt-3 text-sm text-slate-600 flex-1">{truncate(course.description, 90)}</p>

      <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1">
          <svg className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 15.27l-5.18 3.04 1.4-5.97L1.5 7.97l6.06-.52L10 2l2.44 5.45 6.06.52-4.72 4.37 1.4 5.97z" />
          </svg>
          <span className="font-semibold text-slate-700">{course.rating}</span>
          <span>({course.students.toLocaleString()})</span>
        </span>
        <span>•</span>
        <span>{course.lessons} lessons</span>
        <span>•</span>
        <span>{course.duration}</span>
      </div>

      {showProgress ? (
        <div className="mt-4">
          <ProgressBar value={course.progress} showLabel />
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">{formatCurrency(course.price)}</span>
          <Link
            to={`/courses/${course.id}`}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View course →
          </Link>
        </div>
      )}
    </div>
  </Card>
);
