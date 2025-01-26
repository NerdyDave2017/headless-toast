type ToastProps = {
  type: "success" | "error" | "warning" | "info";
  message: string;
  title: string;
};

export const Toast = (props: ToastProps) => {
  return <div className=""></div>;
};
