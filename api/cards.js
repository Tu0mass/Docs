import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.clashroyale.com/v1/cards", {
      headers: {
        Authorization: `Bearer ${process.env.CLASH_API_KEY}`
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "API request failed" });
    }

    const data = await response.json();
    res.status(200).json(data.items);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
}