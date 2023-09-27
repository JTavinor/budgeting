import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

const GET_GROUPS = gql`
  query GetGroups {
    groups {
      groupName
      subGroups {
        subGroupName
      }
    }
  }
`;

function AddCost() {
  const [group, setGroup] = useState({});
  const [subGroup, setSubGroup] = useState({});

  const { loading, error, data } = useQuery(GET_GROUPS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log("group :>> ", group);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box width={300} height={200} border={1} p={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Group</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={group.groupName}
            label="Group"
            onChange={(event) => {
              setGroup(event.target.value);
              setSubGroup({});
            }}
          >
            {data.groups.map((group) => (
              <MenuItem value={group}>{group.groupName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: "20px" }}>
          <InputLabel id="demo-simple-select-label">Sub Group</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={subGroup}
            label="subGroup"
            onChange={(event) => setSubGroup(event.target.value)}
            disabled={!group.groupName}
          >
            {group.subGroups?.map((subGroup) => (
              <MenuItem value={subGroup}>{subGroup.subGroupName}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default AddCost;
