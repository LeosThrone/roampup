import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPasswordReset extends Document {
  email: string;
  code: string;
  expiresAt: Date;
  createdAt: Date;
}

const PasswordResetSchema = new Schema<IPasswordReset>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      expires: 0, // MongoDB TTL index automatically removes expired reset codes
    },
  },
  {
    timestamps: true,
  }
);

const PasswordReset: Model<IPasswordReset> =
  mongoose.models.PasswordReset ||
  mongoose.model<IPasswordReset>("PasswordReset", PasswordResetSchema);

export default PasswordReset;
