import { updateParts } from "../../helper/index";
import { dbConnect } from "../../utils/dbConnect";
const index = async (req, res) => {
  dbConnect();
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        updateParts(req.body);
        return res.status(201).json({ success: true });
      } catch (error) {
        return res.status(500).json({ success: true, error: error });
      }

    default:
      res.setHeaders("Allow", ["POST"]);
      return res.status(405).json({ success: false }).end(`Method ${method} Not Allowed`);
  }
};

export default index;
