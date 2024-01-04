// import React from 'react'

import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
type TodoType = {
    id: string,
    todoText: string,
    completed: boolean
}[]

const getLocalItems = () : TodoType=>{
    const list = localStorage.getItem('todoos');
    if(list){
        return JSON.parse( list);
    }else{
        return []
    }
}

const ToodUi = () => {
    const [toodos, setTodos] = useState<TodoType>(getLocalItems)
    // const [complte, setCompleted] = useState<TodoType >([])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        const texts = form.text.value;
        console.log(texts)
        // eslint-disable-next-line
        setTodos((prev) => {
            return [
                ...prev,
                {
                    id: Math.random().toString(),
                    todoText: texts,
                    completed: false,
                },
            ];
        });

        form.text.value = ""


    }
    const handleCompleted = (id: string) => {
        setTodos(prev => prev.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    completed: !item.completed
                };

            } else {
                return item
            }
        }));
    };

    console.log(toodos)

    useEffect(()=>{
        localStorage.setItem('todoos', JSON.stringify(toodos))
    }, [toodos])

    // item.id === id ? { ...item, completed: !item.completed } : item
    return (
        <div className="mt-[-50px]">

            
            <form onSubmit={handleSubmit} className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto">

                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <input placeholder="Type Your Todo..." type="text" name="text" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>


                            <div className="p-2 w-full">
                                <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add Todo</button>
                            </div>

                        </div>
                    </div>
                </div>
            </form>

           {toodos.length>0 && <div className="mx-10  md:mx-32 lg:mx-32 mt-[-15px]">
                <div role="tablist" className="tabs tabs-lifted">
                    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="All Todo" defaultChecked/>
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <ul>
                            {toodos?.map((item) => (
                                <div className="my-3 hover:cursor-pointer" key={item.id}>
                                    <div className="w-full flex gap-4"  >
                                        <li className="text-2xl font medium text-white bg-indigo-500 pl-4 py-2 rounded w-full">{item.todoText}</li>
                                        <span>   
                                         <button onClick={() => handleCompleted(item.id)} className="bg-[#333] text-white py-3 px-4">Completed</button>
                                        </span>
                                    </div>
                                </div>


                            ))}
                        </ul>

                    </div>

                    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Active"  />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">{
                        <ul>
                            {toodos?.filter(iteam => iteam.completed === false).map((item) => (
                                <div className="my-3 hover:cursor-pointer" key={item.id}>
                                <li className="text-2xl font medium text-white bg-indigo-500 pl-4 py-2 rounded">{item.todoText}</li>
                                </div>
                            ))}
                        </ul>
                    }</div>

                    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Completed" />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <ul>
                            {toodos?.filter(iteam => iteam.completed === true).map((item) => (
                                <li className="text-2xl font medium text-white bg-indigo-500 pl-4 py-2 rounded my-3"  key={item.id}>{item.todoText}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div> }



        </div>
    )
}

export default ToodUi
