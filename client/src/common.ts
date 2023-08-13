import axios from 'axios';
import toast from 'react-hot-toast';

export async function logOut() {
  try {
    await axios.get('/logout');
    localStorage.removeItem('user');
    //   setCurrentUser(null);
    toast.success('Successfully logged out.');
  } catch (err: any) {
    console.log(err);
  }
}
