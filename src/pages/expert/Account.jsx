import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AccountPage = ({ resource }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name:  "",
        email:  "",
        password: "", 
        bio:  "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
    };

    return (
        <div className="flex items-center justify-center h-full w-full p-4">
            <div className="w-full max-w-xl p-6 bg-white shadow-lg border border-gray-200 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
                <Separator />
                <div className="mt-4">
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Password</label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your new password"
                                />
                            </div>
                            <div className="flex gap-4">
                                <Button type="submit" className="w-full">Save Changes</Button>
                                <Button variant="outline" onClick={() => setIsEditing(false)} className="w-full">Cancel</Button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <p><strong>Name:</strong> {formData.name}</p>
                                <p><strong>Email:</strong> {formData.email}</p>
                            </div>
                            <div className="flex justify-center">
                                <Button className="w-full" onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
