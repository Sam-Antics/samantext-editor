import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

const initdb = async () =>
  openDB('samantext_db', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('samantext')) {
        console.log("The text editor's database already exists");
        return;
      }
      db.createObjectStore('samantext', { keyPath: 'id', autoIncrement: true });
      console.log('samantext database created');
    },
  });

// ✅Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to samantext db');
  
  // connect to database
  const samantextDb = await openDB('samantext_db', 1);

  // create transaction
  const tx = samantextDb.transaction('samantext', 'readwrite');

  // open the desired object store
  const store = tx.objectStore('samantext');

  // use the .put() method to update an object
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('data saved to samantext', result);
};

// ✅Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from samantext');

  const samantextDb = await openDB('samantext_db', 1);

  const tx = samantextDb.transaction('samantext', 'readonly');

  const store = tx.objectStore('samantext');

  // use the .getAll() method to get all data in the database
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();