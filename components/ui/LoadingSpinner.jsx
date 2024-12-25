export default function LoadingSpinner(props) {
  const { className, height, width, ...rest } = props;

  return (
    <div
      style={{ borderTopColor: "transparent", height, width }}
      className={`text-shell animate-spin mx-2 w-6 h-6 border-4 rounded-full ${className}`}
      {...rest}
    />
  );
}
