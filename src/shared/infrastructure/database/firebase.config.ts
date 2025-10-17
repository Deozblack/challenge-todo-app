import * as admin from 'firebase-admin';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT as string;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export { db };
