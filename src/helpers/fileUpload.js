export const fileUpload = async (file) => {
  if (!file) throw new Error('No hay archivo seleccionado');

  const cloudURL = `https://api.cloudinary.com/v1_1/dk6pyc5a7/upload`;

  const formData = new FormData();

  formData.append('upload_preset', 'instav2');
  formData.append('file', file);

  try {
    const resp = await fetch(cloudURL, {
      method: 'POST',
      body: formData,
    });

    if (!resp.ok) throw new Error('Error al subir el archivo');

    const cloudResp = await resp.json();

    // console.log({ cloudResp });

    // Return secure url, format and bytes

    return {
      id: cloudResp.public_id,
      url: cloudResp.secure_url,
    };
  } catch (error) {
    console.log(error);
    return false;
  }
};
