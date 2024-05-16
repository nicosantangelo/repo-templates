export type ZAFClient = {
  init(): Client;
};

export type Method = "ticket.conversation" | "ticket.author";

export type Error = Record<string, string>;

export type GetResponse = Conversation[];
export type ErrorResponse = Error | Error[];

export type LegacyGet = <T extends Method>(
  method: T,
) => Promise<
  Record<Method, GetResponse> & {
    errors: ErrorResponse;
  }
>;

export type Client = {
  get<T extends GetResponse>(method: Method): Promise<T>;
  invoke(method: string, params: { width: string; height: string }): void;
};

export type ZAFWindow = typeof window & {
  ZAFClient: ZAFClient;
};

export type Conversation = {
  attachments: string[];
  timestamp: string;
  author: {
    id: number;
    avatar: string;
    name: string;
    role: string;
  };
  channel: {
    name: string;
  };
  message: {
    content: string;
    contentType: "text/html";
  };
};
