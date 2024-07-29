import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Add } from 'iconsax-react';
import AddProjectForm from '@/components/AddProjectForm';
import UpdateProjectForm from '@/components/UpdateProjectForm';
import axios from 'axios';

// Define an interface for the project object
interface Project {
  _id: string; // MongoDB _id field
  srNo: number;
  title: string;
  tag: string;
  description: string;
  maxIndex: string; // Ensure this property exists
}

function ProjectEdit() {
  const [projects, setProjects] = useState<Project[]>([]); // State for storing multiple projects
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleUpdate = (id: string) => {
    console.log("Updating project with id:", id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="w-full min-h-screen overflow-hidden">
        <nav className="border-b-2 border-secondary py-4 px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Project Dashboard</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Add variant='Outline' className='mr-2' /> Add New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Project</DialogTitle>
              </DialogHeader>
              <AddProjectForm />
            </DialogContent>
          </Dialog>
        </nav>
        <div className="m-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
              No projects available.
            </div>
          ) : (
            projects.map((project) => (
              <div key={project._id} className="border-2 hover:bg-secondary rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-105">
                <div className="">
                <img src={`/project/${project.srNo}/thumb.webp`} className="w-full" alt={project.title} />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <Badge className="bg-blue-600 text-foreground">
                      {project.tag}
                    </Badge>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 line-clamp-2">{project.description}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"default"} onClick={() => handleUpdate(project._id)}>Update</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Update Project</DialogTitle>
                      </DialogHeader>
                      <UpdateProjectForm id={project._id} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectEdit;
