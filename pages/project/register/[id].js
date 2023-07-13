"use client";
// only import what you want to use
import { Button, Label, Dropdown, TextInput } from "flowbite-react";
import { useState } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "flowbite-react";

export default function Register({ data }) {
  console.log(data);
  const router = useRouter();
  const [projectName, setProjectName] = useState(data?.projectName);
  const [downPayment, setDownPayment] = useState(data?.downPayment);
  const [allocPlan, setAllocPlan] = useState(data?.allocPlan);
  const [allocDesign, setAllocDesign] = useState(data?.allocDesign);
  const [allocPub, setAllocPub] = useState(data?.allocPub);
  const [allocDev, setAllocDev] = useState(data?.allocDev);
  const [member, setMember] = useState(data?.member);
  const [isAlertSuccessOpen, setisAlertSuccessOpen] = useState(false);
  const [isAlertFailOpen, setisAlertFailOpen] = useState(false);

  const [startDate, setStartDate] = useState(
    data == null ? new Date() : new Date(data.startDate)
  );
  const [endDate, setEndDate] = useState(
    data == null ? new Date() : new Date(data.endDate)
  );
  const [status, setStatus] = useState(data?.status);
  const onSubmit = (e) => {
    e.preventDefault();

    const id = data.id;
    const sDate = startDate.toISOString().slice(0, 10);
    const eDate = endDate.toISOString().slice(0, 10);
    const reqData = {
      projectName,
      downPayment,
      allocPlan,
      allocDesign,
      allocPub,
      allocDev,
      member,
      sDate,
      eDate,
      status,
    };

    setisAlertSuccessOpen(false);
    setisAlertFailOpen(false);

    fetch(`http://localhost:3000/api/project/alter/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data == 1) {
          console.log("success");
          setisAlertSuccessOpen(true);
        } else {
          setisAlertFailOpen(true);
          console.log("data : ", data);
        }
      })
      .catch((error) => {
        console.error("오류 발생:", error);
        setisAlertFailOpen(true);
      });
  };

  function handleSelect() {
    setStatus(this.value);
    document.getElementById("curStatus").click();
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mx-auto py-3 text-center">
          <div className="mx-auto py-20 text-center text-4xl font-extrabold">
            프로젝트 정보
          </div>
          <div className="space-y-6 w-7/12 absolute left-1/2 -translate-x-1/2">
            {isAlertSuccessOpen && (
              <Alert>
                <span className=" mr-3 font-extrabold">Info alert!</span>
                성공적으로 수정되었습니다.
              </Alert>
            )}

            {isAlertFailOpen && (
              <Alert color="failure" icon={HiInformationCircle}>
                <span>
                  <p>
                    <span className=" mr-3 font-extrabold">Info alert!</span>
                    수정 시 문제가 발생했습니다. 관리자에게 문의해주세요.
                  </p>
                </span>
              </Alert>
            )}

            <div>
              <TextInput
                type="text"
                id="curProjectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="프로젝트명"
                required
              />
            </div>
            <div>
              <TextInput
                id="curDownPayment"
                type="text"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                placeholder="프로젝트 금액"
                required
              />
            </div>
            <div>
              <TextInput
                id="curMember"
                type="text"
                value={member}
                onChange={(e) => setMember(e.target.value)}
                placeholder="프로젝트 구성원"
                required
              />
            </div>
            <div className="text-left">
              <Label className="inline-block">기획</Label>
              <TextInput
                type="text"
                value={allocPlan}
                onChange={(e) => setAllocPlan(e.target.value)}
                className="inline-block w-1/12 mx-1"
                required
              />
              <Label className="inline-block mr-5">%</Label>
              <Label className="inline-block">디자인</Label>
              <TextInput
                type="text"
                value={allocDesign}
                onChange={(e) => setAllocDesign(e.target.value)}
                className="inline-block w-1/12 mx-1"
                required
              />
              <Label className="inline-block mr-5">%</Label>
              <Label className="inline-block">퍼블리싱</Label>
              <TextInput
                type="text"
                value={allocPub}
                onChange={(e) => setAllocPub(e.target.value)}
                className="inline-block w-1/12 mx-1"
                required
              />
              <Label className="inline-block mr-5">%</Label>
              <Label className="inline-block">개발</Label>
              <TextInput
                type="text"
                value={allocDev}
                onChange={(e) => setAllocDev(e.target.value)}
                className="inline-block w-1/12 mx-1"
                required
              />
              <Label className="inline-block">%</Label>
            </div>
            <div>
              <div className="mb-2 block text-left">
                <div className="text-justify">
                  <div className="inline-block mr-2">
                    <DatePicker
                      className="mt-3 block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                      dateFormat="yyyy-MM-dd" // 날짜 형태
                      shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                  ~
                  <div className="inline-block ml-2">
                    <DatePicker
                      className="mt-3 block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                      dateFormat="yyyy-MM-dd" // 날짜 형태
                      shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                      minDate={startDate} // minDate 이전 날짜 선택 불가
                      // maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Dropdown
                id="curStatus"
                className="w-20"
                value={status}
                label={status ? status : "진행상태"}
              >
                <Dropdown.Item value="대기중" onClick={handleSelect}>
                  대기중
                </Dropdown.Item>
                <Dropdown.Item value="진행중" onClick={handleSelect}>
                  진행중
                </Dropdown.Item>
                <Dropdown.Item value="완료" onClick={handleSelect}>
                  완료
                </Dropdown.Item>
              </Dropdown>
            </div>

            <div className="text-center">
              <Button
                className="inline-block mx-1"
                gradientDuoTone="purpleToPink"
                type="submit"
              >
                등록
              </Button>

              <Button
                className="inline-block mx-1"
                color="gray"
                onClick={() => router.back()}
              >
                취소
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export async function getServerSideProps(context) {
  let data = null;
  const id = context.query.id;
  if (id != "0") {
    const res = await fetch(`http://localhost:3000/api/project/${id}`);
    data = await res.json();
  }

  return { props: { data } };
}
