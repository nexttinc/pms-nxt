'use client';

// only import what you want to use
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Register({ data }) {
    const router = useRouter();
    console.log(router.query);
    const [curPrjName, setCurPrjName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const onPrjChange = (e) => {
        setCurPrjName(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(curPrjName);
        console.log(startDate);
        console.log(endDate);
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="mx-auto py-3 text-center">
                    <div className="mx-auto py-20 text-center text-4xl font-extrabold">프로젝트 정보</div>
                    <div className="space-y-6 w-7/12 absolute left-1/2 -translate-x-1/2">
                        <div>
                            <div className="mb-2 block text-left">
                                <Label htmlFor="curPrjName" value="프로젝트명" />
                            </div>
                            <TextInput type="text" id="curPrjName" value={curPrjName} onChange={onPrjChange} required />
                        </div>
                        <div>
                            <div className="mb-2 block text-left">
                                <Label htmlFor="curDownPayment" value="프로젝트 금액" />
                            </div>
                            <TextInput id="curDownPayment" type="text" required />
                        </div>
                        <div>
                            <div className="mb-2 block text-left">
                                <Label htmlFor="curMember" value="프로젝트 구성원" />
                            </div>
                            <TextInput id="curMember" type="text" required />
                        </div>
                        <div>
                            <div className="mb-2 block text-left">
                                <Label htmlFor="curSDate" value="프로젝트 시작일~종료일" />

                                <div className="text-justify">
                                    <div className="inline-block mr-2">
                                        <DatePicker
                                            className="mt-3 block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                            dateFormat="yyyy.MM.dd" // 날짜 형태
                                            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                        />{' '}
                                    </div>
                                    ~
                                    <div className="inline-block ml-2">
                                        <DatePicker
                                            className="mt-3 block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                            dateFormat="yyyy.MM.dd" // 날짜 형태
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
                            <div className="mb-2 block text-left">
                                <Label htmlFor="curStatus" value="진행상태" />
                            </div>
                            <Select id="curStatus" required>
                                <option value="대기중">대기중</option>
                                <option value="진행중">진행중</option>
                                <option value="완료">완료</option>
                            </Select>
                        </div>
                        <div className="text-center">
                            <Button className="inline-block mx-1" gradientDuoTone="purpleToPink" type="submit">
                                등록
                            </Button>

                            <Button className="inline-block mx-1" color="gray" onClick={() => router.back()}>
                                취소
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
