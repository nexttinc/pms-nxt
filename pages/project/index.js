import { Button, Table, Pagination } from "flowbite-react";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import RegistModal from "./register";

export default function Home({ data }) {
  const router = useRouter();
  const [totCnt, displayRows] = data;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentId, setCurrentId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const rowNum = 10;
  const totalPage = Math.ceil(totCnt / rowNum);
  const [total, setTotal] = useState(totalPage);
  const onPageChange = (page) => setCurrentPage(page);

  const [openModal, setOpenModal] = useState(undefined);
  const modalProps = { openModal, setOpenModal };

  useEffect(() => {
    return () => {};
  }, [openModal]);

  useEffect(() => {
    return () => {
      console.log(currentId);
    };
  }, [currentId]);

  const Rows = displayRows.map((row) => {
    function AddComma(num) {
      var regexp = /\B(?=(\d{3})+(?!\d))/g;
      return num.toString().replace(regexp, ",");
    }

    function getDate(str) {
      return str.substr(0, 10);
    }

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

    return (
      <>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
            {row.id}
          </Table.Cell>
          <Table.Cell>
            {/* <Link
              href={`/project/register/${row.id}`}
              key={row.id}
              className="underline"
            > */}
            {row.projectName}
            {/* </Link> */}
          </Table.Cell>
          <Table.Cell>{AddComma(row.downPayment)}</Table.Cell>
          <Table.Cell>{row.member}</Table.Cell>
          <Table.Cell>
            {getDate(row.startDate)}~{getDate(row.endDate)}
          </Table.Cell>
          <Table.Cell>{row.status}</Table.Cell>
          <Table.Cell>
            <div className="inline-block mx-1">
              <Button
                gradientDuoTone="purpleToPink"
                /* onClick={() => onClick(row.id, row.projectName)}*/
                onClick={() => {
                  modalProps.setOpenModal("dismissible");
                  setCurrentId(row.id);
                }}
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
            /* onClick={() => onClick(row.id, row.projectName)}*/
            onClick={() => {
              modalProps.setOpenModal("dismissible");
            }}
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
          <Table.Body className="divide-y">{Rows}</Table.Body>
        </Table>
      </div>
      <div className="text-center my-5">
        <Pagination
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
          totalPages={total}
        />
      </div>
      <div>
        <RegistModal
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          modalProps={modalProps}
          setOpenModal={setOpenModal}
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
  const res = await fetch(`http://localhost:3000/api/projects`);
  const data = await res.json();
  // console.log(data);
  return { props: { data } };
}
