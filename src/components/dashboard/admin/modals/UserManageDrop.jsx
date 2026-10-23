"use client";
import {Button, Dropdown, Label} from "@heroui/react";
import { FiMoreVertical } from "react-icons/fi";

const UserManageDrop = () => {
    return (
    <Dropdown>
       <Dropdown.Trigger>
        <span
            className="rounded-lg p-2 text-[#557065] hover:text-[#0F6848]">
            <FiMoreVertical size={20} />
        </span>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item id="edit-file" textValue="Edit file">
            <Label>Edit User</Label>
          </Dropdown.Item>
          <Dropdown.Item className="text-red-600">
            <Label>Delete User</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
    );
};

export default UserManageDrop;