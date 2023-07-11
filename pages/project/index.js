import { Button, Table, Pagination } from 'flowbite-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

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
    const [currentId, setCurrentId] = useState('');

    const totalPage = Math.ceil(totCnt / rowNum);
    const [total, setTotal] = useState(totalPage);
    const onPageChange = (page) => setCurrentPage(page);

    useEffect(() => {
        return () => {
            console.log(currentId);
        };
    }, [currentId]);

    // useEffect(() => {
    //     return () => {
    //         // db 가져온다.
    //         fetchList();
    //     };
    // }, [currentPage]);

    // async function fetchList() {
    //     const response = await fetch(`http://localhost:3000/api/projects?page=${currentPage}`);
    //     setPrjList(response.json());
    // }

    const Rows = displayRows.map((row) => {
        function AddComma(num) {
            var regexp = /\B(?=(\d{3})+(?!\d))/g;
            return num.toString().replace(regexp, ',');
        }

        function getDate(str) {
            return str.substr(0, 10);
        }

        return (
            <>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                        {row.id}
                    </Table.Cell>
                    <Table.Cell>{row.projectName}</Table.Cell>
                    <Table.Cell>{AddComma(row.downPayment)}</Table.Cell>
                    <Table.Cell>{row.member}</Table.Cell>
                    <Table.Cell>
                        {getDate(row.startDate)}~{getDate(row.endDate)}
                    </Table.Cell>
                    <Table.Cell>{row.status}</Table.Cell>
                    <Table.Cell>
                        <div className="inline-block mx-1 my-0.5">
                            <Button gradientDuoTone="purpleToPink" onClick={() => onClick(row.id, row.projectName)}>
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
                    <Button gradientDuoTone="purpleToPink" onClick={() => onClick('0', '')}>
                        등록
                    </Button>
                </div>
            </div>
            <div>
                <Table>
                    <Table.Head className="text-center ">
                        <Table.HeadCell className="bg-gray-500 text-white">ID</Table.HeadCell>
                        <Table.HeadCell className="bg-gray-500 text-white">프로젝트명</Table.HeadCell>
                        <Table.HeadCell className="bg-gray-500 text-white">금액</Table.HeadCell>
                        <Table.HeadCell className="bg-gray-500 text-white">프로젝트 구성원</Table.HeadCell>
                        <Table.HeadCell className="bg-gray-500 text-white">시작일~종료일</Table.HeadCell>
                        <Table.HeadCell className="bg-gray-500 text-white">상태</Table.HeadCell>
                        <Table.HeadCell className="bg-gray-500 text-white">
                            편집
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
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
    const res = await fetch(`http://localhost:3000/api/projects`);
    const data = await res.json();
    return { props: { data } };
}
