export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  [key: string]: string | number | boolean | null;
}

export interface CourseApiResponse {
  data: Course[];
  message?: string;
  status?: number;
}

export class CourseRepository {
  private readonly API_URL = 'https://api.codingthailand.com/api/course';

  async fetchCourses(): Promise<CourseApiResponse> {
    const response = await fetch(this.API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.statusText}`);
    }
    return response.json();
  }
}
