import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { logger } from './Logger.ts'

export default class Pop {
  static async confirm(
    title: string = 'Are you sure?',
    text: string = "You won't be able to revert this!",
    confirmButtonText: string = 'Yes',
    icon: 'success' | 'error' | 'info' | 'warning' | 'question' = 'warning'
  ) {
    try {
      const res = await Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: 'var(--bs-primary)',
        cancelButtonColor: 'var(--bs-secondary)'
      })

      if (res.isConfirmed) {
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  static toast(
    title: string = 'Warning!',
    icon: 'success' | 'error' | 'info' | 'warning' | 'question' = 'warning',
    position:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'center'
      | 'center-start'
      | 'center-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end' = 'top-end',
    timer: number = 3000,
    progressBar: boolean = true
  ) {
    Swal.fire({
      title,
      icon,
      position,
      timer,
      timerProgressBar: progressBar,
      toast: true,
      showConfirmButton: false
    })
  }

  static error(error: Error | string, eventTrigger: string = '') {
    logger.error(eventTrigger, error)
    // @ts-ignore
    this.toast(error.message || error, 'error')
  }

  static success(message: string = 'Success!') {
    this.toast(message, 'success')
  }
}
