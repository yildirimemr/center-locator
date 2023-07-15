export default interface ISnackBar {
  isOpen: boolean;
  severity: "error" | "warning" | "info" | "success";
  message: string;
}
