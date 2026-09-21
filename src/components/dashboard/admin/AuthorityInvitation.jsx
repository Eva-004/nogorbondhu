'use client'
import { Envelope, Person } from "@gravity-ui/icons";
import {
    Button,
    Input,
    Label,
    Modal,
    Surface,
    TextField,
} from "@heroui/react";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { toast } from "react-toastify";

const AuthorityInvitation = ({ authority }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const invitationData = Object.fromEntries(formData.entries());

        const authorityData = {
            authorityId: authority._id,
            name: invitationData.name,
            email: invitationData.email,
        };

        console.log(authorityData);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/authority-invitations`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(authorityData),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Failed to send invitation");
            }else{
                toast.success("Invitation sent successfully!")
            }

    };
    return (
        <Modal>
            <Modal.Trigger>
                <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#0F6848] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0c563d]">
                    <HiOutlineUserPlus className="text-lg" />
                    Invite Authority Head
                </button>
            </Modal.Trigger>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-green-100 text-[#0F6848]">
                                <Envelope className="size-5" />
                            </Modal.Icon>

                            <Modal.Heading>
                                Invite Authority Head
                            </Modal.Heading>

                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Send an invitation to an authority head to join
                                the NagarBondhu platform.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <TextField
                                        className="w-full"
                                        name="name"
                                        type="text"
                                        variant="secondary"
                                        isRequired
                                    >
                                        <Label>Authority Head Name</Label>
                                        <Input
                                            placeholder="Enter full name"
                                        />
                                    </TextField>
                                    <TextField
                                        className="w-full"
                                        name="email"
                                        type="email"
                                        variant="secondary"
                                        isRequired
                                    >
                                        <Label>Email Address</Label>
                                        <Input
                                            placeholder="Enter email address"
                                        />
                                    </TextField>

                                    <div className="rounded-lg border border-green-100 bg-green-50 px-4 py-3">
                                        <div className="flex gap-3">
                                            <Person className="mt-0.5 size-5 shrink-0 text-[#0F6848]" />

                                            <div>
                                                <p className="text-sm font-medium text-[#0F6848]">
                                                    Authority Head Invitation
                                                </p>

                                                <p className="mt-1 text-xs leading-5 text-gray-600">
                                                    The invitation link will allow
                                                    the authority head to complete
                                                    their account setup and access
                                                    the authority dashboard.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <Modal.Footer>
                                        <Button
                                            slot="close"
                                            variant="secondary"
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            type="submit"
                                            className="bg-[#0F6848] text-white hover:bg-[#0B553B]"
                                        >
                                            Send
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default AuthorityInvitation;