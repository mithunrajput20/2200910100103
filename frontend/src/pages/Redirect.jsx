import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { saveStore } from "../utils";
import { logEvent } from "../utils/logger";

export default function Redirect({ store, setStore }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function redirect() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/r/${code}`);
        if (response.ok) {
          const data = await response.json();
          logEvent("info", "Redirecting user", { code, url: data.url });
          window.location.href = data.url;
        } else {
          logEvent("warn", "Redirect failed, short code not found", { code });
          navigate("/error");
        }
      } catch (error) {
        logEvent("error", "Redirect error", { code, error: error.message });
        navigate("/error");
      }
    }
    redirect();
  }, [code, navigate]);
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
