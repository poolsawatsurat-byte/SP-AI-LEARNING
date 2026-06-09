import { CourseRepository, Course } from "../repositories/course.repository";

export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async getCourses(): Promise<Course[]> {
    const result = await this.courseRepository.fetchCourses();
    return result.data || [];
  }
}
