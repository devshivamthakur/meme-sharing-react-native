import AsyncStorage from "@react-native-async-storage/async-storage";

var CryptoJS = require("crypto-js");


export const  EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const  NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
export const  USERNAME_REGEX = /^[a-zA-Z0-9]+(([',. -][a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$/;
export const aesKey="vbmkvd3YwtzG8B69A4EMNF/8Re8cUv/e9ZZ8buMIOyWr+MX0t2AfUphtzHCLjvrPOme5s7/FhHY4qEXp4zadFQ=="
export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
export const encryptData = (params) => {
    let data = params;
    let ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      aesKey
    ).toString();
    return ciphertext;
  };
  
  export const decryptData = (params) => {
    // Decrypt
    let bytes = CryptoJS.AES.decrypt(params, aesKey);
    let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    let data = isJsonString(decryptedData)
      ? JSON.parse(decryptedData)
      : decryptedData;
    return data;
  };

  export const saveToAsyncStorage = (key, value) => {
    
    return new Promise((resolve, reject) => {
      let encryptedValue = encryptData(value);
      AsyncStorage.setItem(key, encryptedValue)
        .then((response) => {
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  export const getAsyncStorage = (key) => {
   
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key)
        .then((response) => {
          let decryptedValue = response != null ? decryptData(response) : "";
          resolve(decryptedValue);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const deleteAsyncStorage=(key)=>{

    return new Promise((resolve, reject)=>{
      AsyncStorage.removeItem(key).then((value)=>{
        resolve(value);
      }).catch((err)=>{
        reject(err);
      })

    })

  }
export function formatNumber(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'b';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

export const environment ="testnet"