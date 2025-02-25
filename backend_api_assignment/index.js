const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Import routes (they should be functions, not objects)
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

// (Optional) Log the type of the imported routes to check:
console.log("authRoutes type:", typeof authRoutes);         // Should print: function
console.log("productRoutes type:", typeof productRoutes);   // Should print: function

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Database connection and server start...
const sequelize = require("./config/database");
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
    return sequelize.sync();
  })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => console.error("Database connection failed:", error));
