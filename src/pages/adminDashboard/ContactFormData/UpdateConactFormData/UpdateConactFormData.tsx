import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast"; // Import toast for notifications

interface Contact {
    _id: string;
    name: string;
    email: string;
    phone: string;
    notes: string;
    label: string;
    createdAt: string;
}

interface UpdateContactFormDataProps {
    contact: Contact;
}

function UpdateContactFormData({ contact: initialContact }: UpdateContactFormDataProps) {
    const [contact, setContact] = useState<Contact>(initialContact);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    };

    // Handle radio button change
    const handleRadioChange = (name: string, value: string) => {
        setContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    };

    // Handle form submission (Update contact)
    const handleUpdateContact = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/contacts/${contact._id}`,
                contact,
                {
                    headers: {
                        Authorization: `${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                toast({
                    title: "Success",
                    description: "Contact updated successfully.",
                });
            } else {
                throw new Error("Failed to update contact.");
            }
        } catch (error) {
            console.error("Error updating contact", error);
            toast({
                title: "Error",
                description: "There was an error updating the contact. Please try again.",
            });
        }
    };

    return (
        <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-2">
                <div className="text-muted-foreground">
                    Created At:
                    <span className="ml-2 text-primary">
                        <time dateTime={contact.createdAt}>
                            {new Date(contact.createdAt).toLocaleString()}
                        </time>
                    </span>
                </div>
            </div>
            <div className="grid gap-2">
                <div className="text-muted-foreground">
                    Customer Name: <Input className="text-primary" name="name" value={contact.name} onChange={handleInputChange} />
                </div>
            </div>
            <div className="grid gap-2">
                <div className="text-muted-foreground">
                    Email: <Input className="text-primary" name="email" value={contact.email} onChange={handleInputChange} />
                </div>
            </div>
            <div className="grid gap-2">
                <div className="text-muted-foreground">
                    Phone: <Input className="text-primary" name="phone" value={contact.phone} onChange={handleInputChange} />
                </div>
            </div>
            <div className="grid gap-2">
                <div className="text-muted-foreground">
                    Label:
                    <RadioGroup name="label" defaultValue={contact.label} onValueChange={(value) => handleRadioChange("label", value)}>
                        <span>
                            <RadioGroupItem value="Complete" />
                            <Badge className="ml-2 text-white bg-green-600" variant={"outline"}>
                                Complete
                            </Badge>
                        </span>
                        <span>
                            <RadioGroupItem value="Progress" />
                            <Badge className="ml-2 text-white bg-red-600" variant={"outline"}>
                                Progress
                            </Badge>
                        </span>
                        <span>
                            <RadioGroupItem value="Cancel" />
                            <Badge className="ml-2 text-white bg-gray-600" variant={"outline"}>
                                Cancel
                            </Badge>
                        </span>
                    </RadioGroup>
                </div>
            </div>
            <div className="grid gap-2">
                <div className="text-muted-foreground">
                    Notes:
                    <Textarea className="text-primary" name="notes" value={contact.notes} onChange={handleInputChange} />
                </div>
            </div>
            
            <Button variant={"default"} onClick={handleUpdateContact}>
                Update
            </Button>
        </div>
    );
}

export default UpdateContactFormData;
