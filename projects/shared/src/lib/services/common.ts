import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class Common {
  /**
   * Stores a string value in the browser's localStorage after encrypting it using AES encryption.
   *
   * @param {string} key - The key under which the encrypted value will be stored in localStorage.
   * @param {string} value - The plain string value to encrypt and store.
   *
   * @returns {void} This function does not return anything.
   *
   * @example
   * common.setLocalStore('username', 'john_doe');
   */
  setLocalStore(key: string, value: string): void {
    const encryptedData: string = CryptoJS.AES.encrypt(JSON.stringify(value), 'secret').toString();
    localStorage.setItem(key, encryptedData);
  }

  /**
   * Retrieves a value from the browser's localStorage and decrypts it using AES encryption.
   *
   * @param {string} key - The key of the item to retrieve from localStorage.
   *
   * @returns {string | null} Returns the decrypted string value if found and successfully decrypted, otherwise null.
   *
   * @throws {Error} Throws an error if decryption fails.
   *
   * @example
   * const username = common.getLocalStore('username'); // returns 'john_doe'
   */
  getLocalStore(key: string): string | null {
    const localData = localStorage.getItem(key);

    if (localData) {
      const decodedData = CryptoJS.AES.decrypt(localData, 'secret').toString(CryptoJS.enc.Utf8);

      if (!decodedData) {
        throw new Error('Decryption Failed');
      }

      return JSON.parse(decodedData);
    }

    return null;
  }
}
