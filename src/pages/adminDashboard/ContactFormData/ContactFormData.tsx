"use client";

import { useState, useMemo, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    notes: string;
    label: string;
}



function AdminContactFormData() {
    // const [contacts, setContacts] = useState<Contact[]>([
    const [contacts] = useState<Contact[]>([
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: "555-1234",
            notes: "Placed order for 10 t-shirts",
            label: "Progress",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "555-5678",
            notes: "Requested custom design",
            label: "Complete",
        },
        {
            id: 3,
            name: "Bob Johnson",
            email: "bob@example.com",
            phone: "555-9012",
            notes: "Frequent customer",
            label: "Cancel",

        },
        {
            id: 4,
            name: "Sarah Lee",
            email: "sarah@example.com",
            phone: "555-3456",
            notes: "Placed large order for company",
            label: "Progress",
        },
        {
            id: 5,
            name: "Tom Wilson",
            email: "tom@example.com",
            phone: "555-7890",
            notes: "Interested in wholesale pricing",
            label: "Complete",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortColumn, setSortColumn] = useState<keyof Contact>("name");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const filteredContacts = useMemo(() => {
        return contacts
            .filter(
                (contact) =>
                    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    contact.phone.includes(searchTerm) ||
                    contact.notes.toLowerCase().includes(searchTerm.toLowerCase()),
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

    const handleCreateContact = () => { };

    const handleEditContact = (contact: Contact) => {
        console.log(contact)
    };

    const handleDeleteContact = (contactId: number) => {
        console.log(contactId)
    };

    return (
        <div className="mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Contact Management</h1>
                <Button onClick={handleCreateContact}>Create Contact</Button>
            </div>
            <div className="mb-6">
                <Input placeholder="Search contacts..." value={searchTerm} onChange={handleSearch} className="w-full" />
            </div>
            <div className="overflow-x-auto">
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
                            <TableRow key={contact.id}>
                                <TableCell>{contact.name}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.phone}</TableCell>
                                <TableCell>{contact.notes}</TableCell>
                                <TableCell>
                                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">{contact.label}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEditContact(contact)}>Edit</Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDeleteContact(contact.id)}>Delete</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
export default AdminContactFormData;