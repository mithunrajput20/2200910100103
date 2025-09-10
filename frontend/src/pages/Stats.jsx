import React from "react";
import {
  Container,
  Typography,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { logEvent } from "../utils/logger";

export default function Stats({ store }) {
  const entries = Object.entries(store);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/stats`);
        const data = await response.json();
        setStats(data);

        logEvent("info", "Fetched stats successfully", { total: data?.length || 0 });
      } catch (error) {
        logEvent("error", "Failed to fetch stats", { error: error.message });
      }
    }
    fetchStats();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Your Shortened Links
      </Typography>

      {entries.length === 0 && (
        <Alert severity="info">No links created yet.</Alert>
      )}

      <List>
        {entries.map(([slug, data]) => (
          <React.Fragment key={slug}>
            <ListItem>
              <ListItemText
                primary={`${window.location.origin}/${slug}`}
                secondary={
                  <>
                    <div>Original: {data.original}</div>
                    <div>Created: {new Date(data.created).toLocaleString()}</div>
                    <div>
                      Expires: {new Date(data.expires).toLocaleString()}
                    </div>
                    <div>Clicks: {data.clicks}</div>
                  </>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
}
