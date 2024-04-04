import { Button } from "@/components/ui/button";
import { PlayIcon } from "@radix-ui/react-icons";
import CodeMirror from "@uiw/react-codemirror";
import React from "react";
import { sql } from "@codemirror/lang-sql";
import { githubDark } from "@uiw/codemirror-theme-github";

export default function EditorPanel() {
  const [value, setValue] = React.useState("SELECT * FROM users;");
  const onChange = React.useCallback((val: string) => {
    setValue(val);
  }, []);

  const handleRun = () => {
    console.log("executing query");
    console.log(value);
  };

  return (
    <div className="h-full w-full relative">
      <Button
        className="right-5 top-5 absolute flex z-10 justify-end"
        onClick={handleRun}
      >
        Run <PlayIcon />
      </Button>
      <CodeMirror
        className="h-full text-base"
        value={value}
        height="100%"
        theme={githubDark}
        extensions={[sql()]}
        onChange={onChange}
      />
    </div>
  );
}
