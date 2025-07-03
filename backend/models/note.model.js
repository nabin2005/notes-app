import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
     {
    title: {
      type: String,
      maxlength: 50,
      trim: true
    },
    content: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 10,
        message: 'A note can have a maximum of 10 tags.',
      },
    },
    archived: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema)

export default Note