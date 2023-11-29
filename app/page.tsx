'use client'
import {useEffect, useState} from 'react';
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


export default function Home() {
    const [gender,setGender] = useState<string>("");
    const [birthDate,setBirthDate] = useState<string>("");
    const [month,setMonth] = useState<string>("1");
    const [time,setTime] = useState<string>("");
    
    const[resultToday,setResultToday] = useState<today | null>(null);
    const[resultTomorrow,setResultTomorrow] = useState<today | null>(null);
    const[resultMonth,setResultMonth] = useState<today | null>(null);
    const[dataResult,setDataResult] = useState<[today[] | null]>([null])

    const fetchData = async () =>{
        if (!gender) {
            alert("성별을 입력해주세요.");
            return;
        } 
        if (!birthDate) {
            alert("생년월일을 입력해주세요.");
            return;
        } 
        const res = await fetch(`/api?gender=${gender}&birthdate=${birthDate}&month=${month}&time=${time}`)
        const data = await res.json()
        
        setResultToday(data.result.day);
        setResultTomorrow(data.result.tomorrow);
        setResultMonth(data.result.month);
        // console.log(data.result.day);
        // console.log(data.result.tomorrow);
        // console.log(data.result.month);
    }
    useEffect(()=>{
        console.log(dataResult)
    },[dataResult])

    const birthChange = ((e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if(value.length <=8 && /^[0-9]*$/.test(value)){
            setBirthDate((value))
        }
    })
    const [selectedCategory, setSelectedCategory] = useState<string>('today');
    // const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const menuList = ['오늘', "내일", "한달"];
    const dataList = [resultToday,resultTomorrow,  resultMonth]

    return (
        <>
            <div className="w-full">
                <div className="max-w-7xl mx-auto mt-10 px-5">
                    <h1 className="text-3xl md:text-4xl text-center">운세</h1>
                    <p onClick={()=>{location.reload();}} className='mt-10 cursor-pointer text-right'>다시하기</p>
                    <div className="border rounded-md p-5">
                        <div className="text-lg flex flex-wrap items-center">
                            <p className='mr-2'>성별</p>
                            <div className="flex gap-x-2">
                                <button className={`py-1 px-3 border rounded-md ${gender === 'm' ? 'bg-blue-500 text-white' : ''}`} onClick={()=>{setGender("m")}}>남자🧑🏻</button>
                                <button className={`py-1 px-3 border rounded-md ${gender === 'f' ? 'bg-pink-500 text-white' : ''}`}  onClick={()=>{setGender("f")}}>여자👧🏻</button>
                            </div>
                        </div>                   
                        <div className="pt-8 text-lg flex flex-wrap items-center gap-x-2">
                            <p>🎉 생년월일</p>
                            <input className="border py-1 md:px-3 px-1 rounded-md" type="text" onChange={birthChange} placeholder="생년월일(8자리)" value={birthDate} />
                        </div>
                        <div className="pt-8 text-lg flex flex-wrap items-center gap-x-2">
                            <p>📆 양력 , 음력</p>
                            <select className="border py-1 px-3 rounded-md" value={month} onChange={(e)=>setMonth(e.target.value)}>
                                <option value="1">양력</option>
                                <option value="2">음력 평달</option>
                                <option value="3">음력 윤달</option>
                            </select>
                        </div>
                        <div className="pt-8 text-lg flex flex-wrap items-center gap-x-2">
                            <p>⏰ 태어난 시간</p>
                            <select className="border py-1 px-3 rounded-md" value={time} onChange={(e)=>setTime(e.target.value)}>
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
                            <button className="border w-full px-5 py-3 rounded-md bg-cyan-600 text-white" onClick={()=>{fetchData();}}>확인</button>
                        </div>
                    </div>                   
                </div>
                <div className="max-w-7xl mx-auto px-5">
                    <div className='flex gap-x-2 p-2'>
                        {/* {
                            menuList.map((e,i)=>{
                                return(
                                    <button key={i} className={`border py-1 px-2 ${selectedCategory === i ? 'bg-cyan-700 text-white' : ''}`} onClick={() => setSelectedCategory(i)}>{e}</button>
                                )
                            })
                        } */}
                        
                        {/* {
                          resultToday && resultTomorrow && resultMonth && dataList[selectedCategory] && dataList[selectedCategory].map((e,i)=>{
                                return(
                                    <p key={i}>{e.desc}</p>
                                )
                            })
                        } */}

                        

                        
                        {/* <button className={`border py-1 px-2 ${selectedCategory === 'today' ? 'bg-cyan-700 text-white' : ''}`} onClick={() => setSelectedCategory(0)}>오늘의 운세</button>
                        <button className={`border py-1 px-2 ${selectedCategory === 'tomorrow' ? 'bg-cyan-700 text-white' : ''}`} onClick={() => setSelectedCategory(1)}>내일의 운세</button>
                        <button className={`border py-1 px-2 ${selectedCategory === 'month' ? 'bg-cyan-700 text-white' : ''}`} onClick={() => setSelectedCategory(2)}>한달 운세</button> */}
                    </div>
                </div>

             
                {
                    selectedCategory === 'today' && resultToday &&
                    <div className="max-w-7xl px-5 mx-auto">
                        <p className='text-3xl'>오늘의 운세</p>
                        <p className='text-2xl'>{resultToday.date}</p>
                        {
                            resultToday.content.slice(0, -1).map((e,i)=>{
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
                    selectedCategory === 'tomorrow' && resultTomorrow &&
                    <div className="max-w-7xl px-5 mx-auto">
                        <p className='text-3xl'>내일의 운세</p>
                        <p className='text-2xl'>{resultTomorrow.date}</p>
                        {
                            resultTomorrow.content.slice(0, -1).map((e,i)=>{
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
                    selectedCategory === 'month' && resultMonth &&
                    <div className="max-w-7xl px-5 mx-auto">
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