import Swal from "sweetalert2";


export class Alert{

    static mensajeAdd(entidad:string){
        
        Swal.fire({
            icon: 'success',
            title: 'Agregado',
            text: `El ${entidad} se agrego correctamente`,
          })
    }

    static mensajeErrorCustom(cadena:string){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${cadena}`,
          })

    } 

   static mensajeExito(){
        Swal.fire({
            icon: 'success',
            title: 'Operacion Exitosa',
            text: 'La Accion se realizo con exito!',
          })
    }

    static mensajeSinExito(){
        Swal.fire({
            icon: 'error',
            title: 'Operacion Fallida',
            text: 'La Accion no se pudo realizar con exito!',
          })
    }


    static mensajeEliminado(entidad:string){
        Swal.fire(
            'Eliminado!',
            `El ${entidad} ha sido Eliminado`,
            'success'
          )
    }

    static mensajeExitoToast(entidad?:string){
        Swal.fire({
            icon: 'success',
            title: 'Operacion Exitosa',
            toast: true,
            position:"top-end",
            timer: 3000,
            timerProgressBar: true,
            text: entidad ? entidad : 'La Accion se realizo con exito!',
            showConfirmButton:false
           
          })
    }

    static mensajeSinExitoToast(entidad?:string){
        Swal.fire({
            icon: 'error',
            title: 'Operacion Fallida',
            toast: true,
            position:"top-end",
            timer: 3000,
            timerProgressBar: true,
            text: 'La Accion no se pudo realizar con exito!',
            showConfirmButton:false
        })
    } 
}