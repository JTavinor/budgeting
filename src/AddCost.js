import { Box } from "@mui/material";

import { useQuery, gql } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author
    }
  }
`;

function AddCost() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

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
        <h1>Hello</h1>
      </Box>
    </div>
  );
}

export default AddCost;
