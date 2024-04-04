import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import OverviewPanel from "./overviewPanel";
import EditorPanel from "./editorPanel";

export default function DashboardContainer() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg"
      style={{ height: "calc(100vh - 36px)" }}
    >
      <ResizablePanel defaultSize={10} minSize={10} maxSize={20}>
        <div className="flex h-full p-3">
          <OverviewPanel />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={90}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50} minSize={20}>
            <div className="flex h-full items-center justify-center p-0">
              <EditorPanel />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={20}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
