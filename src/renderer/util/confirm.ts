import Swal from 'sweetalert2';

const confirm = async (text: string, func: () => void) => {
  const confirmation = await Swal.fire({
    title: 'Warning!',
    text,
    icon: 'warning',
    confirmButtonText: 'Yes',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#b51919',
  });

  if (confirmation.isConfirmed) {
    func();
  }
};

export default confirm;
