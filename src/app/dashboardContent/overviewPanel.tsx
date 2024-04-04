import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function OverviewPanel() {
  const state = [
    {
      name: "default",
      tables: ["users", "plans", "subscriptions"],
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {state.map((i) => (
        <AccordionItem value="item-1" className="w-full" key={i.name}>
          <AccordionTrigger className="w-full pt-0 text-md">
            {i.name}
          </AccordionTrigger>
          {i.tables.map((table) => (
            <AccordionContent className="border-none" key={table}>
              {table}
            </AccordionContent>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
