import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Container, Alert, Button } from "@mui/material";

export default function Error() {
  const location = useLocation();
  const message = location.state?.message || "Invalid or expired link.";

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        {message}
      </Alert>
      <Button variant="contained" component={Link} to="/">
        Go Back Home
      </Button>
    </Container>
  );
}
