import { updateStoresWorkflow } from "@medusajs/core-flows"
import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const { result } = await updateStoresWorkflow(req.scope).run({
    input: {
      selector: {
        id: "store_qedix_benchmark",
      },
      update: {
        name: "Updated through maintenance endpoint",
      },
    },
  })

  res.status(200).json({
    store: result[0],
  })
}
