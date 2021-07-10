import { updateParts, getParts } from "../../helper/index";
import { dbConnect } from "../../utils/dbConnect";
const index = async (req, res) => {
  dbConnect();
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const body = await JSON.parse(req.body);
        if (body[1] !== undefined) {
          req.sort = body[1];
        }

        let parts = await getParts(body[0] || body, req.sort || 0);
        return res.status(200).json({ success: true, data: parts });
      } catch (error) {
        return res.status(500).json({ success: false, error: error });
      }

    default:
      res.setHeaders("Allow", ["POST"]);
      return res.status(405).json({ success: false }).end(`Method ${method} Not Allowed`);
  }
};

export default index;
