import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NxtSelect from "../../../component/select";
import NxtAlert from "../../../component/alert";
import NxtConfirm from "../../../component/confirm";
export default function Register({ data }) {
  const router = useRouter();
  const id = router.query.id;
  const [action, setAction] = useState();
  const onChange = () => {};
  useEffect(() => {
    if (action == "del") {
      console.log("del");
    }

    return () => {};
  }, [action]);
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <NxtAlert isOpen={true} color={"failure"} message={"메시지 OK"} />
      <NxtConfirm
        isOpen={true}
        message={"정말로 삭제하겠습니까?"}
        bodyMessage={"메시지 OK"}
        setAction={setAction}
      />
      <form onSubmit={onSubmit}>
        <div className="mx-auto py-3 text-center">
          <div className="mx-auto py-20 text-center text-4xl font-extrabold">
            일일보고 정보{id == 0 ? "등록" : "수정"}
          </div>
          <div>
            <NxtSelect
              name="프로젝트"
              value={data.prjList}
              default={""}
              onChange={onChange}
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
