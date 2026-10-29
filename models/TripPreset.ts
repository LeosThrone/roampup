import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITripPreset extends Document {
  userId: string;
  name: string;
  origin: string;
  destination: string;
  distance: string;
  duration: string;
  vehicleType: "2-Wheeler" | "4-Wheeler" | "EV";
  vehicleLabel: string;
  costEstimate: string;
  description: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TripPresetSchema: Schema<ITripPreset> = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Preset name is required"],
      trim: true,
      maxlength: [120, "Name cannot exceed 120 characters"],
    },
    origin: {
      type: String,
      required: [true, "Origin location is required"],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, "Destination location is required"],
      trim: true,
    },
    distance: {
      type: String,
      default: "0 km",
    },
    duration: {
      type: String,
      default: "0h 0m",
    },
    vehicleType: {
      type: String,
      enum: ["2-Wheeler", "4-Wheeler", "EV"],
      default: "2-Wheeler",
    },
    vehicleLabel: {
      type: String,
      default: "2-Wheeler Run",
    },
    costEstimate: {
      type: String,
      default: "~$0 est.",
    },
    description: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const TripPreset: Model<ITripPreset> =
  mongoose.models.TripPreset ||
  mongoose.model<ITripPreset>("TripPreset", TripPresetSchema);

export default TripPreset;
