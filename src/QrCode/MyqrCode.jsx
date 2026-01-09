import { QRCodeCanvas } from "qrcode.react";

function MyQRCode({ id_contrat, id_parking }) {
  if (!id_contrat || !id_parking) return null;
  const qrData = `${id_parking};${id_contrat}`;

  return (
    <div>
      <h3>Mon QR Code</h3>
      <QRCodeCanvas value={qrData} size={200} />
    </div>
  );
}

export default MyQRCode;
