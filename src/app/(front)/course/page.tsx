import FeaturesCourse from "@/components/features-course";
import { CourseRepository } from "@/repositories/course.repository";
import { CourseService } from "@/services/course-service";

export default async function CoursePage() {
  const courseRepository = new CourseRepository();
  const courseService = new CourseService(courseRepository);
  const courses = await courseService.getCourses();

  return (
    <main>
      {
        courses.length > 0 && <FeaturesCourse courses={courses} />
      }
    </main>
  );
}