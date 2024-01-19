// backend/api/course.js
import mongoose from "mongoose";
import Course from "../../backend/models/course";

const connectDB = async () => {
  
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://dishijain:0XFSpF35ZBZNkOR6@cluster0.rmg499r.mongodb.net/intellify?retryWrites=true&w=majority"
    );
    console.log("DB Connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};
connectDB()

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, description, slug } = req.body;

      const course = new Course({ name, description, slug });
      await course.save();

      res.json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      const courses = await Course.find().populate("modules");
      res.json(courses);
    } catch (error) {
      console.error(error);
      console.log("idhar tk aa gya")
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (
    req.method === "GET" &&
    req.query.courseId &&
    req.query.action === "modules"
  ) {
    try {
      const courseId = req.query.courseId;

      const course = await Course.findById(courseId).populate({
        path: "modules",
        populate: { path: "slides" },
      });

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      res.json(course.modules);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
