require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const feedbackSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: "Rating must be a whole number from 1 to 5",
    },
  },
  status: {
    type: String,
    enum: ["Pending", "Reviewed"],
    default: "Pending",
  },
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);


app.post("/api/feedback", async (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      return res.status(400).json({ error: "Request body must be a JSON object" });
    }

    const feedback = new Feedback({
      studentName: req.body.studentName,
      courseName: req.body.courseName,
      message: req.body.message,
      rating: req.body.rating,
    });

    await feedback.save();

    res.status(201).json(feedback);

  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ error: error.message });
    }

    console.log(error);
    res.status(500).json({ error: "Could not save feedback" });
  }
});


app.get("/api/feedback", async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);

  if (!Number.isInteger(page) || page < 1 ||
    !Number.isInteger(limit) || limit < 1) {
    return res.status(400).json({
      error: "Page and limit must be positive whole numbers",
    });
  }

  try {
    const totalRecords = await Feedback.countDocuments();

    const feedback = await Feedback.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      feedback: feedback,
      currentPage: page,
      totalRecords: totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retrieve feedback" });
  }
});


app.patch("/api/feedback/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body?.status;

    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      return res.status(400).json({ error: "Request body must be a JSON object" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid feedback ID" });
    }

    if (!["Pending", "Reviewed"].includes(status)) {
      return res.status(400).json({
        error: "Status must be Pending or Reviewed",
      });
    }

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { status: status },
      { new: true, runValidators: true }
    );

    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.json(feedback);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not update feedback" });
  }
});


app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({
      error: "Request body must be valid JSON",
    });
  }

  next(error);
});

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
    process.exit(1);
  });
