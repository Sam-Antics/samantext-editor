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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to samantext db');

  const samantextDb = await openDB('samantext_db', 1);

  const tx = samantextDb.transaction('samantext', 'readwrite');

  const store = tx.objectStore('samantext');

  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('data saved to samantext', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
