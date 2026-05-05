import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url"; // The logs say this is 'deprecated' but it still works.

export const client = createClient({
  projectId: "4goyjcfy", 
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// The logs suggest using a named export, but if it's working locally, 
// you can leave it or change it to:
// const builder = imageUrlBuilder(client);
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}