import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_GROUPS } from "./AddCost";

const CREATE_GROUP = gql`
  mutation CreateGroup($groupName: String!) {
    createGroup(groupName: $groupName) {
      name
    }
  }
`;

const CreateGroupModal = ({ open, onClose, onSave }) => {
  const [newGroupName, setNewGroupName] = useState("");

  const [createGroup] = useMutation(CREATE_GROUP, {
    refetchQueries: [GET_GROUPS],
  });

  const handleSave = () => {
    // Call the onSave function with the new group name
    createGroup({
      variables: { groupName: newGroupName },
    });
    // Clear the input field
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="create-group-modal"
      aria-describedby="create-group-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2 id="create-group-modal">Create New Group</h2>
        <TextField
          label="New Group Name"
          variant="outlined"
          fullWidth
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
        <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateGroupModal;
