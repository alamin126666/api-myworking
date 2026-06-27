// =============================================
//  BD Alamin API - Key Auth Serverless Function
//  Deploy: GitHub + Vercel
//  Route: POST /linkdeo?key=YOUR_KEY
// =============================================

const VALID_KEY = "GSKSBSODBOX36636BXXIBDDIBD73736IDBDIDBDID";
const WEB_LINK  = "https://bdalamin-realtime-war-v1.vercel.app/";

module.exports = (req, res) => {

  // ── CORS Headers ──────────────────────────
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // ── Handle Pre-flight ─────────────────────
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ── Only Allow POST ───────────────────────
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method Not Allowed",
      message: "Only POST method is accepted.",
    });
  }

  // ── Read Key from Query Param ─────────────
  const { key } = req.query;

  if (!key) {
    return res.status(400).json({
      success: false,
      error: "Bad Request",
      message: "API key is missing. Use: POST /linkdeo?key=YOUR_KEY",
    });
  }

  // ── Validate Key ──────────────────────────
  if (key !== VALID_KEY) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized",
      message: "Invalid API key. Access denied.",
    });
  }

  // ── Success: Return Web Link ──────────────
  return res.status(200).json({
    success: true,
    weblink: WEB_LINK,
    message: "Access granted.",
    timestamp: new Date().toISOString(),
  });
};
