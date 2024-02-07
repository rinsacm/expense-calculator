const express = require("express");
const router = express.Router();
const dbconfig = require("../config/dbconfig");

router.post("/add-expense-data", async (req, res, next) => {
  let expense = req.body;
  expense.date = new Date(expense.date);
  expense.amount = parseFloat(expense.amount);
  console.log(req.body);
  try {
    let collection = dbconfig.get().collection("expenses");
    const result = await collection.insertOne(expense);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.toString(),
      success: false,
    });
  }
});
router.post("/get-expense-for-month", async (req, res, next) => {
  let body = req.body;
  let year = body.year;
  let month = body.month;

  try {
    let collection = dbconfig.get().collection("expenses");
    let result = await collection
      .aggregate([
        {
          $match: {
            $expr: {
              $and: {
                $eq: [{ $year: "$date" }, year],
                $eq: [{ $month: "$date" }, month],
              },
            },
          },
        },
        {
          $project: {
            category: "$category",
            year: { $year: "$date" },
            month: { $month: "$date" },
            expense: "$amount",
          },
        },
        {
          $group: {
            _id: "$category",

            totalAmount: { $sum: "$expense" },
          },
        },
      ])
      .toArray();
    console.log(result);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: e.toString(),
      success: false,
    });
  }
});
module.exports = router;
