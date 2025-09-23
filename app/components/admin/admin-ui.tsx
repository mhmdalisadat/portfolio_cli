"use client";

import React, { useState, useEffect } from "react";
import {
  adminService,
  Project,
  ProjectStats,
  ProjectContent,
} from "../../services/admin";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  Eye,
  BarChart3,
  Languages,
} from "lucide-react";

interface AdminUIProps {
  className?: string;
}

const AdminUI: React.FC<AdminUIProps> = ({ className = "" }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // فرم جدید پروژه
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    title: { fa: "", en: "" },
    desc: { fa: "", en: "" },
    subdesc: { fa: "", en: "" },
    href: "",
    logo: "",
    spotlight: "",
    tags: [],
  });

  const [uploadedLogo, setUploadedLogo] = useState<File | null>(null);
  const [uploadedSpotlight, setUploadedSpotlight] = useState<File | null>(null);
  const [uploadedTagIcons, setUploadedTagIcons] = useState<File[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [projectsData, statsData] = await Promise.all([
        adminService.getAllProjects(),
        adminService.getProjectStats(),
      ]);
      setProjects(projectsData);
      setStats(statsData);
    } catch (err) {
      setError("خطا در بارگذاری داده‌ها");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setUploadedLogo(file);
  };

  const handleSpotlightUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    setUploadedSpotlight(file);
  };

  const handleTagIconUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    tagIndex: number
  ) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setUploadedTagIcons((prev) => {
        const newIcons = [...prev];
        newIcons[tagIndex] = file;
        return newIcons;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      // آپلود لوگو
      if (uploadedLogo) {
        const logoResult = await adminService.uploadProjectImages([
          uploadedLogo,
        ]);
        newProject.logo = logoResult.urls[0];
      }

      // آپلود تصویر اصلی
      if (uploadedSpotlight) {
        const spotlightResult = await adminService.uploadProjectImages([
          uploadedSpotlight,
        ]);
        newProject.spotlight = spotlightResult.urls[0];
      }

      // آپلود آیکون‌های تگ‌ها
      if (uploadedTagIcons.length > 0) {
        const tagIconsResult = await adminService.uploadProjectImages(
          uploadedTagIcons
        );
        newProject.tags = newProject.tags.map((tag, index) => ({
          ...tag,
          path: tagIconsResult.urls[index] || tag.path,
        }));
      }

      if (editingProject) {
        // بروزرسانی پروژه موجود
        await adminService.updateProject(editingProject.id!, newProject);
      } else {
        // ایجاد پروژه جدید
        await adminService.createProject(newProject);
      }

      // بارگذاری مجدد داده‌ها
      await loadData();
      
      // به‌روزرسانی فایل‌های JSON
      const updatedProjects = await adminService.getAllProjects();
      await adminService.updateJsonFiles(updatedProjects);
      
      // پاک کردن فرم
      resetForm();
      setShowAddForm(false);
      setEditingProject(null);
    } catch (err) {
      setError("خطا در ذخیره پروژه");
      console.error("Error saving project:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setNewProject(project);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("آیا مطمئن هستید که می‌خواهید این پروژه را حذف کنید؟")) {
      try {
        setLoading(true);
        await adminService.deleteProject(id);
        await loadData();
        
        // به‌روزرسانی فایل‌های JSON
        const updatedProjects = await adminService.getAllProjects();
        await adminService.updateJsonFiles(updatedProjects);
      } catch (err) {
        setError("خطا در حذف پروژه");
        console.error("Error deleting project:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setNewProject({
      title: { fa: "", en: "" },
      desc: { fa: "", en: "" },
      subdesc: { fa: "", en: "" },
      href: "",
      logo: "",
      spotlight: "",
      tags: [],
    });
    setUploadedLogo(null);
    setUploadedSpotlight(null);
    setUploadedTagIcons([]);
  };

  const addTag = () => {
    setNewProject((prev) => ({
      ...prev,
      tags: [
        ...prev.tags,
        { id: Date.now(), name: { fa: "", en: "" }, path: "" },
      ],
    }));
  };

  const updateTag = (
    index: number,
    field: "name" | "path",
    value: string,
    lang?: "fa" | "en"
  ) => {
    setNewProject((prev) => ({
      ...prev,
      tags: prev.tags.map((tag, i) =>
        i === index
          ? field === "name" && lang
            ? { ...tag, name: { ...tag.name, [lang]: value } }
            : { ...tag, [field]: value }
          : tag
      ),
    }));
  };

  const removeTag = (index: number) => {
    setNewProject((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  if (loading && projects.length === 0) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen bg-black ${className}`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black p-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* هدر */}
        <div className="bg-gray-900 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">
                پنل مدیریت پروژه‌ها
              </h1>
              <p className="text-gray-300 mt-2">
                مدیریت و ویرایش پروژه‌های پورتفولیو
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={async () => {
                  try {
                    setLoading(true);
                    const updatedProjects = await adminService.getAllProjects();
                    await adminService.updateJsonFiles(updatedProjects);
                    alert('فایل‌های JSON با موفقیت به‌روزرسانی شدند!');
                  } catch (err) {
                    setError('خطا در به‌روزرسانی فایل‌های JSON');
                  } finally {
                    setLoading(false);
                  }
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Languages size={20} />
                به‌روزرسانی JSON
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus size={20} />
                پروژه جدید
              </button>
            </div>
          </div>
        </div>

        {/* آمار */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-900 rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-300">
                    کل پروژه‌ها
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {stats.totalProjects}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-green-600" />
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-300">
                    پروژه‌های منتشر شده
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {stats.publishedProjects}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <Edit className="h-8 w-8 text-yellow-600" />
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-300">
                    پروژه‌های پیش‌نویس
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {stats.draftProjects}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* پیام خطا */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded mb-6">
            {error}
            <button
              onClick={() => setError(null)}
              className="float-left text-red-400 hover:text-red-200"
            >
              ×
            </button>
          </div>
        )}

        {/* فرم افزودن/ویرایش پروژه */}
        {showAddForm && (
          <div className="bg-gray-900 rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingProject ? "ویرایش پروژه" : "پروژه جدید"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* عنوان پروژه */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Languages size={16} />
                  عنوان پروژه
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      فارسی
                    </label>
                    <input
                      type="text"
                      value={newProject.title.fa}
                      onChange={(e) =>
                        setNewProject((prev) => ({
                          ...prev,
                          title: { ...prev.title, fa: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="عنوان پروژه به فارسی"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      English
                    </label>
                    <input
                      type="text"
                      value={newProject.title.en}
                      onChange={(e) =>
                        setNewProject((prev) => ({
                          ...prev,
                          title: { ...prev.title, en: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Project title in English"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* لینک پروژه */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  لینک پروژه
                </label>
                <input
                  type="url"
                  value={newProject.href}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      href: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* توضیحات کوتاه */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Languages size={16} />
                  توضیحات کوتاه
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">فارسی</label>
                    <textarea
                      value={newProject.desc.fa}
                      onChange={(e) => setNewProject(prev => ({ 
                        ...prev, 
                        desc: { ...prev.desc, fa: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="توضیحات کوتاه به فارسی"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">English</label>
                    <textarea
                      value={newProject.desc.en}
                      onChange={(e) => setNewProject(prev => ({ 
                        ...prev, 
                        desc: { ...prev.desc, en: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Short description in English"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* توضیحات کامل */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Languages size={16} />
                  توضیحات کامل
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">فارسی</label>
                    <textarea
                      value={newProject.subdesc.fa}
                      onChange={(e) => setNewProject(prev => ({ 
                        ...prev, 
                        subdesc: { ...prev.subdesc, fa: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="توضیحات کامل به فارسی"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">English</label>
                    <textarea
                      value={newProject.subdesc.en}
                      onChange={(e) => setNewProject(prev => ({ 
                        ...prev, 
                        subdesc: { ...prev.subdesc, en: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Full description in English"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    آپلود لوگو
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {uploadedLogo && (
                    <p className="text-sm text-gray-300 mt-2">
                      فایل انتخاب شده: {uploadedLogo.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    آپلود تصویر اصلی
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSpotlightUpload}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {uploadedSpotlight && (
                    <p className="text-sm text-gray-300 mt-2">
                      فایل انتخاب شده: {uploadedSpotlight.name}
                    </p>
                  )}
                </div>
              </div>

              {/* تگ‌ها */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-300">
                    تگ‌های تکنولوژی
                  </label>
                  <button
                    type="button"
                    onClick={addTag}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
                  >
                    <Plus size={16} />
                    افزودن تگ
                  </button>
                </div>

                <div className="space-y-4">
                  {newProject.tags.map((tag, index) => (
                    <div key={tag.id} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Languages size={14} />
                        <span className="text-sm text-gray-300">تگ {index + 1}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">نام تگ (فارسی)</label>
                          <input
                            type="text"
                            placeholder="نام تگ به فارسی"
                            value={tag.name.fa}
                            onChange={(e) => updateTag(index, "name", e.target.value, "fa")}
                            className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Tag Name (English)</label>
                          <input
                            type="text"
                            placeholder="Tag name in English"
                            value={tag.name.en}
                            onChange={(e) => updateTag(index, "name", e.target.value, "en")}
                            className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleTagIconUpload(e, index)}
                          className="flex-1 px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* دکمه‌های فرم */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Upload size={20} />
                  )}
                  {editingProject ? "بروزرسانی" : "ایجاد"} پروژه
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingProject(null);
                    resetForm();
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        )}

        {/* لیست پروژه‌ها */}
        <div className="bg-gray-900 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">پروژه‌های موجود</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    پروژه
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    توضیحات
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    تگ‌ها
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={project.logo}
                            alt={project.title.fa}
                          />
                        </div>
                        <div className="mr-4">
                          <div className="text-sm font-medium text-white">
                            {project.title.fa} / {project.title.en}
                          </div>
                          <div className="text-sm text-gray-300">
                            {project.href}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white max-w-xs truncate">
                        <div className="mb-1">{project.desc.fa}</div>
                        <div className="text-gray-400 text-xs">{project.desc.en}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag.id}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-300"
                            title={`${tag.name.fa} / ${tag.name.en}`}
                          >
                            {tag.name.fa}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{project.tags.length - 3} بیشتر
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="text-blue-400 hover:text-blue-300 p-2 rounded-md hover:bg-blue-900"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => project.id && handleDelete(project.id)}
                          className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">هیچ پروژه‌ای یافت نشد</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUI;
