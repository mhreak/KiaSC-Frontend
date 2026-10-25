"use client";

import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import ImageLableCard, {
  ImageLableCardProps,
} from "@/components/shared/ImageLableCard";
import { useParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { courseFormConfig } from "../../courseFormConfig";
import BackButton from "@/components/shared/BackButton";
import { generateFormConfig, toFieldOptions } from "@/utils/utillityFunctions";
import { useApi } from "@/hooks/useApi";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";
import { courseApi } from "@/api/services/ApiService/courseApi";
import { toast } from "@/lib/toast/toast";
import { Term, TermGetListParams } from "@/types/api/endpointTypes/term.types";
import {
  Sport,
  SportGetListParams,
} from "@/types/api/endpointTypes/sport.types";
import { termApi } from "@/api/services/ApiService/termApi";
import { sportApi } from "@/api/services/ApiService/sportApi";
import { placeApi } from "@/api/services/ApiService/placeApi";
import { subPlaceApi } from "@/api/services/ApiService/subPlaceApi";
import {
  Place,
  PlaceGetListParams,
} from "@/types/api/endpointTypes/place.types";
import {
  SubPlace,
  SubPlaceGetListParams,
} from "@/types/api/endpointTypes/subPlace.types";
import { CourseGet } from "@/types/api/endpointTypes/course.types";

export default function CourseDetailsPage() {
  const { courseId } = useParams<{ courseId: string }>();

  const formDrawerRef = useRef<FormDrawerRef>(null);

  const {
    data: courseData,
    isLoading: getLoading,
    execute: getCourse,
  } = useApi<CourseGet, { id: number }>(courseApi.get);

  const { isLoading: editLoading, execute: editCourse } = useApi<
    APIAddTemplateResponse,
    any
  >(courseApi.edit, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formDrawerRef.current?.close();
    },
  });

  const { data: allTermsData, execute: getListTerms } = useApi<
    APIGetTemplate<Term[]>,
    TermGetListParams
  >(termApi.getList);

  const { data: allSportsData, execute: getAllSports } = useApi<
    APIGetTemplate<Sport[]>,
    SportGetListParams
  >(sportApi.getList);

  const { data: allPlacesData, execute: getListPlaces } = useApi<
    APIGetTemplate<Place[]>,
    PlaceGetListParams
  >(placeApi.getList);

  const { data: allSubPlacesData, execute: getListSubPlaces } = useApi<
    APIGetTemplate<SubPlace[]>,
    SubPlaceGetListParams
  >(subPlaceApi.getList);

  useEffect(() => {
    getListTerms();
    getAllSports();
    getListPlaces();
    getListSubPlaces();
  }, []);

  const items: ImageLableCardProps[] = [
    {
      imageSrc: "/icon/ic-edit.png",
      label: "ویرایش",
      themeColor: "amber",
      onClick: () => {
        getCourse({ id: Number(courseId) });
        formDrawerRef.current?.open();
      },
    },
    {
      imageSrc: "/icon/ic-course-session.png",
      label: "جلسات",
      themeColor: "emerald",
    },
    {
      imageSrc: "/icon/ic-options.png",
      label: "گزینه های ثبت نامی",
      themeColor: "blue",
    },
    {
      imageSrc: "/icon/ic-athlete.png",
      label: "ورزش آموزان",
      themeColor: "red",
    },
    {
      imageSrc: "/icon/ic-coach.png",
      label: "افراد",
      themeColor: "yellow",
    },
    {
      imageSrc: "/icon/ic-chart.png",
      label: "گزارش مالی",
      themeColor: "fuchsia",
    },
    {
      imageSrc: "/icon/ic-team.png",
      label: "کلاس ها",
      themeColor: "teal",
      link: `/courses/course-details/course-classes?courseId=${courseId}`,
    },
    {
      imageSrc: "/icon/ic-attendance.png",
      label: "فعالیت ورزش آموزان",
      themeColor: "orange",
    },
    {
      imageSrc: "/icon/ic-file.png",
      label: "گزارش جامع",
      themeColor: "cyan",
    },
    {
      imageSrc: "/icon/ic-file.png",
      label: "گزارش گزینه ثبت نام",
      themeColor: "indigo",
    },
  ];

  const formConfig = generateFormConfig(courseFormConfig, {
    values: courseData ?? undefined,
    options: {
      SportId: toFieldOptions(
        allSportsData?.Items ?? [],
        "SportName",
        "SportId",
      ),
      TermId: toFieldOptions(allTermsData?.Items ?? [], "TermName", "TermId"),
      PlaceId: toFieldOptions(
        allPlacesData?.Items ?? [],
        "PlaceName",
        "PlaceId",
      ),
      SubPlaceId: toFieldOptions(
        allSubPlacesData?.Items ?? [],
        "SubPlaceName",
        "SubPlaceId",
      ),
    },
    fieldProps: {
      Gender: {
        defaultValue: courseData?.Gender ? "true" : "false",
      },
    },
  });

  return (
    <>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {items.map((item) => (
          <ImageLableCard key={item.label} {...item} />
        ))}
        <FormDrawer
          ref={formDrawerRef}
          formConfig={formConfig}
          onSubmit={(data) => {
            editCourse(data);
          }}
          drawerTitle="دوره"
          formMode="edit"
          showTriggerButton={false}
          isLoading={getLoading}
        />
      </div>
      <div className="pl-8 flex justify-end">
        <BackButton />
      </div>
    </>
  );
}
