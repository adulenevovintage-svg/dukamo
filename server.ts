import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Route: Send Guestbook Note to amef221412@gmail.com
  app.post("/api/send-note", async (req, res) => {
    try {
      const { name, rating, comment, date } = req.body;

      if (!name || !comment) {
        return res.status(400).json({ error: "Name and comment are required." });
      }

      const emailRecipient = "amef221412@gmail.com";
      const appUrl = process.env.APP_URL || "https://ais-dev-a7abt5osbp4k2ozsj3pw24-93434967357.europe-west3.run.app";

      // Generate visual stars for the HTML email
      const starIconsHtml = Array.from({ length: 5 })
        .map((_, i) => (i < rating ? "★" : "☆"))
        .join(" ");

      // Professional HTML Email Layout (matching theme and containing the Dukamo logo)
      const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Guestbook Note</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF5EF; color: #2D241C; margin: 0; padding: 40px 10px; -webkit-font-smoothing: antialiased;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#FAF5EF" style="background-color: #FAF5EF; width: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" max-width="550" style="max-width: 550px; background-color: #ffffff; border: 1px solid #E3D7C8; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(140, 98, 57, 0.05); margin: 0 auto;">
          <!-- Header Banner -->
          <tr>
            <td align="center" bgcolor="#8C6239" style="background-color: #8C6239; padding: 30px 20px; border-bottom: 4px solid #C49A6C; text-align: center;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <div style="width: 80px; height: 80px; border-radius: 50%; overflow: hidden; border: 3px solid #C49A6C; background-color: #FAF5EF; margin-bottom: 12px; display: inline-block;">
                      <img src="https://www.image2url.com/r2/default/images/1782749784839-a01b6ede-101a-4ae3-89d9-4c5c3f3e8336.jpg" alt="Dukamo Logo" width="80" height="80" style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%; display: block;" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <h1 style="font-family: 'Georgia', 'Times New Roman', serif; font-size: 24px; font-weight: 900; margin: 0; color: #ffffff; letter-spacing: 2px; text-transform: uppercase;">DUKAMO</h1>
                    <p style="font-size: 9px; margin: 4px 0 0 0; letter-spacing: 3px; text-transform: uppercase; color: #E6D8C9; font-weight: bold;">Bole Specialty Coffee</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Area -->
          <tr>
            <td style="padding: 35px 25px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td>
                    <!-- Badge -->
                    <span style="display: inline-block; background-color: #FAF5EF; border: 1px solid #8C6239; color: #8C6239; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; padding: 5px 12px; border-radius: 50px; margin-bottom: 20px;">
                      🌟 Guestbook Whisper
                    </span>
                    
                    <!-- Meta info -->
                    <h2 style="font-size: 20px; font-weight: 800; color: #2D241C; margin: 0; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
                      \${name}
                    </h2>
                    <p style="font-size: 11px; color: #8A7968; margin: 4px 0 12px 0; font-family: monospace; letter-spacing: 0.5px;">
                      Posted on \${date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    
                    <!-- Rating Stars -->
                    <div style="color: #C49A6C; font-size: 20px; margin-bottom: 20px; letter-spacing: 2px;">
                      \${starIconsHtml}
                    </div>

                    <!-- Testimonial Quote Card -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#FAF5EF" style="background-color: #FAF5EF; border-left: 4px solid #8C6239; border-radius: 0 12px 12px 0; margin: 20px 0;">
                      <tr>
                        <td style="padding: 18px 20px;">
                          <p style="font-size: 14px; line-height: 1.6; font-style: italic; color: #4A3E34; margin: 0;">
                            "\${comment}"
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Link back button -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td align="center" style="padding-top: 15px;">
                          <a href="\${appUrl}" target="_blank" style="display: inline-block; background-color: #8C6239; color: #ffffff; text-decoration: none; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 12px 24px; border-radius: 8px; box-shadow: 0 4px 6px rgba(140, 98, 57, 0.15);">
                            Open Guestbook Board
                          </a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Area -->
          <tr>
            <td bgcolor="#2D241C" style="background-color: #2D241C; color: #A39081; text-align: center; padding: 25px 20px; font-size: 10px; line-height: 1.6;">
              <p style="margin: 0; font-weight: bold; color: #E6D8C9; text-transform: uppercase; letter-spacing: 1px;">
                DUKAMO SPECIALTY COFFEE & SANCTUARY
              </p>
              <p style="margin: 4px 0 12px 0;">
                Bole Medhanialem, Addis Ababa, Ethiopia<br>
                Powered by Buncho Coffee Roast Engine
              </p>
              <a href="\${appUrl}" target="_blank" style="color: #C49A6C; text-decoration: none; font-weight: bold;">
                Visit Web Menu &rarr;
              </a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

      // Setup NodeMailer transport
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = Number(process.env.SMTP_PORT) || 465;
      const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;

      let sentRealEmail = false;
      let sendStatusInfo = "";

      if (smtpUser && smtpPass) {
        // Real SMTP sending
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Dukamo Guestbook" <\${smtpUser}>`,
          to: emailRecipient,
          subject: `🔔 New Guestbook Note from \${name} (\${rating} Stars)`,
          text: `Dukamo Guestbook Note:\\n\\nFrom: \${name}\\nRating: \${rating} / 5\\nComment: \${comment}\\nDate: \${date}`,
          html: htmlContent,
        });

        sentRealEmail = true;
        sendStatusInfo = `Email successfully dispatched to \${emailRecipient}`;
      } else {
        // Fallback / Sandbox logging
        console.warn("SMTP settings are not configured in .env yet. Logged note payload successfully.");
        sendStatusInfo = `Simulation mode: Email HTML successfully generated and printed. Configure SMTP credentials in Settings for real-time delivery to \${emailRecipient}.`;
      }

      return res.json({
        success: true,
        sentRealEmail,
        recipient: emailRecipient,
        message: sendStatusInfo,
        emailHtml: htmlContent
      });

    } catch (err: any) {
      console.error("Error sending email:", err);
      return res.status(500).json({ error: "Failed to process note sending.", details: err?.message });
    }
  });

  // Serve Vite app in development, static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:\${PORT}`);
  });
}

startServer();
