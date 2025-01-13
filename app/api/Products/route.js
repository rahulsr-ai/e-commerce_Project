
const { dbConnect } = require("@/lib/db");

export async function POST(req, res) {
  await dbConnect();
  return res.json({
    message: "hello world",
  });
}