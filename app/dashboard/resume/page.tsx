"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Download, Eye, Edit, Share2 } from "lucide-react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"

export default function ResumePage() {
  const router = useRouter()
  const [activeView, setActiveView] = useState<"edit" | "preview">("edit")

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            <p className="text-gray-600 mt-1">Create a professional resume that stands out</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveView("edit")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                activeView === "edit"
                  ? "bg-black text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Edit size={18} />
              Edit
            </button>

            <button
              onClick={() => setActiveView("preview")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                activeView === "preview"
                  ? "bg-black text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Eye size={18} />
              Preview
            </button>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Download size={18} />
              Export PDF
            </button>

            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Share2 size={18} />
              Share
            </button>
          </div>
        </div>

        {activeView === "edit" ? <ResumeEditor /> : <ResumePreview />}
      </div>
    </DashboardLayout>
  )
}

function ResumeEditor() {
  const [activeSection, setActiveSection] = useState("personal")

  const sections = [
    { id: "personal", label: "Personal Info" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "awards", label: "Awards" },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex border-b border-gray-200">
        <div className="w-64 border-r border-gray-200 bg-gray-50 p-4">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Sections</h2>
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  activeSection === section.id ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <div className="mt-8">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Templates</h2>
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-[8.5/11] bg-gray-200 rounded-lg cursor-pointer hover:ring-2 hover:ring-black hover:ring-offset-2"></div>
              <div className="aspect-[8.5/11] bg-gray-300 rounded-lg cursor-pointer hover:ring-2 hover:ring-black hover:ring-offset-2"></div>
              <div className="aspect-[8.5/11] bg-gray-400 rounded-lg cursor-pointer hover:ring-2 hover:ring-black hover:ring-offset-2"></div>
              <div className="aspect-[8.5/11] bg-gray-500 rounded-lg cursor-pointer hover:ring-2 hover:ring-black hover:ring-offset-2"></div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          {activeSection === "personal" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="e.g. John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="e.g. Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="e.g. john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="e.g. (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="e.g. portfolio.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                <textarea
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="Write a short summary of your professional background and key strengths..."
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Keep it concise and impactful. Aim for 3-5 sentences.</p>
              </div>
            </div>
          )}

          {activeSection === "education" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Education</h2>
                <button className="px-3 py-1 bg-black text-white text-sm rounded-lg hover:bg-gray-800">
                  Add Education
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">University of Technology</h3>
                  <div className="text-sm text-gray-500">2020 - 2024</div>
                </div>
                <div className="text-gray-700">Bachelor of Science in Computer Science</div>
                <div className="text-sm text-gray-500 mt-1">GPA: 3.8/4.0</div>
                <div className="text-sm text-gray-600 mt-2">
                  Relevant coursework: Data Structures, Algorithms, Machine Learning, Web Development
                </div>

                <div className="flex justify-end mt-4 space-x-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                  <button className="text-sm text-red-600 hover:text-red-800">Remove</button>
                </div>
              </div>

              <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500 mb-2">Add another education entry</p>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200">
                  + Add Education
                </button>
              </div>
            </div>
          )}

          {activeSection === "experience" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Experience</h2>
                <button className="px-3 py-1 bg-black text-white text-sm rounded-lg hover:bg-gray-800">
                  Add Experience
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Tech Innovations Inc.</h3>
                  <div className="text-sm text-gray-500">Jun 2023 - Present</div>
                </div>
                <div className="text-gray-700">Software Engineering Intern</div>
                <div className="text-sm text-gray-500 mt-1">San Francisco, CA</div>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                  <li>Developed and maintained web applications using React and Node.js</li>
                  <li>Collaborated with a team of 5 engineers to implement new features</li>
                  <li>Improved application performance by 30% through code optimization</li>
                </ul>

                <div className="flex justify-end mt-4 space-x-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                  <button className="text-sm text-red-600 hover:text-red-800">Remove</button>
                </div>
              </div>

              <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500 mb-2">Add another experience entry</p>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200">
                  + Add Experience
                </button>
              </div>
            </div>
          )}

          {activeSection === "skills" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Technical Skills</label>
                <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg min-h-[100px]">
                  {["JavaScript", "React", "Node.js", "Python", "Git"].map((skill) => (
                    <div key={skill} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center">
                      {skill}
                      <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
                    </div>
                  ))}
                  <input
                    type="text"
                    className="flex-1 min-w-[120px] border-none focus:ring-0 text-sm"
                    placeholder="Add a skill..."
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Press Enter or comma to add a skill</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Soft Skills</label>
                <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg min-h-[100px]">
                  {["Communication", "Teamwork", "Problem Solving", "Time Management"].map((skill) => (
                    <div key={skill} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center">
                      {skill}
                      <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
                    </div>
                  ))}
                  <input
                    type="text"
                    className="flex-1 min-w-[120px] border-none focus:ring-0 text-sm"
                    placeholder="Add a skill..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
                <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg min-h-[100px]">
                  {["English (Native)", "Spanish (Intermediate)"].map((skill) => (
                    <div key={skill} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center">
                      {skill}
                      <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
                    </div>
                  ))}
                  <input
                    type="text"
                    className="flex-1 min-w-[120px] border-none focus:ring-0 text-sm"
                    placeholder="Add a language..."
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === "projects" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Projects</h2>
                <button className="px-3 py-1 bg-black text-white text-sm rounded-lg hover:bg-gray-800">
                  Add Project
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Personal Portfolio Website</h3>
                  <div className="text-sm text-gray-500">2023</div>
                </div>
                <div className="text-sm text-gray-600">Technologies: React, Next.js, Tailwind CSS</div>
                <div className="text-sm text-gray-600 mt-2">
                  Designed and developed a personal portfolio website to showcase projects and skills.
                </div>
                <div className="text-sm text-blue-600 mt-1 hover:underline">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </div>

                <div className="flex justify-end mt-4 space-x-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                  <button className="text-sm text-red-600 hover:text-red-800">Remove</button>
                </div>
              </div>

              <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500 mb-2">Add another project</p>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200">
                  + Add Project
                </button>
              </div>
            </div>
          )}

          {activeSection === "awards" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Awards & Certifications</h2>
                <button className="px-3 py-1 bg-black text-white text-sm rounded-lg hover:bg-gray-800">
                  Add Award
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">AWS Certified Solutions Architect</h3>
                  <div className="text-sm text-gray-500">2023</div>
                </div>
                <div className="text-sm text-gray-600">Amazon Web Services</div>

                <div className="flex justify-end mt-4 space-x-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                  <button className="text-sm text-red-600 hover:text-red-800">Remove</button>
                </div>
              </div>

              <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500 mb-2">Add another award or certification</p>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200">
                  + Add Award
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ResumePreview() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Resume Preview</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm">A4</button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm">Letter</button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm">100%</button>
          </div>
        </div>
      </div>

      <div className="p-8 flex justify-center bg-gray-100 min-h-[800px]">
        <div className="w-[21cm] h-[29.7cm] bg-white shadow-lg p-[2cm] overflow-y-auto">
          {/* Resume Content */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Alex Johnson</h1>
            <p className="text-gray-600">Software Engineering Student</p>
            <div className="flex justify-center text-sm text-gray-500 mt-2 space-x-2">
              <span>alex.johnson@example.com</span>
              <span>•</span>
              <span>(555) 123-4567</span>
              <span>•</span>
              <span>San Francisco, CA</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">SUMMARY</h2>
            <p className="text-sm text-gray-700">
              Computer Science student at University of Technology with experience in web development and machine
              learning. Passionate about creating user-friendly applications and solving complex problems through code.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">EDUCATION</h2>
            <div className="mb-2">
              <div className="flex justify-between">
                <div className="font-medium">University of Technology</div>
                <div className="text-sm">2020 - 2024</div>
              </div>
              <div className="text-sm">Bachelor of Science in Computer Science</div>
              <div className="text-sm text-gray-600">GPA: 3.8/4.0</div>
              <div className="text-sm text-gray-600 mt-1">
                Relevant coursework: Data Structures, Algorithms, Machine Learning, Web Development
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">EXPERIENCE</h2>
            <div className="mb-2">
              <div className="flex justify-between">
                <div className="font-medium">Tech Innovations Inc.</div>
                <div className="text-sm">Jun 2023 - Present</div>
              </div>
              <div className="text-sm">Software Engineering Intern</div>
              <div className="text-sm text-gray-600">San Francisco, CA</div>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
                <li>Developed and maintained web applications using React and Node.js</li>
                <li>Collaborated with a team of 5 engineers to implement new features</li>
                <li>Improved application performance by 30% through code optimization</li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">SKILLS</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Technical Skills:</span> JavaScript, React, Node.js, Python, Git
              </div>
              <div>
                <span className="font-medium">Soft Skills:</span> Communication, Teamwork, Problem Solving
              </div>
              <div>
                <span className="font-medium">Languages:</span> English (Native), Spanish (Intermediate)
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">PROJECTS</h2>
            <div className="mb-2">
              <div className="flex justify-between">
                <div className="font-medium">Personal Portfolio Website</div>
                <div className="text-sm">2023</div>
              </div>
              <div className="text-sm text-gray-600">Technologies: React, Next.js, Tailwind CSS</div>
              <div className="text-sm text-gray-600 mt-1">
                Designed and developed a personal portfolio website to showcase projects and skills.
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">CERTIFICATIONS</h2>
            <div className="mb-2">
              <div className="flex justify-between">
                <div className="font-medium">AWS Certified Solutions Architect</div>
                <div className="text-sm">2023</div>
              </div>
              <div className="text-sm text-gray-600">Amazon Web Services</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
