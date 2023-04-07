export interface FetchOptionProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  cache?: "force-cache" | "no-store";
  headers?: HeadersInit;
  body?: any;
}

export async function fetchModule(
  uri: string,
  option: FetchOptionProps
): Promise<any> {
  const defaultOption: FetchOptionProps = {
    method: option.method,
    cache: option.cache,
    headers: option.headers ?? { "Content-Type": "application/json" },
    body: JSON.stringify(option.body),
  };

  return await fetch(uri, defaultOption).then((res: any) => res.json());
}
