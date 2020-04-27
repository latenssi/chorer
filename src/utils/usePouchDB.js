import React from "react";

import PouchDB from "pouchdb";

const dbName = process.env.REACT_APP_DB_NAME || "chorer-dev";
const remoteDbUrl = process.env.REACT_APP_DB_URL;

export function usePouchDB() {
  const [state, setState] = React.useState({});

  const remoteDB = React.useRef();
  const localDB = React.useRef();

  const updateState = () => {
    if (!localDB.current) return;

    localDB.current.allDocs({ include_docs: true }).then((res) =>
      setState(
        res.rows.reduce(
          (acc, { doc }) => ({
            ...acc,
            [doc.type]: [...(acc[doc.type] || []), doc],
          }),
          {}
        )
      )
    );
  };

  React.useEffect(() => {
    localDB.current = new PouchDB(dbName);

    if (remoteDbUrl) {
      remoteDB.current = new PouchDB(`${remoteDbUrl}/${dbName}`);
    }

    if (localDB.current && remoteDB.current) {
      localDB.current
        .sync(remoteDB.current, {
          live: true,
          retry: true,
        })
        .on("change", updateState);
    } else if (localDB.current) {
      localDB.current.changes({ live: true }).on("change", updateState);
    }

    updateState();
  }, []);

  return [state, localDB.current];
}
