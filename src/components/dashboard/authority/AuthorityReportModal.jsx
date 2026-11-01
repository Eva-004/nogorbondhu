"use client";

import { Button, Modal } from "@heroui/react";
import AuthorityReportAction from "./AuthorityReportAction";

export default function AuthorityReportModal({ report }) {
  return (
    <Modal>
      <Button variant="secondary" size="sm">
        Update
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[500px]">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Update Report Status</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <AuthorityReportAction report={report} />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}