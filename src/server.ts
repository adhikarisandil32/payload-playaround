import express from "express"
import payload from "payload"

require("dotenv").config()
const app = express()

const PORT = process.env.PORT || 3000

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin")
})

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
    email: {
      transportOptions: {
        host: process.env.SMTP_HOST,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465, // true for port 465, false (the default) for 587 and others
        // requireTLS: true,
      },
      fromAddress: process.env.SMTP_USER,
      fromName: "Sandil Adhikari",
    },
  })

  // Add your own express routes here

  app.listen(PORT, () => console.log(`[server] server ready at port ${PORT}`))
}

start()
