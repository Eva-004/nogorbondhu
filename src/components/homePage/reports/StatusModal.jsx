
"use client";

import { CircleCheck, CircleXmark } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";

const StatusModal = ({
    isOpen,
    type = "success",
    title,
    message,
    onClose,
    buttonText = "OK",
}) => {
    const isSuccess = type === "success";

    return (
        <Modal>
            <Modal.Backdrop
                isOpen={isOpen}
                onOpenChange={(open) => {
                    if (!open) onClose();
                }}
                variant="blur"
            >
                <Modal.Container size="sm" placement="center">
                    <Modal.Dialog className="w-full max-w-md rounded-[28px] bg-white px-6 py-8 text-center shadow-2xl sm:px-10">
                        <Modal.CloseTrigger />

                        <Modal.Header className="flex flex-col items-center">
                            <Modal.Icon
                                className={
                                    isSuccess
                                        ? "flex size-[76px] items-center justify-center rounded-full bg-green-100 text-green-600"
                                        : "flex size-[76px] items-center justify-center rounded-full bg-red-100 text-red-600"
                                }
                            >
                                {isSuccess ? (
                                    <CircleCheck className="size-11" />
                                ) : (
                                    <CircleXmark className="size-11" />
                                )}
                            </Modal.Icon>

                            <Modal.Heading className="mt-4 text-3xl font-bold text-gray-900">
                                {title || (isSuccess ? "Success" : "Error")}
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body>
                            <p className="whitespace-pre-line text-base leading-7 text-gray-600">
                                {message}
                            </p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                className={`w-full rounded-xl font-semibold text-white ${
                                    isSuccess
                                        ? "bg-green-500 hover:bg-green-600"
                                        : "bg-red-500 hover:bg-red-600"
                                }`}
                                onPress={onClose}
                            >
                                {buttonText}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default StatusModal;
