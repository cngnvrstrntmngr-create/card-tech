import admin from "firebase-admin";

// card
const privateKeyCard =
  (process.env.FIREBASE_PRIVATE_CARD_KEY_1 ?? "") +
  (process.env.FIREBASE_PRIVATE_CARD_KEY_2 ?? "") +
  (process.env.FIREBASE_PRIVATE_CARD_KEY_3 ?? "") +
  (process.env.FIREBASE_PRIVATE_CARD_KEY_4 ?? "");

const normalizedPrivateKeyCard = privateKeyCard.replace(/\\n/g, "\n").trim();
const cardApp =
  admin.apps.find((a) => a?.name === "card") ??
  admin.initializeApp(
    {
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_CARD_ID,
        clientEmail: `firebase-adminsdk-fbsvc@${process.env.FIREBASE_PROJECT_CARD_ID}.iam.gserviceaccount.com`,
        privateKey: normalizedPrivateKeyCard!,
      }),
    },
    "card",
  );

// bar
const privateKeyBar =
  (process.env.FIREBASE_PRIVATE_KEY_1 ?? "") +
  (process.env.FIREBASE_PRIVATE_KEY_2 ?? "") +
  (process.env.FIREBASE_PRIVATE_KEY_3 ?? "") +
  (process.env.FIREBASE_PRIVATE_KEY_4 ?? "");

const normalizedPrivateKeyBar = privateKeyBar.replace(/\\n/g, "\n").trim();
const barApp =
  admin.apps.find((a) => a?.name === "bar") ??
  admin.initializeApp(
    {
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: `firebase-adminsdk-fbsvc@${process.env.FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`,
        privateKey: normalizedPrivateKeyBar!,
      }),
    },
    "bar",
  );

export const dbCard = cardApp.firestore();
export const dbBar = barApp.firestore();
