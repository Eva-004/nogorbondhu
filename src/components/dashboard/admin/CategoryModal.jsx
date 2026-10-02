import { Button, Input, Label, Modal, Surface, TextArea, TextField, Select } from '@heroui/react';
import React from 'react';

const CategoryModal = ({ isOpen, onClose, departments, name, setName, description, setDescription, departmentId, setDepartmentId, submitting, onSubmit, }) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={(open) => !open && onClose()}
        >
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading>Add Problem Category</Modal.Heading>

                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Create a problem category for citizens to report.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <div className="flex flex-col gap-4">
                                    <TextField className="w-full" name="name">
                                        <Label>Category Name</Label>

                                        <Input
                                            placeholder="Enter problem category"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </TextField>

                                    <Select
                                        label="Department"
                                        placeholder="Select department"
                                        selectedKeys={departmentId ? [departmentId] : []}
                                        onSelectionChange={(keys) =>
                                            setDepartmentId(Array.from(keys)[0] || "")
                                        }
                                    >
                                        {departments.map((department) => (
                                            <Select.Item key={department._id} id={department._id}>
                                                {department.name}
                                            </Select.Item>
                                        ))}
                                    </Select>

                                    <TextField className="w-full" name="description">
                                        <Label>Description</Label>

                                        <TextArea
                                            placeholder="Describe this problem category"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </TextField>
                                </div>
                            </Surface>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                slot="close"
                                variant="secondary"
                                onPress={onClose}
                            >
                                Cancel
                            </Button>

                            <Button
                                className="bg-[#11382B] text-white"
                                isLoading={submitting}
                                onPress={onSubmit}
                            >
                                Add Category
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default CategoryModal;