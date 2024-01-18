import { data } from "./data";

export default function handler(req, res) {
  const id = req.query.id;

  const item = data.find((item) => item.id === id);

  res.status(200).json(item);
}
