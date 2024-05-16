import { Client, ErrorResponse, LegacyGet, Method, ZAFWindow } from "./types";

export function getClient(): Client {
  const client = (window as ZAFWindow).ZAFClient.init();
  const legacyGet = client.get.bind(client) as LegacyGet;

  client.invoke("resize", { width: "100%", height: "800px" });

  return {
    ...client,
    get: async <T>(method: Method) => {
      const response = await legacyGet(method);

      if (hasResponseErrors(response.errors)) {
        throw new Error(`Response error: ${JSON.stringify(response.errors)}`);
      }

      return response[method] as T;
    },
  };
}

function hasResponseErrors(errors: ErrorResponse) {
  return (
    (Array.isArray(errors) && errors.length > 0) ||
    Object.keys(errors).length > 0
  );
}
