"use client"

import { useState } from "react"
import { FileText, Download, Check } from "lucide-react"

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState("personal")
  const [resumeData, setResumeData] = useState({
    personal: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      website: "alexjohnson.dev",
    },
    education: [
      {
        id: 1,
        school: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        date: "2020 - 2024",
        gpa: "3.8/4.0",
        description: "Relevant coursework: Data Structures, Algorithms, Machine Learning, Web Development",
      },
    ],
    experience: [
      {
        id: 1,
        company: "Tech Innovations Inc.",
        position: "Software Engineering Intern",
        date: "Summer 2023",
        description:
          "Developed and maintained web applications using React and Node.js. Collaborated with a team of 5 engineers to implement new features and fix bugs.",
      },
    ],
    skills: {
      technical: "JavaScript, React, Node.js, Python, Java, SQL, Git",
      soft: "Problem Solving, Communication, Teamwork, Time Management",
    },
    projects: [
      {
        id: 1,
        title: "Personal Portfolio Website",
        technologies: "React, Next.js, Tailwind CSS",
        description: "Designed and developed a personal portfolio website to showcase projects and skills.",
        link: "https://alexjohnson.dev",
      },
    ],
  })

  const [completionStatus, setCompletionStatus] = useState({
    personal: 100,
    education: 80,
    experience: 70,
    skills: 90,
    projects: 60,
  })

  const handleInputChange = (section: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleArrayInputChange = (section: string, index: number, field: string, value: string) => {
    setResumeData((prev) => {
      const sectionData = [...(prev[section as keyof typeof prev] as any[])]
      sectionData[index] = { ...sectionData[index], [field]: value }
      return { ...prev, [section]: sectionData }
    })
  }

  const addItem = (section: string) => {
    setResumeData((prev) => {
      const sectionData = [...(prev[section as keyof typeof prev] as any[])]
      const newId = sectionData.length > 0 ? Math.max(...sectionData.map((item) => item.id)) + 1 : 1

      let newItem = { id: newId }

      if (section === "education") {
        newItem = {
          ...newItem,
          school: "",
          degree: "",
          date: "",
          gpa: "",
          description: "",
        }
      } else if (section === "experience") {
        newItem = {
          ...newItem,
          company: "",
          position: "",
          date: "",
          description: "",
        }
      } else if (section === "projects") {
        newItem = {
          ...newItem,
          title: "",
          technologies: "",
          description: "",
          link: "",
        }
      }

      return { ...prev, [section]: [...sectionData, newItem] }
    })
  }

  const removeItem = (section: string, id: number) => {
    setResumeData((prev) => {
      const sectionData = [...(prev[section as keyof typeof prev] as any[])]
      return { ...prev, [section]: sectionData.filter((item) => item.id !== id) }
    })
  }

  const sections = [
    { id: "personal", label: "Personal Info", icon: FileText },
    { id: "education", label: "Education", icon: FileText },
    { id: "experience", label: "Experience", icon: FileText },
    { id: "skills", label: "Skills", icon: FileText },
    { id: "projects", label: "Projects", icon: FileText },
  ]

  const suggestions = {
    experience: [
      "Quantify your achievements with numbers when possible (e.g., 'Increased sales by 20%')",
      "Use action verbs to start your bullet points (e.g., 'Developed', 'Implemented', 'Led')",
      "Focus on your contributions and the results of your work",
    ],
    skills: [
      "List your most relevant technical skills first",
      "Include both hard skills (technical) and soft skills",
      "Be specific about programming languages and tools you know",
    ],
  }

  const calculateOverallCompletion = () => {
    const totalSections = Object.keys(completionStatus).length
    const totalCompletion = Object.values(completionStatus).reduce((sum, value) => sum + value, 0)
    return Math.round(totalCompletion / totalSections)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-bw-black">Resume Builder</h1>
          <p className="text-bw-gray-600">Create a professional resume in minutes</p>
        </div>
        <button className="mt-2 md:mt-0 px-4 py-2 bg-bw-black text-bw-white rounded-lg hover:bg-bw-gray-800 flex items-center">
          <Download size={18} className="mr-2" />
          Export as PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Sections */}
        <div className="lg:col-span-2">
          <div className="bg-bw-white border border-bw-gray-200 rounded-lg overflow-hidden">
            {/* Progress Bar */}
            <div className="p-4 border-b border-bw-gray-200">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-bw-gray-600">Resume Completion</span>
                <span className="font-medium">{calculateOverallCompletion()}%</span>
              </div>
              <div className="w-full bg-bw-gray-200 rounded-full h-2">
                <div
                  className="bg-bw-black h-2 rounded-full"
                  style={{ width: `${calculateOverallCompletion()}%` }}
                ></div>
              </div>
            </div>

            {/* Section Navigation */}
            <div className="flex overflow-x-auto border-b border-bw-gray-200">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                    activeSection === section.id
                      ? "border-b-2 border-bw-black text-bw-black"
                      : "text-bw-gray-600 hover:text-bw-black"
                  }`}
                >
                  {section.label}
                  {completionStatus[section.id as keyof typeof completionStatus] === 100 && (
                    <Check size={16} className="inline-block ml-1 text-green-600" />
                  )}
                </button>
              ))}
            </div>

            {/* Form Content */}
            <div className="p-4">
              {/* Personal Info Section */}
              {activeSection === "personal" && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-bw-black">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-bw-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={resumeData.personal.name}
                        onChange={(e) => handleInputChange("personal", "name", e.target.value)}
                        className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-bw-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={resumeData.personal.email}
                        onChange={(e) => handleInputChange("personal", "email", e.target.value)}
                        className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-bw-gray-700 mb-1">Phone</label>
                      <input
                        type="text"
                        value={resumeData.personal.phone}
                        onChange={(e) => handleInputChange("personal", "phone", e.target.value)}
                        className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-bw-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={resumeData.personal.location}
                        onChange={(e) => handleInputChange("personal", "location", e.target.value)}
                        className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-bw-gray-700 mb-1">Website (Optional)</label>
                      <input
                        type="text"
                        value={resumeData.personal.website}
                        onChange={(e) => handleInputChange("personal", "website", e.target.value)}
                        className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Education Section */}
              {activeSection === "education" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-bw-black">Education</h2>
                    <button
                      onClick={() => addItem("education")}
                      className="px-3 py-1 bg-bw-black text-bw-white text-sm rounded hover:bg-bw-gray-800"
                    >
                      Add Education
                    </button>
                  </div>

                  {resumeData.education.map((edu, index) => (
                    <div key={edu.id} className="p-4 border border-bw-gray-200 rounded-lg">
                      <div className="flex justify-between mb-3">
                        <h3 className="font-medium">Education #{index + 1}</h3>
                        <button
                          onClick={() => removeItem("education", edu.id)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-bw-gray-700 mb-1">School/University</label>
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => handleArrayInputChange("education", index, "school", e.target.value)}
                            className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-bw-gray-700 mb-1">Degree</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => handleArrayInputChange("education", index, "degree", e.target.value)}
                            className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-bw-gray-700 mb-1">Date Range</label>
                          <input
                            type="text"
                            value={edu.date}
                            onChange={(e) => handleArrayInputChange("education", index, "date", e.target.value)}
                            className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                            placeholder="e.g., 2020 - 2024"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-bw-gray-700 mb-1">GPA (Optional)</label>
                          <input
                            type="text"
                            value={edu.gpa}
                            onChange={(e) => handleArrayInputChange("education", index, "gpa", e.target.value)}
                            className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                            placeholder="e.g., 3.8/4.0"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-bw-gray-700 mb-1">
                            Description (Optional)
                          </label>
                          <textarea
                            value={edu.description}
                            onChange={(e) => handleArrayInputChange("education", index, "description", e.target.value)}
                            className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                            rows={2}
                            placeholder="Relevant coursework, achievements, etc."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Experience Section */}
              {activeSection === "experience" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-bw-black">Experience</h2>
                    <button
                      onClick={() => addItem("experience")}
                      className="px-3 py-1 bg-bw-black text-bw-white text-sm rounded hover:bg-bw-gray-800"
                    >
                      Add Experience
                    </button>
                  </div>

                  <div className="bg-bw-gray-50 border border-bw-gray-200 rounded-lg p-3 mb-4">
                    <h3 className="font-medium text-bw-gray-700 mb-2">Tips for Experience Section:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-bw-gray-600">
                      {suggestions.experience.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  {resumeData.experience.map((exp, index) => (
                    <div key={exp.id} className="p-4 border border-bw-gray-200 rounded-lg">
                      <div className="flex justify-between mb-3">
                        <h3 className="font-medium">Experience #{index + 1}</h3>
                        <button
                          onClick={() => removeItem("experience", exp.id)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-bw-gray-700 mb-1">
                            Company/Organization
                          </label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleArrayInputChange("experience", index, "company", e.target.value)}
                            className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-bw-gray-700 mb-1">Position</label>
                          <input
                            type="text"
                            value={exp.position}
                            onChange={(e) => handleArrayInputChange("experience", index, "position", e.target.value)}
                            className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-bw-gray-700 mb-1">Date Range</label>
                          <input
                            type="text"
                            value={exp.date}
                            onChange={(e) => handleArrayInputChange("experience", index, "date", e.target.value)}
                            className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                            placeholder="e.g., Jan 2022 - Present"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-bw-gray-700 mb-1">Description</label>
                          <textarea
                            value={exp.description}
                            onChange={(e) => handleArrayInputChange("experience", index, "description", e.target.value)}
                            className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                            rows={3}
                            placeholder="Describe your responsibilities and achievements"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills Section */}
              {activeSection === "skills" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-bw-black">Skills</h2>

                  <div className="bg-bw-gray-50 border border-bw-gray-200 rounded-lg p-3 mb-4">
                    <h3 className="font-medium text-bw-gray-700 mb-2">Tips for Skills Section:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-bw-gray-600">
                      {suggestions.skills.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-bw-gray-700 mb-1">Technical Skills</label>
                      <textarea
                        value={resumeData.skills.technical}
                        onChange={(e) => handleInputChange("skills", "technical", e.target.value)}
                        className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                        rows={3}
                        placeholder="List your technical skills, separated by commas"
                      ></textarea>
                      <p className="text-xs text-bw-gray-500 mt-1">
                        Separate skills with commas (e.g., JavaScript, React, Python)
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-bw-gray-700 mb-1">Soft Skills</label>
                      <textarea
                        value={resumeData.skills.soft}
                        onChange={(e) => handleInputChange("skills", "soft", e.target.value)}
                        className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                        rows={3}
                        placeholder="List your soft skills, separated by commas"
                      ></textarea>
                      <p className="text-xs text-bw-gray-500 mt-1">
                        Separate skills with commas (e.g., Communication, Leadership, Problem Solving)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {activeSection === "projects" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-bw-black">Projects</h2>
                    <button
                      onClick={() => addItem("projects")}
                      className="px-3 py-1 bg-bw-black text-bw-white text-sm rounded hover:bg-bw-gray-800"
                    >
                      Add Project
                    </button>
                  </div>

                  {resumeData.projects.map((project, index) => (
                    <div key={project.id} className="p-4 border border-bw-gray-200 rounded-lg">
                      <div className="flex justify-between mb-3">
                        <h3 className="font-medium">Project #{index + 1}</h3>
                        <button
                          onClick={() => removeItem("projects", project.id)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-bw-gray-700 mb-1">Project Title</label>
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => handleArrayInputChange("projects", index, "title", e.target.value)}
                            className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-bw-gray-700 mb-1">Technologies Used</label>
                          <input
                            type="text"
                            value={project.technologies}
                            onChange={(e) => handleArrayInputChange("projects", index, "technologies", e.target.value)}
                            className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                            placeholder="e.g., React, Node.js, MongoDB"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-bw-gray-700 mb-1">Description</label>
                          <textarea
                            value={project.description}
                            onChange={(e) => handleArrayInputChange("projects", index, "description", e.target.value)}
                            className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                            rows={3}
                            placeholder="Describe the project and your role"
                          ></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-bw-gray-700 mb-1">
                            Project Link (Optional)
                          </label>
                          <input
                            type="text"
                            value={project.link}
                            onChange={(e) => handleArrayInputChange("projects", index, "link", e.target.value)}
                            className="w-full p-2 border border-bw-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bw-black"
                            placeholder="e.g., https://github.com/yourusername/project"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Resume Preview */}
        <div>
          <div className="bg-bw-white border border-bw-gray-200 rounded-lg p-4 sticky top-4">
            <h2 className="text-lg font-bold text-bw-black mb-4">Resume Preview</h2>
            <div className="bg-bw-gray-100 rounded-lg p-4 min-h-[600px] text-sm">
              {/* Personal Info */}
              <div className="text-center mb-4">
                <h1 className="text-xl font-bold text-bw-black">{resumeData.personal.name}</h1>
                <div className="text-bw-gray-600">
                  {resumeData.personal.email} • {resumeData.personal.phone}
                </div>
                <div className="text-bw-gray-600">
                  {resumeData.personal.location}
                  {resumeData.personal.website && ` • ${resumeData.personal.website}`}
                </div>
              </div>

              {/* Education */}
              {resumeData.education.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-md font-bold border-b border-bw-gray-300 pb-1 mb-2">EDUCATION</h2>
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="mb-2">
                      <div className="flex justify-between">
                        <div className="font-medium">{edu.school}</div>
                        <div>{edu.date}</div>
                      </div>
                      <div>{edu.degree}</div>
                      {edu.gpa && <div>GPA: {edu.gpa}</div>}
                      {edu.description && <div className="text-bw-gray-600 text-xs mt-1">{edu.description}</div>}
                    </div>
                  ))}
                </div>
              )}

              {/* Experience */}
              {resumeData.experience.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-md font-bold border-b border-bw-gray-300 pb-1 mb-2">EXPERIENCE</h2>
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="mb-2">
                      <div className="flex justify-between">
                        <div className="font-medium">{exp.company}</div>
                        <div>{exp.date}</div>
                      </div>
                      <div>{exp.position}</div>
                      <div className="text-bw-gray-600 text-xs mt-1">{exp.description}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              <div className="mb-4">
                <h2 className="text-md font-bold border-b border-bw-gray-300 pb-1 mb-2">SKILLS</h2>
                <div>
                  <span className="font-medium">Technical Skills:</span> {resumeData.skills.technical}
                </div>
                <div>
                  <span className="font-medium">Soft Skills:</span> {resumeData.skills.soft}
                </div>
              </div>

              {/* Projects */}
              {resumeData.projects.length > 0 && (
                <div>
                  <h2 className="text-md font-bold border-b border-bw-gray-300 pb-1 mb-2">PROJECTS</h2>
                  {resumeData.projects.map((project) => (
                    <div key={project.id} className="mb-2">
                      <div className="font-medium">{project.title}</div>
                      <div className="text-xs">Technologies: {project.technologies}</div>
                      <div className="text-bw-gray-600 text-xs mt-1">{project.description}</div>
                      {project.link && (
                        <div className="text-xs text-bw-gray-600 mt-1">
                          Link: <span className="underline">{project.link}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
