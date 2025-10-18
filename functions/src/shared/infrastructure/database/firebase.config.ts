import admin from 'firebase-admin';
import 'dotenv/config';

const serviceAccountKey = process.env.SERVICE_ACCOUNT_CREDENTIALS;

if (!serviceAccountKey) {
  throw new Error(
    'SERVICE_ACCOUNT_CREDENTIALS environment variable is not set'
  );
}

const serviceAccount = JSON.parse(serviceAccountKey);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export { db };
