import DOMPurify from "dompurify";
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Action, Rules } from "../interfaces";

export const useFirebase = (): { actions: Action[] | undefined } => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREB_APIKEY,
    authDomain: import.meta.env.VITE_authDomain,
    databaseURL: import.meta.env.VITE_databaseURL,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
    measurementId: import.meta.env.VITE_measurementId,
  };

  const [actions, setActions] = useState<Action[]>();

  useEffect(() => {
    fetchData("actions");
  }, []);

  const firebase = initializeApp(firebaseConfig);

  const db = getFirestore(firebase);

  const fetchData = async (dataType: string) => {
    await getDocs(collection(db, dataType))
      .then((querySnapshot) => {
        try {
          const newData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            if (data.hasOwnProperty("description")) {
              Object.keys(data).forEach(() => {
                if (data.hasOwnProperty("description")) {
                  data["description"] = DOMPurify.sanitize(data.description, {
                    USE_PROFILES: { html: true },
                  });
                }
              });
            }
            return { ...data, id: doc.id };
          });

          switch (dataType) {
            default:
            case "actions":
              setActions(newData as Action[]);
              break;
          }
        } catch (e) {
          console.error("error", e);
        }
      })
      .catch((e) => console.error("fetchError", e));
  };

  return { actions };
};
