'use client'
import {useState} from 'react';
import React from 'react';

interface contentInter {
    name: string;
    desc : string;
    keyword ?: string;
    index ?: string
}

interface today{
    title: string;
    date: string;
    content: contentInter[]
}

interface tomorrow{
    title: string;
    date: string;
    content: contentInter[]
}

interface month{
    title: string;
    date: string;
    content: contentInter[]
}

export default function Home() {
    const [gender,setGender] = useState<string>("");
    const [birthDate,setBirthDate] = useState<string>("");
    const [month,setMonth] = useState<string>("1");
    const [time,setTime] = useState<string>("");

    const[resultToday,setResultToday] = useState<today | null>(null);
    const[resultTomorrow,setResultTomorrow] = useState<tomorrow | null>(null);
    const[resultMonth,setResultMonth] = useState<month | null>(null);
    const fetchData = async () =>{
        const res = await fetch(`/api?gender=${gender}&birthdate=${birthDate}&month=${month}&time=${time}`)
        const data = await res.json()
        setResultToday(data.result.day);
        setResultTomorrow(data.result.tomorrow);
        setResultMonth(data.result.month);
        console.log(data.result.day);
        console.log(data.result.tomorrow);
        console.log(data.result.month);
    }

    const birthChange = ((e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if(value.length <=8 && /^[0-9]*$/.test(value)){
            setBirthDate((value))
        }
    })

    return (
        <>
            <div className="w-full px-5">
                <div className="max-w-7xl mx-auto mt-10">
                    <h1 className="text-4xl text-center">운세</h1>
                    <div className="pt-5 text-lg">
                        <p className="pb-5">성별을 골라주세요</p>
                        <button className="px-8 py-3 border rounded-3xl mr-5" onClick={()=>{setGender("m")}}>남자🧑🏻</button>
                        <button className="px-8 py-3 border rounded-3xl" onClick={()=>{setGender("f")}}>여자👧🏻</button>
                    </div>
                    <div className="flex">
                        <div className="pt-5 text-lg w-1/4">
                            <p className="pb-5">🎉생년월일을 입력해주세요</p>
                            <input className="w-full border py-2 px-5 rounded-3xl" type="text" onChange={birthChange} placeholder="생년월일(8자리)" value={birthDate} />
                        </div>
                        <div className="pl-10 pt-5 text-lg w-1/4">
                            <p className="pb-5">양력,음력을 골라주세요</p>
                            <select className="w-full border py-2 px-5 rounded-3xl" value={month} onChange={(e)=>setMonth(e.target.value)}>
                                <option value="1">양력</option>
                                <option value="2">음력 평달</option>
                                <option value="3">음력 윤달</option>
                            </select>
                        </div>

                    </div>
                    <div className="pt-5 text-lg">
                        <p className="pb-5">⏰태어난 시간</p>
                        <select className="w-1/4 border py-2 px-5 rounded-3xl" value={time} onChange={(e)=>setTime(e.target.value)}>
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
                    <div className="pt-5 text-lg">
                        <button className="border w-full px-5 py-3 rounded-3xl bg-cyan-600 text-white" onClick={fetchData}>확인</button>
                    </div>
                </div>
                {
                    resultToday &&
                    <div className="max-w-7xl mx-auto">
                        <h2>{resultToday.title}</h2>
                        <p className='text-3xl'>오늘의 운세</p>
                        <p className='text-2xl'>{resultToday.date}</p>
                        {
                            resultToday.content.map((e,i)=>{
                                return(
                                    <div key={i}>
                                        <h3 className="text-xl border-y bg-cyan-600 text-white py-3 pl-5">{e.name}</h3>
                                        <p className='text-base py-3'>{e.desc}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                {
                    resultTomorrow &&
                    <div className="max-w-7xl mx-auto">
                        <h2>{resultTomorrow.title}</h2>
                        <p className='text-3xl'>내일의 운세</p>
                        <p className='text-2xl'>{resultTomorrow.date}</p>
                        {
                            resultTomorrow.content.map((e,i)=>{
                                return(
                                    <div key={i}>
                                        <h3 className="text-xl border-y bg-cyan-600 text-white py-3 pl-5">{e.name}</h3>
                                        <p className='text-base py-3'>{e.desc}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                {
                    resultMonth &&
                    <div className="max-w-7xl mx-auto">
                        <h2>{resultMonth.title}</h2>
                        <p className='text-3xl'>한달의 운세</p>
                        <p className='text-2xl'>{resultMonth.date}</p>
                        {
                            resultMonth.content.map((e,i)=>{
                                return(
                                    <div key={i}>
                                        <h3 className="text-xl border-y bg-cyan-600 text-white py-3 pl-5">{e.name}</h3>
                                        <p className='text-base py-3'>{e.desc}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </>
    )
}
