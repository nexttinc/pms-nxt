import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NxtSelect from "../../../component/select";
import NxtAlert from "../../../component/alert";
import NxtConfirm from "../../../component/confirm";
export default function Register({ data }) {
  const router = useRouter();
  const id = router.query.id;

  const [action, setAction] = useState();
  const [alertMessage, setAlertMessage] =
    useState("성공적으로 등록되었습니다.");
  const [confirmMessage, setConfirmMessage] =
    useState("정말로 삭제하시겠습니까?");
  const [confirmBodyMessage, setConfirmBodyMessage] = useState(
    "삭제 후에는 복구가 불가능 합니다."
  );
  const [color, setColor] = useState("success");
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);

  const tasks = [
    { id: "pln", value: "기획" },
    { id: "des", value: "디자인" },
    { id: "pub", value: "퍼블리싱" },
    { id: "dev", value: "개발" },
  ];

  const [projectName, setProjectName] = useState("");
  const [task, setTask] = useState("");

  useEffect(() => {
    if (action == "del") {
      console.log("del");
    }

    return () => {};
  }, [action]);

  useEffect(() => {
    console.log("projectId", projectName);
    console.log("taskId", task);

    return () => {};
  }, [projectName, task]);

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <NxtAlert isOpen={alertIsOpen} color={color} message={alertMessage} />
      <NxtConfirm
        isOpen={confirmIsOpen}
        message={confirmMessage}
        bodyMessage={confirmBodyMessage}
        setAction={setAction}
      />
      <form onSubmit={onSubmit}>
        <div className="mx-auto py-3 text-center">
          <div className="mx-auto py-20 text-center text-4xl font-extrabold">
            일일보고 정보{id == 0 ? "등록" : "수정"}
          </div>
          <div className="my-5 text-left">
            <NxtSelect
              name="프로젝트"
              items={data.prjList}
              setComponent={setProjectName}
              default={projectName}
            />
          </div>
          <div className="my-5 text-left">
            <NxtSelect
              name="업무"
              items={tasks}
              setComponent={setTask}
              default={task}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export async function getServerSideProps(context) {
  let data = {};
  const id = context.query.id;

  if (id != "0") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/daily/${id}`
    );
    data.prjInfo = await res.json();
  }

  //현재 프로젝트 목록 가져오기
  console.log(`${process.env.NEXT_PUBLIC_WEB_URL}/api/project/select/all`);
  const prjList = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/project/select/all`
  );

  data.prjList = await prjList.json();

  return { props: { data } };
}
