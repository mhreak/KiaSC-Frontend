type EndpointGroup = {
  endpoint: string;
  actions: Record<string, string>;
};

type ApiEndpoints = Record<string, EndpointGroup>;

export const API_ENDPOINT = {
  athlete: "/Athlete",
};
