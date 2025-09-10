import React, { useState } from "react";
import { Container, Typography, TextField, Button, Alert, Paper } from "@mui/material";
import { normalizeUrl, randomSlug, saveStore } from "../utils";
import { logEvent } from "../utils/logger";

export default function Home({ store, setStore }) {
  const [urls, setUrls] = useState([{ url: "", slug: "", validity: "" }]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState([]);

  const handleAddRow = () => {
    if (urls.length < 5) {
        setUrls([...urls, { url: "", slug: "", validity: "" }]);
        logEvent("info", "Added a new URL input field", { total: urls.length + 1 });
    }
  };

  const handleChange = (index, field, value) => {
    const next = [...urls];
    next[index][field] = value;
    setUrls(next);
  };

  const handleShorten = () => {
    setError("");
    setSuccess([]);
    const results = [];

    let nextStore = { ...store };

    for (let { url, slug, validity } of urls) {
      if (!url.trim()) continue;

      const normalized = normalizeUrl(url.trim());
      if (!normalized) {
        setError("One of the URLs is invalid.");
        return;
      }

      let code = slug.trim();
      if (code) {
        if (!/^[0-9a-zA-Z_-]{3,20}$/.test(code)) {
          setError("Custom slug must be 3–20 alphanumeric/-/_ only.");
          return;
        }
        if (nextStore[code]) {
          setError(`Slug ${code} already exists.`);
          return;
        }
      } else {
        do {
          code = randomSlug();
        } while (nextStore[code]);
      }

      const validityMinutes = validity ? parseInt(validity, 10) : 30;
      if (isNaN(validityMinutes) || validityMinutes <= 0) {
        setError("Validity must be a positive number of minutes.");
        return;
      }

      const entry = {
        original: normalized,
        created: Date.now(),
        expires: Date.now() + validityMinutes * 60000,
        clicks: 0,
      };

      nextStore[code] = entry;
      results.push(`${window.location.origin}/${code}`);
    }

    setStore(nextStore);
    saveStore(nextStore);
    setSuccess(results);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        React URL Shortener
      </Typography>
      <Paper sx={{ p: 3 }}>
        {urls.map((row, i) => (
          <div key={i}>
            <TextField
              label="Enter URL"
              fullWidth
              margin="normal"
              value={row.url}
              onChange={(e) => handleChange(i, "url", e.target.value)}
            />
            <TextField
              label="Custom Slug (optional)"
              fullWidth
              margin="normal"
              value={row.slug}
              onChange={(e) => handleChange(i, "slug", e.target.value)}
            />
            <TextField
              label="Validity (minutes)"
              fullWidth
              margin="normal"
              value={row.validity}
              onChange={(e) => handleChange(i, "validity", e.target.value)}
            />
          </div>
        ))}
        {urls.length < 5 && (
          <Button onClick={handleAddRow} sx={{ mt: 1 }}>
            + Add Another URL
          </Button>
        )}
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleShorten}>
          Shorten All
        </Button>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success.length > 0 && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success.map((s, i) => (
              <div key={i}>{s}</div>
            ))}
          </Alert>
        )}
      </Paper>
    </Container>
  );
}
