import { Button, Table } from "flowbite-react";
import { useState } from "react";
import { useRouter } from "next/router";
import { add3Digit, getYMDate } from "../../../common/utils";
import Pagination from "@mui/material/Pagination";

const rowNum = 5;

export default function Project({ data }) {
  const router = useRouter();
  const page = parseInt(router.query.page);
  const onNavReg = (id, projectName) => {
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
  const [currentPage, setCurrentPage] = useState(page);

  const totalPage = Math.ceil(totCnt / rowNum);
  const [total, setTotal] = useState(totalPage);
  const onPageChange = (e, page) => {
    // setCurrentPage(page);
    router.push(
      {
        pathname: `/project/list/${page}`,
        query: {},
      },
      `/project/list/${page}`
    );
  };

  return (
    <>
      <div className="mx-auto py-3 text-center text-4xl font-extrabold">
        <h1>프로젝트 관리</h1>
      </div>
      <div className="my-5 text-right">
        <div className="inline-block">
          <Button
            gradientDuoTone="purpleToPink"
            onClick={() => onNavReg("0", "")}
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
          <Table.Body className="divide-y">
            {displayRows.map((row, i) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
                key={row.id}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                  {row.id}
                </Table.Cell>
                <Table.Cell>{row.projectName}</Table.Cell>
                <Table.Cell>{add3Digit(row.downPayment)}</Table.Cell>
                <Table.Cell>{row.member}</Table.Cell>
                <Table.Cell>
                  {getYMDate(row.startDate)}~{getYMDate(row.endDate)}
                </Table.Cell>
                <Table.Cell>{row.status}</Table.Cell>
                <Table.Cell>
                  <div className="inline-block mx-1 my-0.5">
                    <Button
                      gradientDuoTone="purpleToPink"
                      onClick={() => onNavReg(row.id, row.projectName)}
                      size="sm"
                    >
                      수정
                    </Button>
                  </div>
                  <div className="inline-block mx-1">
                    <Button gradientDuoTone="purpleToPink" size="sm">
                      삭제
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="text-center my-5">
        <div className="w-auto inline-block">
          <Pagination
            count={total}
            defaultPage={currentPage}
            onChange={onPageChange}
            color="secondary"
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let page = context.query.page;
  if (!page) page = 1;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/project?rownum=${rowNum}&page=${page}`
  );
  const data = await res.json();
  return { props: { data } };
}
