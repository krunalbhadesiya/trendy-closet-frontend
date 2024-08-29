"use client";

import { useState, useEffect, useMemo, ChangeEvent } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import UpdateContactFormData from "./UpdateConactFormData/UpdateConactFormData";

interface Contact {
    _id: string;
    name: string;
    email: string;
    phone: string;
    notes: string;
    label: string;
    createdAt: string;
}

function AdminContactFormData() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortColumn, setSortColumn] = useState<keyof Contact>("name");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    useEffect(() => {
        const fetchContacts = async () => {
            setIsLoading(true);
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/contacts`,
                    {
                        headers: {
                            Authorization: `${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                setContacts(response.data.contacts); // Assuming your API returns data in { contacts: [] } structure
            } catch (error) {
                console.error("Error fetching contacts", error);
                toast({
                    title: "Error",
                    description: "There was an error fetching contacts. Please try again.",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchContacts();
    }, []);

    const filteredContacts = useMemo(() => {
        return contacts
            .filter(
                (contact) =>
                    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    contact.phone.includes(searchTerm) ||
                    contact.notes.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
                if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
                return 0;
            });
    }, [contacts, searchTerm, sortColumn, sortDirection]);

    const handleSort = (column: keyof Contact) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleEditContact = (contact: Contact) => {
        setSelectedContact(contact);
    };

    const handleDeleteContact = async (contactId: string) => {
        const token = localStorage.getItem("token");

        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/contacts/${contactId}`, {
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                },
            });
            setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== contactId));
            toast({
                title: "Success",
                description: "Contact deleted successfully.",
            });
        } catch (error) {
            console.error("Error deleting contact", error);
            toast({
                title: "Error",
                description: "There was an error deleting the contact. Please try again.",
            });
        }
    };

    return (
        <div className="mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6 pb-2 border-b-2">
                <h1 className="text-2xl font-bold">Contact Management</h1>
                <Input
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-fit"
                />
            </div>
            <div className="overflow-x-auto">
                {isLoading ? (
                    <p>Loading contacts...</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead onClick={() => handleSort("name")}>
                                    Name {sortColumn === "name" && <span className="ml-2">{sortDirection === "asc" ? "\u25B2" : "\u25BC"}</span>}
                                </TableHead>
                                <TableHead onClick={() => handleSort("email")}>
                                    Email {sortColumn === "email" && <span className="ml-2">{sortDirection === "asc" ? "\u25B2" : "\u25BC"}</span>}
                                </TableHead>
                                <TableHead onClick={() => handleSort("phone")}>
                                    Phone {sortColumn === "phone" && <span className="ml-2">{sortDirection === "asc" ? "\u25B2" : "\u25BC"}</span>}
                                </TableHead>
                                <TableHead>Notes</TableHead>
                                <TableHead>Label</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredContacts.map((contact) => (
                                <TableRow key={contact._id}>
                                    <TableCell>{contact.name}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.phone}</TableCell>
                                    <TableCell>{contact.notes}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={"outline"}
                                            className={
                                                contact.label === "Cancel" ? "text-white bg-gray-600" : contact.label === "Complete" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                            }
                                        >
                                            {contact.label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Dialog onOpenChange={() => handleEditContact(contact)}>
                                                <DialogTrigger>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        Edit
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Update Contact Form Data</DialogTitle>
                                                    </DialogHeader>
                                                    {selectedContact && (
                                                        <UpdateContactFormData contact={selectedContact} />
                                                    )}
                                                </DialogContent>

                                            </Dialog>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDeleteContact(contact._id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}

export default AdminContactFormData;
