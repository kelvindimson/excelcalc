import { NextResponse, NextRequest  } from "next/server"
import { Workbook } from 'exceljs';
import fs from 'fs';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest, res: NextResponse) {

    try {
        if (req.method !== "POST") {
            return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
        }
        else {
            const { revenue, expense }: calcValues = await req.json();
            if (!revenue || !expense) {
                return NextResponse.json({ error: "Missing revenue or expense" }, { status: 400 });
            }

            const filePath = './data.xlsx';
            const workbook = new Workbook();
            if (fs.existsSync(filePath)) {
            await workbook.xlsx.readFile(filePath);
            }
            let worksheet = workbook.getWorksheet("Sheet1");
            if (!worksheet) {
            worksheet = workbook.addWorksheet("Sheet1");
            }

            // Write to specific cells
            worksheet.getCell("A1").value = revenue;
            worksheet.getCell("A2").value = expense;
            await workbook.xlsx.writeFile(filePath);

            //get the cell values we just wrote
            const revenueCell = worksheet.getCell("A1").value;
            const expenseCell = worksheet.getCell("A2").value;
            const profitCell = worksheet.getCell("A4").value;

            console.log(profitCell);

            return NextResponse.json(
            { 
                message: `POST Request for Revenue ${revenueCell} and expense ${expenseCell} added to excel file successfully
                Profit is ${profitCell}`,
                Profit: profitCell,
                Revenue: revenueCell,
                Expense: expenseCell 
            }, 
            { 
                status: 200 
            }
            );
        }

    } catch (err) {
        console.log(err);
    }
}



