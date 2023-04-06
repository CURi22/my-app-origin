interface OptionProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  cache?: "force-cache" | "no-store";
  headers?: HeadersInit;
  body?: any;
}

export interface FetchModuleParams {
  uri: string;
  option: OptionProps;
}

export async function fetchModule({
  uri,
  option,
}: FetchModuleParams): Promise<any> {
  const defaultOption: OptionProps = {
    method: option.method,
    cache: option.cache,
    headers: option.headers ?? { "Content-Type": "application/json" },
    body: JSON.stringify(option.body),
  };

  return await fetch(uri, defaultOption).then((res: any) => res.json());
}
