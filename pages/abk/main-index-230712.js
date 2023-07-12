import { Button, Table, Pagination } from "flowbite-react";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const rowNum = 10;

export default function Project({ data }) {
  const router = useRouter();
  const onClick = (id, projectName) => {
    router.push(
      {
        pathname: `/project/register/${id}`,
        query: {
          projectName: projectName,
        },
      },
      `/project/register/${id}`
    );
  };

  const [totCnt, displayRows] = data;
  // const [prjList, setPrjList] = useState(displayRows);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentId, setCurrentId] = useState("");

  const totalPage = Math.ceil(totCnt / rowNum);
  const [total, setTotal] = useState(totalPage);
  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    return () => {
      console.log(currentId);
    };
  }, [currentId]);

  const Rows = displayRows.map((row, index) => {
    function AddComma(num) {
      var regexp = /\B(?=(\d{3})+(?!\d))/g;
      return num.toString().replace(regexp, ",");
    }

    function getDate(str) {
      return str.substr(0, 10);
    }

    return (
      <>
        <Table.Row
          className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
          key={index}
        >
          <Table.Cell
            key={index}
            className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center"
          >
            {row.id}
          </Table.Cell>
          <Table.Cell key={index}>{row.projectName}</Table.Cell>
          <Table.Cell key={index}>{AddComma(row.downPayment)}</Table.Cell>
          <Table.Cell key={index}>{row.member}</Table.Cell>
          <Table.Cell key={index}>
            {getDate(row.startDate)}~{getDate(row.endDate)}
          </Table.Cell>
          <Table.Cell key={index}>{row.status}</Table.Cell>
          <Table.Cell key={index}>
            <div className="inline-block mx-1 my-0.5">
              <Button
                gradientDuoTone="purpleToPink"
                onClick={() => onClick(row.id, row.projectName)}
              >
                수정
              </Button>
            </div>
            <div className="inline-block mx-1">
              <Button gradientDuoTone="purpleToPink">삭제</Button>
            </div>
          </Table.Cell>
        </Table.Row>
      </>
    );
  });

  return (
    <>
      <div className="mx-auto py-20 text-center text-4xl font-extrabold">
        <h1>프로젝트 관리</h1>
      </div>
      <div className="my-5 text-right">
        <div className="inline-block">
          <Button
            gradientDuoTone="purpleToPink"
            onClick={() => onClick("0", "")}
          >
            등록
          </Button>
        </div>
      </div>
      <div>
        <Table>
          <Table.Head className="text-center ">
            <Table.HeadCell className="bg-gray-500 text-white">
              ID
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-500 text-white">
              프로젝트명
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-500 text-white">
              금액
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-500 text-white">
              프로젝트 구성원
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-500 text-white">
              시작일~종료일
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-500 text-white">
              상태
            </Table.HeadCell>
            <Table.HeadCell className="bg-gray-500 text-white">
              편집
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          // eslint-disable-next-line
          <Table.Body className="divide-y">{Rows}</Table.Body>
        </Table>
      </div>
      <div>
        {currentPage}/{total}
      </div>
      <div className="text-center my-5">
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={total}
          nextLabel="다음"
          previousLabel="이전"
        />
      </div>
      <style jsx>{`
        a {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/project`);
  const data = await res.json();
  return { props: { data } };
}
