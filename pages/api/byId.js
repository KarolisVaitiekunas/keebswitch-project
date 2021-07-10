import { updateParts, getParts, getPartById } from "../../helper/index";
import { dbConnect } from "../../utils/dbConnect";
const index = async (req, res) => {
  dbConnect();
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const body = await JSON.parse(req.body);
        console.log("BODY: ", body);
        let parts = await getPartById(body);
        //console.log("GOTTEN PARTS::::::: ", parts);
        return res.status(200).json({ success: true, data: parts });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error });
      }

    default:
      res.setHeaders("Allow", ["POST"]);
      return res.status(405).json({ success: false }).end(`Method ${method} Not Allowed`);
  }
};

export default index;
