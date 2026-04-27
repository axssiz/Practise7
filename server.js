const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Database setup
const db = new sqlite3.Database("./quiz.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    initDatabase();
  }
});

function initDatabase() {
  db.run(`CREATE TABLE IF NOT EXISTS keys (
    code TEXT PRIMARY KEY,
    used INTEGER DEFAULT 0,
    used_by TEXT,
    used_at TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS users (
    name TEXT PRIMARY KEY,
    key_code TEXT,
    activated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(
    `CREATE TABLE IF NOT EXISTS admin_settings (
    key TEXT PRIMARY KEY,
    value TEXT
  )`,
    () => {
      // Set default admin password if not exists
      db.get(
        "SELECT value FROM admin_settings WHERE key = 'admin_password'",
        (err, row) => {
          if (!row) {
            db.run(
              "INSERT INTO admin_settings (key, value) VALUES ('admin_password', 'admin123')",
            );
          }
        },
      );
    },
  );
}

// Routes

// Get all keys
app.get("/api/keys", (req, res) => {
  db.all("SELECT * FROM keys ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Generate new keys
app.post("/api/keys/generate", (req, res) => {
  const { count } = req.body;
  const keys = [];
  for (let i = 0; i < count; i++) {
    const code = generateKey();
    keys.push(code);
    db.run("INSERT INTO keys (code) VALUES (?)", [code]);
  }
  res.json({ keys });
});

// Delete key
app.delete("/api/keys/:code", (req, res) => {
  const { code } = req.params;
  db.run("DELETE FROM keys WHERE code = ?", [code], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// Activate key
app.post("/api/keys/activate", (req, res) => {
  const { code, name } = req.body;
  db.get(
    "SELECT * FROM keys WHERE code = ? AND used = 0",
    [code],
    (err, key) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!key) return res.status(400).json({ error: "Invalid or used key" });

      const now = new Date().toLocaleString("ru");
      db.run(
        "UPDATE keys SET used = 1, used_by = ?, used_at = ? WHERE code = ?",
        [name, now, code],
      );
      db.run(
        "INSERT OR REPLACE INTO users (name, key_code, activated_at) VALUES (?, ?, ?)",
        [name, code, now],
      );

      res.json({ success: true, user: { name, key: code } });
    },
  );
});

// Get all users
app.get("/api/users", (req, res) => {
  db.all("SELECT * FROM users ORDER BY activated_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add user manually
app.post("/api/users", (req, res) => {
  const { name } = req.body;
  const keyCode = "MANUAL-" + Date.now();
  const now = new Date().toLocaleString("ru");

  db.run(
    "INSERT OR REPLACE INTO users (name, key_code, activated_at) VALUES (?, ?, ?)",
    [name, keyCode, now],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, user: { name, key: keyCode } });
    },
  );
});

// Delete user
app.delete("/api/users/:name", (req, res) => {
  const { name } = req.params;
  db.run("DELETE FROM users WHERE name = ?", [name], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// Admin login
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  db.get(
    "SELECT value FROM admin_settings WHERE key = 'admin_password'",
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (row && row.value === password) {
        res.json({ success: true });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    },
  );
});

// Change admin password
app.post("/api/admin/password", (req, res) => {
  const { newPassword } = req.body;
  if (newPassword.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }
  db.run(
    "UPDATE admin_settings SET value = ? WHERE key = 'admin_password'",
    [newPassword],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    },
  );
});

// Get stats
app.get("/api/stats", (req, res) => {
  const stats = {};
  db.get("SELECT COUNT(*) as total FROM keys", (err, row) => {
    stats.totalKeys = row.total;
    db.get("SELECT COUNT(*) as active FROM keys WHERE used = 0", (err, row) => {
      stats.activeKeys = row.active;
      db.get("SELECT COUNT(*) as used FROM keys WHERE used = 1", (err, row) => {
        stats.usedKeys = row.used;
        db.get("SELECT COUNT(*) as users FROM users", (err, row) => {
          stats.totalUsers = row.users;
          res.json(stats);
        });
      });
    });
  });
});

// Helper function
function generateKey() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let key = "";
  for (let g = 0; g < 3; g++) {
    if (g > 0) key += "-";
    for (let i = 0; i < 4; i++) {
      key += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  return key;
}

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "quiz_pm04_access.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
