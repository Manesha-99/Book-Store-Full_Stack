import { bookModel } from "../models/books.js"
import express from "express"
const app = express();
app.use(express.json());
import mongoose from "mongoose";

const router = express.Router();

//-------------CREATE----------------------------------------------------------------------------------------------

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: "please provide details correctly.." });
    }

    const newbook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await bookModel.create(newbook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//----------------------------------GET ALL BOOKS------------------------------------------------------------------

router.get("/", async (req, res) => {
  try {
    const books = await bookModel.find({});
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
  }
});

//------------------------------------GET ONE BOOK BY ID-----------------------------------------------------------

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await bookModel.findById(id);
    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
  }
});

//---------------------------------------UPDATE BOOK BY ID---------------------------------------------------------

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear)
      return res
        .status(400)
        .send({ message: "please provide details correctly.." });

    const { id } = req.params;
    const result = await bookModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Book ID." });
    }

    if (!result) {
      return res.status(404).json({ message: "Book Not Found...." });
    }

    return res.status(200).send({ message: "Book Updated Successfully...." });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid Book ID format." });
    }

    console.log(error.message);
    return res.status(500).json({message: error.message});
  }
});

//---------------------------DELETE BOOK BY ID---------------------------------------------------------------------

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const deletebook = await bookModel.findByIdAndDelete(id);

      if (!deletebook) {
        return res.status(404).json({ message: "Book Not Found...." });
      }
      return res.status(200).json({ message: "Book has been deleted...." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong.... " });
  }
});



export default router