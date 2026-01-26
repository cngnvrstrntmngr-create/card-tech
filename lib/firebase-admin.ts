import admin from "firebase-admin";

const PRIVATE_CARD = `-----BEGIN PRIVATE KEY-----\n${process.env.FIREBASE_PRIVATE_CARD_KEY}\nrga3Z1Frd3uc2fr5GEgF2bRFo29P3INzmCsek3ukhL3jvVMIEMxn13ykPvTs/zay\ndTOSMIDVWG4PbykLeMqEM0onlkSDBJDmb04XSwJu52byc1oJkJe0wQlusZzmuKn9\nPdSCtNg6IN+wJ/pqx9t2iGlUljl/ylA32drbtVx9L3pk2++0AUsEEZBmkclOetpm\nHIvPFXWxUS0rxR8K2O6SkbzsYWlk8nrM+jziuSmJ+prXZKebHtmOTpFiI5cIECrS\n3AnqfDmVHzSZi/bQ4p7wWU2OCVvoZOu8T4q6cstlWvYh3jk8LOUkMwjqB0gRAmD1\nU52CvTX7AgMBAAECggEABMNS7EBqbjcg+itnuHCNjwKvOEjHRFTDmZyaFQFC4Cxk\nNzwiqKDh2rUdg/awgxXBRSim7hJRXbgIGN7euhlgwkcMBHSLv1RUh3MXwO3cIA+t\nGk6i+Z9nohuifTTiCyGEP9HlTGlEbkZlCKKGrLwIkj4mXZe/3hkMVC8DaICHg0Rl\nW2UFz4QD/uDtDEKj2KxMPJnqMMDd4+TJQe8k+oyV8tMdwc08e5B+os7NJeJ4DXxm\nYZ/DAq+RdChztr7YdiOOs6BvAzJ03oKhE83LqP7vAu4ut+8ZNKneeyhtbNfe2qPD\n8kGbQIeQXGHgd6FucP7sECRSJrNp4MvPsBsDRIkvUQKBgQD+FJSKkFSmKBOsCotl\nPX3pgGxMfrUSdlhpr0MekP1yFFrQ0BC7mTV/97Vw3DU/V6+sFsoMuZfOReOuk850\nXSvflNJvbq64jLmqVgtvEQejxWEKeQuFdmdJ/Ye2motnrodIXwXPPJuJ+zRk2SjX\n2Pjho2/D3yCNUl55r8YfAK+ENQKBgQD0p3KGPHEXl6AMq3w2lhDSwEtgqN0x+Nif\nf1yPXkD2EmghIud/v+2i2SCrX4GkkR5VL06WteOMbQ+Ri7pYBAHllyo3rBUy0XdW\nLwX8wyaRXSDqARL4WOitd3PIvaFYEbQfsY37omPtt2SZpvr4pg2vZQqA3LeeAN0E\nyMxuFL23bwKBgHlgw4VeZdHqm1s4vlbjBV+jJhl0/nOPbbUvMNVNVoZFCw1uGFBG\nZLR5VYhQ6m8UKKwBRwzFLKwx3w7rNVmJmQf6RH1PVtB7CcdBy7yHWir2g+FI6iQb\n6EQEhezJ74bcbWw5WMEjpvpHs0PqKgTTdjH0rdPYp+hbTR68xdzRqwdxAoGBANBY\npSQB5wGDY45Gn4JQ68S+c7K+O5jp5Xh22tlRGBs2c6z8b48QYIwVQkgPDnWaC+3Z\nWqDoBv84hVCaYLfBuefOgupkRq0/StR/OScW/go+99+vyHrsJEJNfrHOI8+/S9jN\nuS85DMaNLkPXutTzfKYIcxhoXopVC+OeKNH6IdJLAoGBAM3zZUaSegwtvx06zfIO\nQ/wfidZqb397EaUNFerlpw6XL+xe0ryUOVj49ojGD+fQvpz1YtE8KpbEPcC2I9WN\n7WOhOpJqGnSsxVnyZi2FQ185ft26OxfASg8o+lmDMW6Ibqe4Pumoar0U1Mt5UFkr\nCrWs7l2QlhwObVXIPepSLK80\n-----END PRIVATE KEY-----\n`;

const cardApp =
  admin.apps.find((a) => a?.name === "card") ??
  admin.initializeApp(
    {
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_CARD_ID,
        clientEmail: `firebase-adminsdk-fbsvc@${process.env.FIREBASE_PROJECT_CARD_ID}.iam.gserviceaccount.com`,
        privateKey: PRIVATE_CARD!.replace(/\\n/g, "\n").trim(),
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
