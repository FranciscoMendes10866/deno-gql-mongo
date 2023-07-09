import { buildSchema } from "garph";

import { resolvers } from "./resolvers.ts";
import { g } from "./schema.ts";

export const schema = buildSchema({ g, resolvers });
