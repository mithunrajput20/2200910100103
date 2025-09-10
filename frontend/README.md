# React + Vite
A simple **React + Vite** app to shorten URLs, manage expiry, and track click counts.  
Built with **React Router v6** and **Material UI**.

##  Features

- Shorten any valid URL with:
  - **Auto-generated slug** (random base62 string)
  - **Custom slug** (alphanumeric + `-` / `_`, 3–20 chars)
- **Default validity**: 30 minutes (if none specified)
- Track:
  - Original URL
  - Short URL
  - Created time
  - Expiry time
  - Click count
- Redirect with **expiry check** and **error messages**
- **LocalStorage persistence** (no backend required)
- Responsive, styled with Material UI
