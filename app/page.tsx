"use client";
import React from 'react'
import { useState } from 'react';
export const dynamic = 'force-dynamic'
const Home = () => {
  const [formValues, setFormValues] = useState<{ revenue: string | number; expense: string | number }>({ revenue: "", expense: "" });
  const [profit, setProfit] = useState<number | null>(null);
  const [excelRevenue, setExcelRevenue] = useState<number>();
  const [excelExpense, setExcelExpense] = useState<number>();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const keyCode = e.key;
      // Prevent non-numeric characters
      if (!keyCode.match(/[0-9]/) && e.key !== "Backspace" && e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Tab" && e.key !== ".") {
          e.preventDefault();
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const numericValue = value === "" ? "" : parseFloat(value);
      setFormValues((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log('submitting');
        // Extract revenue and expense from formValues state
        const { revenue, expense } = formValues;
        try {
          // Write data to Excel
          const response = await fetch('/api/writetoexcel', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ revenue, expense }),
          });
  
          if (!response.ok) {
              throw new Error('Failed to write to Excel');
          }

          //read from the response
          const responseData = await response.json();
          console.log(responseData);
          setProfit(responseData.Profit);
          setExcelRevenue(responseData.Revenue);
          setExcelExpense(responseData.Expense);

      } catch (error) {
          console.error("Error during Excel operations:", error);
      }
    };

//   const handleGetProfit = async () => {
//     try {
//         // Read profit from Excel
//         const data = await fetch('/api/readfromexcel', 
//         { cache: 'no-store' }
//         ).then(res => res.json());
//         setProfit(prev => data.Profit);
//         console.log(data);
//     } catch (error) {
//         console.error("Error during Excel operations:", error);
//     }
//   };

//   const submitAndGetProfit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     new Promise<void>(resolve => {
//       console.log('submitting');
//         handleSubmit(e);
//         resolve();
//     })
//     .then(() => {
//         console.log('getting profit');
//       handleGetProfit();
//     });
// };



  return (
    <div className=''>
      <h1 className="mb-3 text-2xl font-bold "> Welcome to Excel Calc </h1>
      <hr className='mb-4'/>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='p-4 bg-slate-200 rounded'>
        <h3 className='text-md font-bold mb-2'> Values </h3>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="number"
          name='revenue'
          value={formValues.revenue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Revenue"
          className='rounded-lg p-4 bg-white border remove-arrow'
        />
        <input
          type="number"
          name='expense'
          value={formValues.expense}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Expense"
          className='rounded-lg p-4 bg-white border remove-arrow'
        />
        <button type="submit" className='bg-blue-600 text-white py-4 w-full rounded-lg'
        disabled={formValues.revenue === "" || formValues.expense === ""}
        >Calculate Profit</button>
      </form>

        </div>

        <div className='p-4 bg-blue-200 rounded'>
          <h3 className='text-md font-bold mb-2'> Values </h3>
          Revenue: {excelRevenue} <br/>
          Expense: {excelExpense} <br/>
          Profit: {profit}
        </div>



      </div>
    </div>
  )
}

export default Home