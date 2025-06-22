import { app } from "./api/app";
import { env } from "./config/env";
import { logger } from "./config/logger";

app.listen(env.PORT, () => {
	logger.info(`server running in port ${env.PORT}`);
});
