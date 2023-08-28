import { defineEndpoint } from "@directus/extensions-sdk";
import { getReqServiceOptions } from "../utils/api.util";

export default defineEndpoint({
  id: "ml-ops",
  handler: (router, context) => {
    router.post("/train/:model", (req, res) => {
		const mlOpsService: ItemsService = new context.services.ItemsService("ml_ops", getReqServiceOptions(context.database, req));
		const opsData = mlOpsService.
		context
		;
		console.log(req.params.model);
		
      res.send("Hello, World!");
    });
  },
});
