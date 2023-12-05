'use client'
import { useState } from 'react';
import React from 'react';

interface today {
    title: string;
    date: string;
    content: contentInter[]
}

interface contentInter {
    name: string;
    desc: string;
    keyword?: string;
    index?: string
}

export default function Home() {
    const [gender, setGender] = useState<string>("");
    const [birthDate, setBirthDate] = useState<string>("");
    const [month, setMonth] = useState<string>("1");
    const [time, setTime] = useState<string>("");
    const [dataResult, setDataResult] = useState<today[] | null>(null)

    const fetchData = async () => {
        if (!gender) {
            alert("성별을 선택해주세요.");
            return;
        }
        if (!birthDate) {
            alert("생년월일을 입력해주세요.");
            return;
        }

        const res = await fetch(`/api?gender=${gender}&birthdate=${birthDate}&month=${month}&time=${time}`)
        const data = await res.json()
        data.result.day.content.pop();
        data.result.tomorrow.content.pop();

        setDataResult([data.result.day, data.result.tomorrow, data.result.month])
    }

    const birthChange = ((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 8 && /^[0-9]*$/.test(value)) {
            setBirthDate((value))
        }
    })

    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const menuList = ['오늘의 운세', "내일의 운세", "한달 운세"];

    return (
        <>
            <div className={`w-full px-[2%] flex justify-center ${dataResult ? 'mt-10' : 'mt-40'}`}>
                <div className="max-w-7xl mx-auto px-5 lg:basis-[70%] md:basis-4/5 basis-[90%] border py-5 rounded-md">
                    <h1 className="text-3xl md:text-4xl text-center">운세 🔮</h1>
                    <p onClick={() => { location.reload(); }} className='mt-10 cursor-pointer text-right'>다시하기</p>
                    <div className="">
                        <div className="text-lg flex flex-wrap items-center">
                            <p className='mr-2'>성별</p>
                            <div className="flex gap-x-2">
                                <button className={`py-1 px-3 border rounded-md ${gender === 'm' ? 'bg-blue-500 text-white' : ''}`} onClick={() => { setGender("m") }}>남자🧑🏻</button>
                                <button className={`py-1 px-3 border rounded-md ${gender === 'f' ? 'bg-pink-500 text-white' : ''}`} onClick={() => { setGender("f") }}>여자👧🏻</button>
                            </div>
                        </div>
                        <div className="pt-8 text-lg flex flex-wrap items-center gap-x-2">
                            <p>🎉 생년월일</p>
                            <input className="border py-1 md:px-3 px-1 rounded-md" type="text" onChange={birthChange} placeholder="생년월일(8자리)" value={birthDate} />
                        </div>
                        <div className="pt-8 text-lg flex flex-wrap items-center gap-x-2">
                            <p>📆 양력 , 음력</p>
                            <select className="border py-1 px-3 rounded-md" value={month} onChange={(e) => setMonth(e.target.value)}>
                                <option value="1">양력</option>
                                <option value="2">음력 평달</option>
                                <option value="3">음력 윤달</option>
                            </select>
                        </div>
                        <div className="pt-8 text-lg flex flex-wrap items-center gap-x-2">
                            <p>⏰ 태어난 시간</p>
                            <select className="border py-1 px-3 rounded-md" value={time} onChange={(e) => setTime(e.target.value)}>
                                <option value="">몰라요</option>
                                <option value="0">23:30 ~ 01:29</option>
                                <option value="1">1:30 ~ 03:29</option>
                                <option value="2">3:30 ~ 05:29</option>
                                <option value="3">5:30 ~ 07:29</option>
                                <option value="4">7:30 ~ 09:29</option>
                                <option value="5">9:30 ~ 11:29</option>
                                <option value="6">11:30 ~ 13:29</option>
                                <option value="7">13:30 ~ 15:29</option>
                                <option value="8">15:30 ~ 17:29</option>
                                <option value="9">17:30 ~ 19:29</option>
                                <option value="10">19:30 ~ 21:29</option>
                                <option value="11">21:30 ~ 23:29</option>
                            </select>
                        </div>
                        <div className="pt-8 text-lg">
                            <button className="border w-full px-5 py-3 rounded-md bg-cyan-600 text-white" onClick={fetchData}>확인</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full px-[2%] flex justify-center">
                {
                    dataResult &&
                    <div className="max-w-7xl mx-auto lg:basis-[70%] md:basis-4/5 basis-[90%] pb-5 pt-3">
                        <div className="flex gap-x-2 mt-5">
                            {
                                menuList.map((e, i) => {
                                    return (
                                        <button key={i} className={`border py-1 px-2 rounded-md ${selectedCategory === i ? 'bg-cyan-600 text-white' : ''}`} onClick={() => setSelectedCategory(i)}>{e}</button>
                                    )
                                })
                            }
                        </div>
                        <div>
                            {
                                dataResult && dataResult[selectedCategory].content.map((e, i) => {
                                    return (
                                        <div key={i} className="pt-3">
                                            <p className='p-2 bg-cyan-600 text-white'>{e.name}</p>
                                            <p className='p-3 border'>{e.desc}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </>
    )
}