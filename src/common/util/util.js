import rc4 from './rc4'
import config from './config'

export default {
    toRc4(data) {
        const str = data;
        let key = config.ENCRYPT_KEY;
        let iv = '';
        key = rc4.CryptoJS.enc.Latin1.parse(key);
        iv = rc4.CryptoJS.enc.Latin1.parse(iv);
        let encrypted = rc4.CryptoJS.RC4.encrypt(str, key, {
            iv: iv
        });
        encrypted = encrypted.toString();
        return encrypted;
    },
    decRc4(data) {
        let key = config.ENCRYPT_KEY;
        let iv = '';
        key = rc4.CryptoJS.enc.Latin1.parse(key);
        iv = rc4.CryptoJS.enc.Latin1.parse(iv);
        let decrypted = rc4.CryptoJS.RC4.decrypt(data, key, {
            iv: iv
        });
        decrypted = rc4.CryptoJS.enc.Latin1.stringify(decrypted);
        return decrypted
    },
    encodedURL(data) {
        const params = [];
        for (const key in data) {
            params.push(`${key}=${data[key]}`);
        }
        return params.join('&');
    }
}