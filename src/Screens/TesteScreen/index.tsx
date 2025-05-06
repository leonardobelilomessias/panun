'use client'

import { use, useEffect, useState } from "react";

export function TesteScreen() {
    const [count, setCount] = useState(10);

    useEffect(() => {},[])      

    useEffect(() => {
        setCount(count-1);
    }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Teste</h1>
      <p className="mt-4 text-lg">Esta é uma página de teste.</p>
      <p>00</p>:<p>{count}</p>
    </div>
  );
}