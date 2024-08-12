// src/components/LoginForm.tsx
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Define schema for form validation
const FormSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

// LoginForm component for rendering the login form
function LoginForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // Initialize form state and validation
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Handle form submission
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
                email: data.email,
                password: data.password
            });

            const { token, role } = response.data;
            localStorage.setItem('token', token);

            // Store role only if it is provided
            if (role) {
                localStorage.setItem('role', role);
            }

            // Fetch user profile after login
            const profileResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { username, email, name } = profileResponse.data.user;
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            localStorage.setItem('name', name);

            toast({
                title: "Login Successful",
                description: `Welcome, ${data.email}!`,
            });

            // Navigate based on role
            if (role === "admin") {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    }

    // Render the form
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
                <p className="text-center text-sm text-muted-foreground">Don't have an account? <Link to={"/auth/register"} className="text-primary">Register</Link></p>

            </form>
        </Form>
    );
}

export default LoginForm;
