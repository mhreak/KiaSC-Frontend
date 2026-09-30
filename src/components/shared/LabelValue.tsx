interface LabelValueProps {
  label: string;
  value: string | number;
}

export default function LabelValue({ label, value }: LabelValueProps) {
  return (
    <div className="flex items-center gap-1">
      <span className="font-bold ">{label + ":"}</span>
      <span className="text-text">{value}</span>
    </div>
  );
}
