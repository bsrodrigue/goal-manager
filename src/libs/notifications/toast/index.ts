import { toast } from "react-toastify";

export const Toaster = {
  success: (message?: string) => toast(message || "Success", { type: "success" }),
  error: (message?: string) => toast(message || "Error", { type: "error" }),
}
