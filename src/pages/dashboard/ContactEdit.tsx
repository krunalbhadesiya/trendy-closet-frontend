import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash } from 'iconsax-react';
import { Button } from '@/components/ui/button';

interface Contact {
    _id: string;
    srNo: number;
    name: string;
    email: string;
    phone: string;
    message: string;
}

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function ContactEdit() {
    // Define the state for contacts
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

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

    const handleDeleteContact = async () => {
        if (selectedContactId) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/contacts/${selectedContactId}`);
                setContacts(contacts.filter(contact => contact._id !== selectedContactId));
                setSelectedContactId(null);
            } catch (error) {
                console.error('Error deleting contact:', error);
            }
        }
    };

    return (
        <div>
            <section className='p-2 md:p-8 '>
                <div className="flex justify-center items-center mb-4">
                    <h2 className="text-2xl font-bold">Contact Us</h2>
                </div>
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&amp;_tr]:border-b bg-secondary text-secondary-foreground">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Sr No.
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
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.length > 0 ? contacts.map(contact => (
                                <tr key={contact._id} className="border-b transition-colors hover:bg-muted/50">
                                    <td className="p-4 align-middle">{contact.srNo}</td>
                                    <td className="p-4 align-middle">{contact.name}</td>
                                    <td className="p-4 align-middle">{contact.email}</td>
                                    <td className="p-4 align-middle">{contact.phone}</td>
                                    <td className="p-4 align-middle">{contact.message}</td>
                                    <td className="p-4 align-middle">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant='link' onClick={() => setSelectedContactId(contact._id)}>
                                                    <Trash variant='TwoTone' color='red' />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the contact.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel onClick={() => setSelectedContactId(null)}>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={handleDeleteContact}>Delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="p-4 align-middle text-center">No contacts found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default ContactEdit;
