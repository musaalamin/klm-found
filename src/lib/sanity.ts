import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "4goyjcfy", // Find this at manage.sanity.io
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Set to false for the most up-to-date data
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}