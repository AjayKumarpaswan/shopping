import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password_hash: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: String,
      default: "", // store image URL or filename
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

// Method to compare passwords during login
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password_hash);
};

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password_hash")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password_hash = await bcrypt.hash(this.password_hash, salt);
  next();
});

export default mongoose.model("User", userSchema);
