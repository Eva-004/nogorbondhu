
"use client";

import { useEffect, useState } from "react";
import { Button, Input, Label, Modal, TextField } from "@heroui/react";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const EditProfileModal = ({ user, onUpdate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        location: user?.location || "",
        bio: user?.bio || "",
    });

    useEffect(() => {
        setFormData({
            name: user?.name || "",
            phone: user?.phone || "",
            location: user?.location || "",
            bio: user?.bio || "",
        });
    }, [user]);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await onUpdate(formData);
            toast.success("Profile updated successfully!");
            setIsOpen(false);
        } catch (error) {
            toast.error(error.message || "Profile update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <span onClick={() => setIsOpen(true)} className="bg-[#0F6848] text-white flex gap-2 items-center hover:bg-[#0b5037]">
                <FaEdit /> Edit Profile
            </span>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="text-[#11382B]">Edit Profile</Modal.Heading>
                            <p className="text-sm text-[#557065]">Update your personal information.</p>
                        </Modal.Header>
                        <form onSubmit={handleSubmit}>
                            <Modal.Body className="flex flex-col gap-4 p-6">
                                <TextField name="name">
                                    <Label>Name</Label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        placeholder="Your name"
                                    />
                                </TextField>
                                <TextField name="phone">
                                    <Label>Phone Number</Label>
                                    <Input
                                        value={formData.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                        placeholder="Your phone number"
                                    />
                                </TextField>
                                <TextField name="location">
                                    <Label>Location</Label>
                                    <Input
                                        value={formData.location}
                                        onChange={(e) => handleChange("location", e.target.value)}
                                        placeholder="Your location"
                                    />
                                </TextField>
                                <TextField name="bio">
                                    <Label>About Me</Label>
                                    <Input
                                        value={formData.bio}
                                        onChange={(e) => handleChange("bio", e.target.value)}
                                        placeholder="Write something about yourself"
                                    />
                                </TextField>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="button" variant="secondary" onPress={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" isDisabled={loading} className="bg-[#0F6848] text-white">
                                    {loading ? "Saving..." : "Save Changes"}
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default EditProfileModal;
