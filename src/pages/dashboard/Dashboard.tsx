import { useEffect, useState } from 'react';
import axios from 'axios';
import { Category, Sms } from 'iconsax-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface Contact {
  _id: string;
  srNo: number;
  name: string;
  email: string;
  phone: string;
  message: string;
}
interface Project {
  _id: string;
  srNo: number;
  title: string;
  tag: string;
  maxIndex: string;
}

function Dashboard() {
  // Define the state for contacts
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Contact[]>(`${import.meta.env.VITE_API_BASE_URL}/contacts`);
        setContacts(response.data); // Assuming the API response is an array of contact objects
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Project[]>(`${import.meta.env.VITE_API_BASE_URL}/projects`);
        setProjects(response.data); // Assuming the API response is an array of project objects
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 py-4 px-2">
          <div className=" mx-auto">
            <section className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                {/* <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                  <div className="p-4 flex flex-col items-center justify-center">
                    <BookSaved size={32} variant='TwoTone' />
                    <h3 className="text-2xl font-bold mt-2">3</h3>
                    <p className="text-gray-600 mt-1">Blog Posts</p>
                  </div>
                </div> */}
                <Card className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                  <div className="p-4 flex flex-col items-center justify-center">
                    <Category size={32} variant='TwoTone' />
                    <h3 className="text-2xl font-bold mt-2">{projects.length}</h3>
                    <p className="text-gray-600 mt-1">Projects</p>
                  </div>
                </Card>
                <Card  className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                  <div className="p-4 flex flex-col items-center justify-center">
                    <Sms size={32} variant='TwoTone' />
                    <h3 className="text-2xl font-bold mt-2">{contacts.length}</h3>
                    <p className="text-gray-600 mt-1">Contact Inquiries</p>
                  </div>
                </Card>
              </div>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className='p-2 md:p-4'>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Contact Us</h2>
                  {/* Link to view all contacts */}
                  <Link className='text-blue-500 hover:text-blue-700' to="/dashboard/ContactData">
                    View All
                  </Link>
                </div>
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&amp;_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Sr No
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Name
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Email
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Phone
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Message
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.length > 0 ? contacts.slice(0, 5).map(contact => (
                        <tr key={contact._id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">{contact.srNo}</td>
                          <td className="p-4 align-middle">{contact.name}</td>
                          <td className="p-4 align-middle">{contact.email}</td>
                          <td className="p-4 align-middle">{contact.phone}</td>
                          <td className="p-4 align-middle">{contact.message}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={5} className="p-4 align-middle text-center">No contacts found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
              <Card  className='p-2 md:p-4'>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Projects</h2>
                  {/* Link to view all contacts */}
                  <Link className='text-blue-500 hover:text-blue-700' to="/dashboard/projects">
                    View All
                  </Link>
                </div>
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&amp;_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Sr No
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Title
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Tag
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Max Index
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.length > 0 ? projects.slice(0, 5).map(projects => (
                        <tr key={projects._id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">{projects.srNo}</td>
                          <td className="p-4 align-middle">{projects.title}</td>
                          <td className="p-4 align-middle">{projects.tag}</td>
                          <td className="p-4 align-middle">{projects.maxIndex}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={5} className="p-4 align-middle text-center">No contacts found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>


          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
