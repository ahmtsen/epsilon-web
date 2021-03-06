import { useHistory } from "react-router";
import { ClientOptions, Exchange, fetchExchange } from "urql";
import { pipe, tap } from "wonka";

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  const router = useHistory();
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error) {
        if (error.message.includes("not authenticated")) {
          router.replace("/login");
        }
      }
    })
  );
};
export const createUrqlClient = (): ClientOptions => {
  return {
    url: process.env.REACT_APP_SERVER_ORIGIN + "/graphql",
    fetchOptions: {
      credentials: "include" as const, // in order to send cookie to graphql server
    },
    exchanges: [errorExchange, fetchExchange],
  };
};
