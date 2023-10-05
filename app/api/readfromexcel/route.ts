import { NextResponse, NextRequest } from "next/server"
import { Workbook } from 'exceljs';

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        if (req.method !== "GET") {
            return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
        } else {

            const filePath = './data.xlsx';
            const workbook = new Workbook();
            await workbook.xlsx.readFile(filePath);

            const worksheet = workbook.getWorksheet("Sheet1");

            //get the cell values we just wrote
            const revenueCell = worksheet.getCell("A1").value;
            const expensesCell = worksheet.getCell("A2").value;
            const ProfitCell = worksheet.getCell("A2").value;
            console.log(`REVENUE CELL from GET:`, revenueCell, `EXPENSES CELL from get:`, expensesCell)


            // Read from specific cell
            // const cellValueObj = worksheet.getCell("A4").value;
            // const profitValue = (cellValueObj && typeof cellValueObj === "object" && "result" in cellValueObj) 
            //                     ? Number(cellValueObj.result) 
            //                     : null;

            // console.log(profitValue);

            return NextResponse.json(
                { 
                    Profit: ProfitCell,
                    Revenue: revenueCell,
                    Expenses: expensesCell, 
                    message: `GET Request for Profit ${ProfitCell} Successful`
                }, 
                { status: 200 }
            );
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "An error occurred." }, { status: 500 });
    }
}


// import { NextResponse, NextRequest } from "next/server";
// import * as XLSX from 'xlsx';

// export async function GET(req: NextRequest, res: NextResponse) {
//     try {
//         if (req.method !== "GET") {
//             return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
//         } else {

//             const filePath = './data.xlsx';
//             const workbook = XLSX.readFile(filePath);
//             const worksheet = workbook.Sheets[workbook.SheetNames[0]];

//             // Read from specific cell
//             const cellValueObj = worksheet["C1"];
//             const profitValue = (cellValueObj && cellValueObj.v) ? Number(cellValueObj.v) : null;

//             console.log(profitValue);

//             return NextResponse.json(
//                 { 
//                     Profit: profitValue, 
//                     message: `GET Request for Profit ${profitValue} Successful`
//                 }, 
//                 { status: 200 }
//             );
//         }
//     } catch (err) {
//         console.log(err);
//         return NextResponse.json({ error: "An error occurred." }, { status: 500 });
//     }
// }



// import { NextApiRequest, NextApiResponse } from 'next';
// import { Workbook } from 'exceljs';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     const filePath = './data.xlsx';
//     const workbook = new Workbook();
//     await workbook.xlsx.readFile(filePath);

//     const worksheet = workbook.getWorksheet("Sheet1");

//     // Read from specific cell
//     const profitValue = worksheet.getCell("C1").value;

//     res.status(200).json({ Profit: profitValue });
//   } else {
//     res.status(405).json({ error: 'Method not allowed.' });
//   }
// }
