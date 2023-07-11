import { Button, Label, Select, TextInput, Modal } from 'flowbite-react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Modal(props) {
    const [curPrjName, setCurPrjName] = useState('');

    const onClick = (e) => {};
    return (
        <div>
            <Modal
                dismissible
                show={props.modalProps.openModal === 'dismissible'}
                onClose={() => props.modalProps.setOpenModal(undefined)}
            >
                <Modal.Header className="text-4xl font-extrabold">프로젝트 정보</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="curPrjName" value="프로젝트명" />
                            </div>
                            <TextInput type="text" id="curPrjName" required />
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
                                            selected={props.startDate}
                                            onChange={(date) => props.setStartDate(date)}
                                        />{' '}
                                    </div>
                                    ~
                                    <div className="inline-block ml-2">
                                        <DatePicker
                                            className="mt-3 block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                            dateFormat="yyyy.MM.dd" // 날짜 형태
                                            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                            minDate={props.startDate} // minDate 이전 날짜 선택 불가
                                            // maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                                            selected={props.endDate}
                                            onChange={(date) => props.setEndDate(date)}
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
                    <Button gradientDuoTone="purpleToPink" onClick={onClick}>
                        등록
                    </Button>

                    <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                        취소
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
