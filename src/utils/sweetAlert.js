export const sweetAlert = (title, icon)=>{
    Swal.fire({
      position: "top-center",
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 1500
    });
  
  }