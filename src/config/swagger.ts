import path from "node:path";
import type { Express } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

/**
 * Setup Swagger UI with OpenAPI YAML
 * @param app Express app instance
 */
export function swaggerConfig(app: Express): void {
	const swaggerDocument = YAML.load(
		path.join(__dirname, "../docs/openapi.yml"),
	);

	app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
