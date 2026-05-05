import { createClient } from "@next-sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "your_project_id", // Double check this matches your Sanity dashboard
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}