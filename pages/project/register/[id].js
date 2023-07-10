"use client";

// only import what you want to use
import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Radio,
  RangeSlider,
  Select,
  Textarea,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Register({ data }) {
  const router = useRouter();
  console.log(router.query);

  return (
    <>
      <div className="mx-auto py-20 text-center text-4xl font-extrabold">
        프로젝트 정보
      </div>
      <form className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="프로젝트명" />
          </div>
          <TextInput id="projectName" required type="projectName" />
        </div>
        <Button gradientDuoTone="purpleToPink" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}
