"use client";

import BackButton from "@/components/shared/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import PersonPersonalInfoTab from "./_components/PersonPersonalInfoTab";

export default function PersonDetailsPage() {
  const { personId } = useParams<{ personId: string }>();
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1">
        <Tabs className={"mb-auto h-full"}>
          <TabsList variant={"secondary"} className={"mb-5"}>
            <TabsTrigger value={"personalInfo"}>اطلاعات شخصی</TabsTrigger>
            <TabsTrigger value={"fileAndDocs"}>فایل ها و مدارک</TabsTrigger>
            <TabsTrigger value={"courses"}>دوره ها آموزشی</TabsTrigger>
            <TabsTrigger value={"teams"}>تیم ها</TabsTrigger>
            <TabsTrigger value={"messages"}>پیام ها</TabsTrigger>
          </TabsList>
          <TabsContent value={"personalInfo"}>
            <PersonPersonalInfoTab />
          </TabsContent>
          <TabsContent value={"fileAndDocs"}></TabsContent>
          <TabsContent value={"courses"}></TabsContent>
          <TabsContent value={"teams"}></TabsContent>
          <TabsContent value={"messages"}></TabsContent>
        </Tabs>
      </div>
      <div className="h-full flex flex-col justify-end items-end">
        <BackButton />
      </div>
    </div>
  );
}
