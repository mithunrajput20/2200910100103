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

export default function Stats({ store }) {
  const entries = Object.entries(store);

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
