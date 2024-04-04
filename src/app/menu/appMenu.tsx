import { useTheme } from "@/components/theme-provider";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import initSqlJs from "sql.js";

export default function AppMenu() {
  const { setTheme, theme } = useTheme();

  const handleFileImportClick = () => {
    const button = document.getElementById("file-input");
    button?.click();
  };

  const handleFileChangeEvent: React.ChangeEventHandler<
    HTMLInputElement
  > = async (event) => {
    const files = (event.target as HTMLInputElement).files;
    if (!files) return;
    if (files?.length && files.length <= 0) return;
    const reader = new FileReader();
    reader.readAsText(files[0], "utf-8");
    reader.onload = async function () {
      if (!reader || !reader.result) return;
      if (reader.result instanceof ArrayBuffer) return;
      const fileHeader = reader.result.substr(0, reader.result.indexOf("\r\n"));
      const columns = fileHeader.split(",");
      columns.forEach(assertFieldName);
      const tableName = "users";

      const SQL = await initSqlJs({
        locateFile: (file: string) => `/sql.js/${file}`,
      });
      const db = new SQL.Database();
      // NOTE: You can also use new SQL.Database(data) where
      // data is an Uint8Array representing an SQLite database file

      // Execute a single SQL string that contains multiple statements
      console.time("insert took");
      db.run(sqlstr); // Run the query without returning anything
      console.timeEnd("insert took");

      // Prepare an sql statement
      const stmt = db.prepare("SELECT * FROM users WHERE name=:val");

      // Bind values to the parameters and fetch the results of the query
      const result = stmt.getAsObject({ ":val": "nj34gKcXJx" });
      console.log(result);
    };
    reader.onerror = function () {
      console.error("failed on reading the file");
    };
  };

  return (
    <Menubar className="border-b-1">
      <input
        type="file"
        onChange={handleFileChangeEvent}
        hidden
        accept=".csv"
        id="file-input"
      />
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={handleFileImportClick}>
            Import
            <MenubarShortcut>⌘M</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Theme</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarRadioGroup value={theme}>
                <MenubarRadioItem onClick={() => setTheme("dark")} value="dark">
                  Dark
                </MenubarRadioItem>
                <MenubarRadioItem
                  onClick={() => setTheme("light")}
                  value="light"
                >
                  Light
                </MenubarRadioItem>
                <MenubarRadioItem
                  onClick={() => setTheme("system")}
                  value="system"
                >
                  System
                </MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
