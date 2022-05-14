import { mediaUrl } from "./settings/api.js";
import { getToken } from "./utils/storage.js";

const token = getToken();

const headers = {
  // "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export async function getUploads() {
  const response = await fetch(mediaUrl, {
    headers,
  });
  const result = await response.json();
  console.log(result);
  return result;
}
