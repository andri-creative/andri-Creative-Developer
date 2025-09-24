import axios from "axios";

export async function experienceData() {
  const res = await axios.get("http://localhost:8000/api/experience");
  return res.data;
}
