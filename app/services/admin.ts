// سرویس ادمین برای مدیریت پروژه‌ها
export interface ProjectContent {
  fa: string;
  en: string;
}

export interface Project {
  id?: string;
  title: ProjectContent;
  desc: ProjectContent;
  subdesc: ProjectContent;
  href: string;
  texture?: string;
  logo: string;
  spotlight: string;
  tags: Array<{
    id: number;
    name: ProjectContent;
    path: string;
  }>;
}

export interface ProjectStats {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

class AdminService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // دریافت تمام پروژه‌ها
  async getAllProjects(): Promise<Project[]> {
    return this.request<Project[]>("/admin/projects");
  }

  // دریافت آمار پروژه‌ها
  async getProjectStats(): Promise<ProjectStats> {
    return this.request<ProjectStats>("/admin/projects/stats");
  }

  // دریافت یک پروژه خاص
  async getProjectById(id: string): Promise<Project> {
    return this.request<Project>(`/admin/projects/${id}`);
  }

  // ایجاد پروژه جدید
  async createProject(project: Omit<Project, "id">): Promise<Project> {
    return this.request<Project>("/admin/projects", {
      method: "POST",
      body: JSON.stringify(project),
    });
  }

  // آپلود تصاویر پروژه
  async uploadProjectImages(files: File[]): Promise<{ urls: string[] }> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images`, file);
    });

    const response = await fetch(
      `${API_BASE_URL}/admin/projects/upload-images`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // بروزرسانی پروژه
  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    return this.request<Project>(`/admin/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(project),
    });
  }

  // حذف پروژه
  async deleteProject(id: string): Promise<void> {
    return this.request<void>(`/admin/projects/${id}`, {
      method: "DELETE",
    });
  }

  // به‌روزرسانی فایل‌های JSON
  async updateJsonFiles(projects: Project[]): Promise<void> {
    return this.request<void>('/admin/update-json', {
      method: 'POST',
      body: JSON.stringify({ projects }),
    });
  }
}

export const adminService = new AdminService();
