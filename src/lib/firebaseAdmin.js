import * as admin from 'firebase-admin';

const serviceAccount = require('../../key_firebase_admin.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'panun-7593c.appspot.com',
  });
}

const bucket = admin.storage();

export { bucket };

