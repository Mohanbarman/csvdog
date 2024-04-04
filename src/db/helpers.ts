import initSqlJs from "sql.js";

const ALPHABETS_LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const ALPHABETS_UPPERCASE = ALPHABETS_LOWERCASE.toUpperCase();
const NUMBERS = "0123456789";

/*
 * Letters, numbers, dollar signs ($), and underscores (_) are allowed, but the first character must be a letter.
 * Column name and field name have same rules
 * */
export const assertFieldName = (name: string) => {
  if (!name) return;
  const firstCharCode = name.charCodeAt(0);

  const isFirstAlphabet =
    (firstCharCode >= 65 && firstCharCode <= 90) ||
    (firstCharCode >= 97 && firstCharCode <= 122);

  if (!isFirstAlphabet) {
    throw new Error("first character should be an alphabet");
  }

  const allowedCharacters = [
    ...ALPHABETS_LOWERCASE.split(""),
    ...ALPHABETS_UPPERCASE.split(""),
    ...NUMBERS.split(""),
    "$",
    "_",
  ];

  name.split("").forEach((i) => {
    if (allowedCharacters.includes(i)) return;
    throw new Error(`Column name contains illegal character ${i}`);
  });
};

export const createDatabase = async () => {
  const SQL = await initSqlJs({
    locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
  });
  const db = new SQL.Database();
  // NOTE: You can also use new SQL.Database(data) where
  // data is an Uint8Array representing an SQLite database file

  // Execute a single SQL string that contains multiple statements
  const sqlstr =
    "CREATE TABLE hello (a int, b char); \
INSERT INTO hello VALUES (0, 'hello'); \
INSERT INTO hello VALUES (1, 'world');";
  db.run(sqlstr); // Run the query without returning anything

  // Prepare an sql statement
  const stmt = db.prepare("SELECT * FROM hello WHERE a=:aval AND b=:bval");

  // Bind values to the parameters and fetch the results of the query
  const result = stmt.getAsObject({ ":aval": 1, ":bval": "world" });
  console.log(result); // Will print {a:1, b:'world'}
};
