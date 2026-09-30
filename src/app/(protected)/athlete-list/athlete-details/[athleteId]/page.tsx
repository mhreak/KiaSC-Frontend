"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import AthletePersonalInfoTab from "./_components/AthletePersonalInfoTab";
import { useTransitionRouter } from "next-view-transitions";
import BackButton from "@/components/shared/BackButton";

export default function AthleteDetailsPage() {
  const { athleteId } = useParams<{ athleteId: string }>();

  const router = useTransitionRouter();

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
            <TabsTrigger value={"installments"}>اقساط</TabsTrigger>
            <TabsTrigger value={"referer"}>معرفی شده</TabsTrigger>
          </TabsList>
          <TabsContent value={"personalInfo"}>
            <AthletePersonalInfoTab />
          </TabsContent>
          <TabsContent value={"fileAndDocs"}></TabsContent>
          <TabsContent value={"courses"}></TabsContent>
          <TabsContent value={"teams"}></TabsContent>
          <TabsContent value={"messages"}></TabsContent>
          <TabsContent value={"installments"}></TabsContent>
          <TabsContent value={"referer"}></TabsContent>
        </Tabs>
      </div>
      <div className="h-full flex flex-col justify-end items-end">
        <BackButton />
      </div>
    </div>
  );
}
