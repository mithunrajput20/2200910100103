import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { saveStore } from "../utils";

export default function Redirect({ store, setStore }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const entry = store[slug];
    if (!entry) {
      navigate("/error", { state: { message: "Short link not found." } });
      return;
    }

    if (Date.now() > entry.expires) {
      navigate("/error", { state: { message: "This link has expired." } });
      return;
    }
    const updated = { ...store, [slug]: { ...entry, clicks: entry.clicks + 1 } };
        setStore(updated);
        saveStore(updated);
        window.location.replace(entry.original);
    }, [slug, store, setStore, navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography>Redirecting</Typography>
    </Container>
  );
}
