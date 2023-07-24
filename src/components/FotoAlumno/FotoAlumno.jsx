import '../../assets/css/components/FotoAlumno.css'

import { Toaster, toast } from 'sonner'

function FotoAlumno(props) {
  const { className, titulo, valor, cambiarValor, tipo, foto, setFoto, required, classInput } = props

  function clickFoto() {
    const file = document.querySelector(`.${classInput}`)
    file.click()
  }

  function elegirFoto(e) {
    const fotos = e.target.files;
    let supportedImages = ["image/png", "image/jpeg", "image/jpg"];

    if(fotos.length > 0) {
      const reader = new FileReader();

      if(supportedImages.indexOf(fotos[0].type) !== -1) {
        createPreview(fotos[0]);
        reader.readAsDataURL(fotos[0]);
      }

      else {      
        toast.error('Archivo no valido')
      }
    }
  }
  
  function createPreview(file) {
    let fotoURL = URL.createObjectURL(file);
    setFoto(fotoURL)
    cambiarValor(file)
  };

  return (
    <div className={`container-foto-perfil-alumno ${className}`}>
      <Toaster 
        position="top-center"
        expand={false}
        richColors
      />
      <h3 className='foto-perfil__titulo'>{titulo}</h3>
      <div className='foto-perfil__caja-alumno'>
        <div className="foto-perfil__alumno" onClick={clickFoto}>
          {
            tipo === false && foto ? <img className='foto-alumno' src={foto} alt="Foto de perfil del alumno" /> : <></>
          }
          {
            tipo && foto === false ? <img className='foto-alumno' src={valor} alt="Foto de perfil del alumno" /> : <></>
          }
          {
            tipo && foto ? <img className='foto-alumno' src={foto} alt="Foto de perfil del alumno" /> : <></>
          }
        </div>
      </div>
        <input className={`imagen ${classInput}`} type="file" name="images[]" required={required} onChange={elegirFoto} />
    </div>
  );
}

export default FotoAlumno