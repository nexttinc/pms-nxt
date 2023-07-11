import { Button, Label, Select, TextInput, Table, Pagination, Modal } from 'flowbite-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Styles from '../styles/Home.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function HomeBk({ data }) {
    const router = useRouter();
    const [totCnt, displayRows] = data;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentId, setCurrentId] = useState('');
    const [selectedDate1, setSelectedDate1] = useState(new Date());
    const [selectedDate2, setSelectedDate2] = useState(new Date());

    const rowNum = 10;
    const totalPage = Math.ceil(totCnt / rowNum);
    const [total, setTotal] = useState(totalPage);
    const onPageChange = (page) => setCurrentPage(page);

    const [openModal, setOpenModal] = useState(undefined);
    const props = { openModal, setOpenModal };

    useEffect(() => {
        return () => {};
    }, [openModal]);

    useEffect(() => {
        return () => {
            console.log(currentId);
        };
    }, [currentId]);

    const onSubmit = (e) => {
        // e.preventDefault();
        console.log('onsubmit');
        return;
    };

    const Rows = displayRows.map((row) => {
        function AddComma(num) {
            var regexp = /\B(?=(\d{3})+(?!\d))/g;
            return num.toString().replace(regexp, ',');
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
                        <Link href={`/project/register/${row.id}`} key={row.id} className="underline">
                            {row.projectName}
                        </Link>
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
                                    props.setOpenModal('dismissible');
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
                            props.setOpenModal('dismissible');
                        }}
                    >
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
                <form className="flex max-w-md flex-col gap-4" onSubmit={onSubmit}>
                    <Modal
                        dismissible
                        show={props.openModal === 'dismissible'}
                        onClose={() => props.setOpenModal(undefined)}
                    >
                        <Modal.Header className="text-4xl font-extrabold">프로젝트 정보</Modal.Header>
                        <Modal.Body>
                            <div className="space-y-6">
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="curPrjName" value="프로젝트명" />
                                    </div>
                                    <TextInput id="curPrjName" type="text" required />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="curDownPayment" value="프로젝트 금액" />
                                    </div>
                                    <TextInput id="curDownPayment" type="text" required />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="curMember" value="프로젝트 구성원" />
                                    </div>
                                    <TextInput id="curMember" type="text" required />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="curSDate" value="프로젝트 시작일~종료일" />

                                        <div className="text-justify">
                                            <div className="inline-block mr-2">
                                                <DatePicker
                                                    className="mt-3 block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                                    dateFormat="yyyy.MM.dd" // 날짜 형태
                                                    shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                                    selected={selectedDate1}
                                                    onChange={(date) => setSelectedDate1(date)}
                                                />{' '}
                                            </div>
                                            ~
                                            <div className="inline-block ml-2">
                                                <DatePicker
                                                    className="mt-3 block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                                    dateFormat="yyyy.MM.dd" // 날짜 형태
                                                    shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                                    minDate={selectedDate1} // minDate 이전 날짜 선택 불가
                                                    // maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                                                    selected={selectedDate2}
                                                    onChange={(date) => setSelectedDate2(date)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="curStatus" value="진행상태" />
                                    </div>
                                    <Select id="curStatus" required>
                                        <option value="대기중">대기중</option>
                                        <option value="진행중">진행중</option>
                                        <option value="완료">완료</option>
                                    </Select>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button gradientDuoTone="purpleToPink" type="submit">
                                등록
                            </Button>

                            <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                                취소
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </form>
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
    // const res = await fetch(`http://localhost:3000/api/projects`);
    const res = await fetch(`http://localhost:3000/api/projects?rownum=10&page=1`);
    const data = await res.json();
    // console.log(data);
    return { props: { data } };
}
