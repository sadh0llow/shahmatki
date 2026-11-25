interface LoaderProps {
  label?: string;
}

export default function Loader({ label = "Загрузка..." }: LoaderProps) {
  return (
    <div className="flex items-center justify-center gap-3 p-8 opacity-70">
      <span className="animate-spin text-2xl">♟️</span>
      <span>{label}</span>
    </div>
  );
}