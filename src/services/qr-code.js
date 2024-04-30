const principalURL = process.env.REACT_APP_URL_PRINCIPAL;

//Todo: URLs
const QRCodeURL = 'qr-code'

export const createQRCode = async(dato) => {
  const text = 'Tu texto o URL aquí';
    const size = '1000x1000';
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(dato)}&size=${size}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Error al generar el código QR');
      }
      const qrCodeBlob = await response.blob();
      
      return qrCodeBlob
    } catch (error) {
      throw new Error(error.message)
    }
}