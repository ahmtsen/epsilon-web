import { useEffect } from "react";
import { useHistory } from "react-router";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = (): void => {
  const [{ data, fetching }] = useMeQuery();
  const router = useHistory();
  useEffect(() => {
    // If user is not logged in send to login page
    if (!fetching && !data?.me) {
      router.push("/login");
    }
  }, [fetching, data, router]);
};
