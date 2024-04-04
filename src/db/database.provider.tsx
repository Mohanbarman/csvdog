import { createContext } from "react";
import DatabaseService from "./database.service";

export const DatabaseContext = createContext(new DatabaseService());
