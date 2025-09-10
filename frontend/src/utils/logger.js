
export async function logEvent(level, message, meta = {}) {
  try {
    await fetch(`${import.meta.env.VITE_LOGGING_API}/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        level,      
        message,    
        meta,       
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (err) {
    
  }
}
