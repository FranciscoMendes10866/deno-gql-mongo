import { createYoga } from "graphql-yoga";
import { serve } from "server";

import { schema } from "./gql/index.ts";

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/graphql",
});

serve(yoga, {
  onListen: ({ hostname, port }) => {
    console.log(
      `Listening on http://${hostname}:${port}${yoga.graphqlEndpoint}`,
    );
  },
});
