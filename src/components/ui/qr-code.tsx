import QRCode from "react-qr-code";

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export function QRCodeComponent({ value, size = 200, className }: QRCodeProps) {
  return (
    <div className={className}>
      <QRCode
        value={value}
        size={size}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        viewBox={`0 0 ${size} ${size}`}
      />
    </div>
  );
}