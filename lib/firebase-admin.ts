import admin from "firebase-admin";

const cardApp =
  admin.apps.find((a) => a?.name === "card") ??
  admin.initializeApp(
    {
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_CARD_ID,
        clientEmail: `firebase-adminsdk-fbsvc@${process.env.FIREBASE_PROJECT_CARD_ID}.iam.gserviceaccount.com`,
        privateKey: process.env
          .FIREBASE_PRIVATE_CARD_KEY!.replace(/\\n/g, "\n")
          .trim(),
      }),
    },
    "card",
  );

const barApp =
  admin.apps.find((a) => a?.name === "bar") ??
  admin.initializeApp(
    {
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: `firebase-adminsdk-fbsvc@${process.env.FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`,
        privateKey: process.env
          .FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n")
          .trim(),
      }),
    },
    "bar",
  );

export const dbCard = cardApp.firestore();
export const dbBar = barApp.firestore();
