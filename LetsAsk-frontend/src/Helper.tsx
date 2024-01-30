import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import CryptoJS from 'crypto-js';
import toast from "react-hot-toast";

export const ScrollToTop = () => {
    const {pathname} = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    
    return null
}
const secretKey = import.meta.env.VITE_SECRET_KEY

export const storeUser = (data:any) => {
    // console.log(import.meta.env.VITE_SECRET_KEY)
    const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify({
            id: data.user.id,
            username: data.user.username,
            avatar: data.user.avatar,
            userComments: data.user.userComments,
            userArticles: data.user.userArticles,
            jwt: data.jwt
        }),
        secretKey
    ).toString();

    sessionStorage.setItem('user', encryptedData)
}

export const userData = () => {
    const encryptedData = sessionStorage.getItem('user');
    if (encryptedData) {
        try {
            CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
        } catch {
            toast.error("Something went wrong, please Sign in again");
            sessionStorage.removeItem('user');
            return
        }
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    } else {
        return false;
    }

};

export const Logout = () => {
    sessionStorage.removeItem('user');
    toast.success("Logout Successful.");
    return
}
  
  