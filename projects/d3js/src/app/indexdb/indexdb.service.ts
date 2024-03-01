import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class IndexdbService {
  db: IDBDatabase;
  @Output() dbObj: EventEmitter<IDBDatabase> = new EventEmitter();
  private openOrCreateDB: IDBOpenDBRequest;

  constructor() {}

  init() {
    const name = "csv_data";
    const keypath = "name";
    this.openOrCreateDB = window.indexedDB.open("my_database", 5);

    this.openOrCreateDB.onupgradeneeded = (event: any) => {
      this.db = event.target.result;
      if (!this.db.objectStoreNames.contains(name)) {
        // Check if the store exists
        // const options = { keyPath: keypath }; // Set 'id' property as the key path
        this.db.createObjectStore(name);
      }
    };

    this.openOrCreateDB.onerror = (event: any) => {
      console.error("Error opening database:", event.target.error);
    };

    this.openOrCreateDB.onsuccess = (event: any) => {
      console.log("Database opened successfully!");
      this.db = event.target.result;
      this.dbObj.emit(event.target.result);
    };
  }

  addItem(value: string, key: string) {
    const item = value;
    const tx = this.db.transaction("csv_data", "readwrite");
    const store = tx.objectStore("csv_data");
    store.add(item, key);
  }

  async getItem(key: string) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(["csv_data"], "readonly");
      const store = tx.objectStore("csv_data");
  
      store.get(key).onsuccess = (event: any) => {
        const retrievedData = event.target.result;
        console.log(retrievedData);
        if (retrievedData) {
          resolve(retrievedData);
        } else {
          reject(undefined);
        }
      };
  
      store.get(key).onerror = (event: any) => {
        console.error("Error retrieving data:", event.target.error);
        reject(event.target.error);
      };
    });
  }

  updateItem(value: string, key: string) {
    const tx = this.db.transaction("csv_data", "readwrite");
    const store = tx.objectStore("csv_data");
    store.put(value, key);
  }

  deleteItem(key: string) {
    const tx = this.db.transaction("csv_data", "readwrite");
    const store = tx.objectStore("csv_data");
    store.delete(key);
  }

  closeDB() {
    this.db.close();
  }
}
