import { Button, Table } from "flowbite-react";
import { useState } from "react";
import { useRouter } from "next/router";
import { add3Digit, getYMDate } from "../../../common/utils";
import { Alert } from "flowbite-react";
import Pagination from "@mui/material/Pagination";
import MUIButton from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const rowNum = 5;
export default function Project({ data }) {
  const router = useRouter();
  const page = parseInt(router.query.page);
  const [totCnt, displayRows] = data;
  const [totCnt2, setTotCnt2] = useState(totCnt);
  const [isAlertSuccessOpen, setIsAlertSuccessOpen] = useState(false);
  const [isAlertFailOpen, setIsAlertFailOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [delId, setDelId] = useState("");
  const [currentPage, setcurrentPage] = useState(page);
  const totalPage = Math.ceil(totCnt / rowNum);
  const [total, setTotal] = useState(totalPage);

  const handleClose = () => {
    setShowConfirm(false);
  };

  const onNavReg = (id, projectName) => {
    router.push(
      {
        pathname: `/project/regist/${id}`,
        query: {
          projectName: projectName,
        },
      },
      `/project/regist/${id}`
    );
  };

  const onDelete = (id) => {
    setShowConfirm(true);
    setDelId(id);
  };

  const handleDel = async () => {
    setShowConfirm(false);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/project/delete/${delId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data == 1) {
          // console.log("success");
          setIsAlertSuccessOpen(true);
          setTotCnt2((prev) => prev - 1);
          const changeTotalPage = Math.ceil(totCnt2 / rowNum);
          setTotal(changeTotalPage);
          const modCount = (totCnt2 - 1) % rowNum;
          // console.log("total, page, modCount : ", total, page, modCount);
          if (total == page && modCount == 0) {
            // 마지막 행일 경우 이전 페이지로 이동을 해야 함, 클릭시 현재 페이지로 바뀌어야 하는데 MUI Pagination에 해당 기능 줄시 에러가 생김
            // router.push({
            //   pathname: `/project/list/${page - 1}`,
            // });
            location.href = `/project/list/${page - 1}`;
          } else {
            // 마지막행이 아닐경우, 현재 페이지로 이동
            router.push({
              pathname: `/project/list/${page}`,
            });
          }
        } else {
          setErrorMessage("문제가 발생했습니다. 관리자에게 문의해주세요.");
          setIsAlertFailOpen(true);
          // console.log("data : ", data);
        }
      })
      .catch((error) => {
        console.error("오류 발생:", error);
        setIsAlertFailOpen(true);
      });
  };

  const onPageChange = (e, page) => {
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
      {isAlertSuccessOpen && (
        <Alert color="success" onDismiss={() => setIsAlertSuccessOpen(false)}>
          <span>
            <p>
              <span className="font-medium mr-3">Info alert!</span>
              프로젝트 정보가 삭제 되었습니다.
            </p>
          </span>
        </Alert>
      )}

      {isAlertFailOpen && (
        <Alert color="failure" onDismiss={() => setIsAlertSuccessOpen(false)}>
          <span>
            <p>
              <span className=" mr-3 font-extrabold">Info alert!</span>
              {errorMessage}
            </p>
          </span>
        </Alert>
      )}

      {showConfirm && (
        <Dialog
          open={showConfirm}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"정말로 삭제 하시겠습니까?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              삭제 후 복구 할 수 없습니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MUIButton className="font-extrabold" onClick={handleClose}>
              취소
            </MUIButton>
            <MUIButton className="font-extrabold" onClick={handleDel} autoFocus>
              확인
            </MUIButton>
          </DialogActions>
        </Dialog>
      )}

      <div>
        <Table className="mt-5">
          <Table.Head className="text-center">
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
                    <Button
                      gradientDuoTone="purpleToPink"
                      size="sm"
                      onClick={() => onDelete(row.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="text-center my-10">
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
  const data = await getData(page);
  // console.log(data);
  return { props: { data } };
}

async function getData(page) {
  // console.log(process.env.NEXT_PUBLIC_WEB_URL);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/project?rownum=${rowNum}&page=${page}`
  );
  return await res.json();
}
