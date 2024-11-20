import { fetcher } from "@/lib/instance";

export const userDataService = {
  getUsers() {
    return fetcher.get("/user");
  },
  postUser(data) {
    return fetcher.post("/user", data);
  },
};
