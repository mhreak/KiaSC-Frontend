// components/form-builder/form-layout-renderer.tsx
"use client";

import React from "react";
import { LayoutConfig, FormNode, isLayoutConfig } from "../types";
import { FormFieldRenderer } from "./form-field-renderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionWrapper } from "./section-wrapper";
// import { cn } from "@/lib/utils";

interface FormLayoutRendererProps {
  layout: LayoutConfig;
  onFieldChange?: (
    fieldId: string,
    value: any,
    formValues: Record<string, any>,
  ) => void;
}

// این تابع به صورت بازگشتی (Recursive) نودهای داخل چیدمان را رندر می‌کند
function RenderChildren({
  nodes,
  onFieldChange,
}: Readonly<{
  nodes: FormNode[];
  onFieldChange?: (
    fieldId: string,
    value: any,
    formValues: Record<string, any>,
  ) => void;
}>) {
  return (
    <>
      {nodes.map((node) => {
        if (isLayoutConfig(node)) {
          return (
            <FormLayoutRenderer
              key={node.id}
              layout={node}
              onFieldChange={onFieldChange}
            />
          );
        }
        return (
          <FormFieldRenderer
            key={node.id}
            field={node}
            onFieldChange={onFieldChange}
          />
        );
      })}
    </>
  );
}

export function FormLayoutRenderer({
  layout,
  onFieldChange,
}: Readonly<FormLayoutRendererProps>) {
  if (layout.visible === false) return null;

  switch (layout.type) {
    case "grid":
      return (
        <div className="grid grid-cols-12 gap-5 col-span-12 border border-dashed border-muted p-4 rounded-lg">
          <RenderChildren
            nodes={layout.children ?? []}
            onFieldChange={onFieldChange}
          />
        </div>
      );

    case "section":
      return (
        <SectionWrapper
          key={layout.id}
          title={layout.title}
          icon={layout.icon}
          iconSize={layout.iconSize}
          variant={layout.wrapperVariant}
          customClassName={layout.customWrapperClassName}
          sectionColSpan={layout.sectionColSpan}
          headerClassName={layout.headerClassName}
        >
          <RenderChildren
            nodes={layout.children ?? []}
            onFieldChange={onFieldChange}
          />
        </SectionWrapper>
      );

    case "tabs":
      if (!layout.items || layout.items.length === 0) return null;
      return (
        <div className="col-span-12">
          <Tabs defaultValue={layout.items[0].id} className="w-full">
            <TabsList className="grid w-full grid-flow-col">
              {layout.items.map((item) => (
                <TabsTrigger key={item.id} value={item.id}>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {layout.items.map((item) => (
              <TabsContent
                key={item.id}
                value={item.id}
                className="space-y-4 pt-4"
              >
                <div className="grid grid-cols-12 gap-4 border rounded-2xl p-4">
                  <RenderChildren
                    nodes={item.children}
                    onFieldChange={onFieldChange}
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      );

    case "accordion":
      if (!layout.items || layout.items.length === 0) return null;
      return (
        <div className="col-span-12">
          <Accordion className="w-full">
            {layout.items.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.label}</AccordionTrigger>
                <AccordionContent className="grid grid-cols-12 gap-4 pt-4">
                  <RenderChildren
                    nodes={item.children}
                    onFieldChange={onFieldChange}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      );

    default:
      return null;
  }
}
