import DOMPurify from "dompurify";
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Action, Deities, Rules, Traits } from "../interfaces";
type CacheType = { [key: string]: Data };
const cache: CacheType = {};

type Data = Action[] | Deities[] | Traits[];

const useCache = (): {
  add: (key: string, toBeCached: Data) => void;
  get: (key: string) => Data | undefined;
  remove: (key: string) => void;
} => {
  const add = (key: string, toBeCached: Data) => {
    cache[key] = toBeCached;
  };
  const remove = (key: string) => {
    if (key in cache) {
      delete cache[key];
    }
  };
  const get = (key: string) => {
    if (key in cache) {
      return cache[key];
    }
    return undefined;
  };
  return { add, get, remove };
};

export const useFirebase = (): [data: Data | undefined] => {
  const { add, get } = useCache();
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

  const [data, setData] = useState<Data>();

  useEffect(() => {
    fetchData("actions");
  }, []);

  const firebase = initializeApp(firebaseConfig);

  const db = getFirestore(firebase);

  const fetchData = async (dataType: string) => {
    const dataSelected = dataType as keyof Rules;
    const cachedData = get(dataSelected);
    if (cachedData) {
      console.log("cached", cachedData);
      setData(cachedData);
      return;
    }
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
              add(dataSelected, newData as Action[]);
              setData(newData as Action[]);
              break;
          }
        } catch (e) {
          console.error("error", e);
        }
      })
      .catch((e) => console.error("fetchError", e));
  };

  return [data];
};
