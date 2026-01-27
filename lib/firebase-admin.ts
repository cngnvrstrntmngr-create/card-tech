import admin from "firebase-admin";

const PART_2 =
  "5pbQcH/vBIhWHVC/qZOQhqZ6lTHvGTLU1VJ4yMAKwQKBgQD3zR4Zkihswy+OdguP\nScSljNzy5hSSNp0wNuFZLuupaEQPDuwSsBj8ctbUxBfWxRgqsE4Cpc+9uZNARgos\n52pUiqcBsl1c+/aLGUhcV1mTXK8ISQrYcevnWbTGMukU1UkKrQd0i6/vgaQt6Iij\ngxWkNApL1aT2jGfyaEU3dFvaSQKBgQDq/GIFbMBnf1iTP0+OrAHOjjE0upzfX33Z\nUhdchZGH6gfWFqyNgyrux0tvXYctH92MpOhCI4b+MLf7beCjcrweCNT4Ag+Gs6Dn\nFDGTlaKAv0CYLFajv59bTO/Gd6FDoPRNtATiftOjvUD7E7OIoy6S7nUl9LqfGvYy\naVD3+GOy2QKBgQDee6pPuRtUc3aKSNAeKVRGcw+ZghvsHt7IgC2Znff2VOfuQS6R";
const PART_CARD_2 =
  "KBgQD0p3KGPHEXl6AMq3w2lhDSwEtgqN0x+Nif\nf1yPXkD2EmghIud/v+2i2SCrX4GkkR5VL06WteOMbQ+Ri7pYBAHllyo3rBUy0XdW\nLwX8wyaRXSDqARL4WOitd3PIvaFYEbQfsY37omPtt2SZpvr4pg2vZQqA3LeeAN0E\nyMxuFL23bwKBgHlgw4VeZdHqm1s4vlbjBV+jJhl0/nOPbbUvMNVNVoZFCw1uGFBG\nZLR5VYhQ6m8UKKwBRwzFLKwx3w7rNVmJmQf6RH1PVtB7CcdBy7yHWir2g+FI6iQb\n6EQEhezJ74bcbWw5WMEjpvpHs0PqKgTTdjH0rdPYp+hbTR68xdzRqwdxAoGBANBY\npSQB5wGDY45Gn4JQ68S+c7K+O5jp5Xh22tlRGBs2c6z8b48QYIwVQkgPDnWaC+3Z\nWqDoBv84hVCaYLfBuefOgupkRq0/StR/OScW/go+99+vyHrsJEJNfrHOI8+/S9jN\nuS85DMaNLkPXutTzfKYIcxhoXopVC+OeKNH6IdJ";
// card
const privateKeyCard =
  (process.env.FIREBASE_PRIVATE_CARD_KEY_1 ?? "") +
  PART_CARD_2 +
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
  PART_2 +
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
