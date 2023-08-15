import axios from 'axios';
import toast from 'react-hot-toast';

export async function logOut() {
  try {
    await axios.get('/logout');
    localStorage.removeItem('user');
    toast.success('Successfully logged out.');
  } catch (err: any) {
    if (err.response) {
      if (err.response.data) toast.error(err.response.data);
    }
    if (err.message) {
      toast.error(err.message);
    }
  }
}
