import fetch from "node-fetch";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const { API_KEY } = process.env;
  const { title, page, id } = JSON.parse(request.body);
  const url = id
    ? `https://omdbapi.com?apikey=${API_KEY}&i=${id}&plot=full`
    : `https://omdbapi.com?apikey=${API_KEY}&s=${title}&page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  response.status(200).json(data);
}
