import initSqlJs from "sql.js";

export default class DatabaseService {
  private databases: Map<string, initSqlJs.Database>;

  constructor() {
    this.databases = new Map();
  }

  async createDatabase(name: string) {
    if (this.databases.has(name)) {
      throw new Error("database name already exists");
    }
    const SQL = await initSqlJs({
      locateFile: (file: string) => `/sql.js/${file}`,
    });
    const db = new SQL.Database();
    this.databases.set(name, db);
  }

  async runQuery(query: string, databaseName: string) {
    const db = this.databases.get(databaseName);
    if (!db) throw new Error("database doesn't exists");

    const stmt = db.prepare(query);
    const result = stmt.getAsObject();
    return result;
  }
}
