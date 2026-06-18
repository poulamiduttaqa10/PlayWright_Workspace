const {test,expect}=require('@playwright/test');
const ExcelJS=require('exceljs');


async function testExcel(searchText,replacementText,change,filePath){
let input={row:-1,column:-1};
const excelWorkbook=new ExcelJS.Workbook();
await excelWorkbook.xlsx.readFile(filePath);
const workSheet=excelWorkbook.getWorksheet('Sheet1');
input=readExcel(workSheet,searchText);
const cell=workSheet.getCell(input.row+change.row,input.column+change.column);
cell.value=replacementText;
await excelWorkbook.xlsx.writeFile(filePath);
}

function readExcel(workSheet,searchText) {
    const result={};
    workSheet.eachRow((row,rowNumber)=>{
    console.log("rows:"+rowNumber+":"+row.values)
    row.eachCell((cellElement,colNum)=>{
        console.log(cellElement.value);
        //"C:\Users\poula\Downloads\downloadExcelTest.xlsx"
        if(cellElement.value===searchText){
            console.log("rownumber:"+rowNumber);
            console.log("cellnumber:"+colNum)
            result.row=rowNumber;
            result.column=colNum;
        }
    })
})
return result;
}
//testExcel("Mango",350,{row:0,column:2},"/Users/poula/Downloads/ExcelTestCreated.xlsx");

test("Upload download excel validations", async ({page})=>{
    const filePath='/Users/poula/Downloads/download.xlsx';
    const searchText='Mango';
    const updatedValue=350;
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    await page.getByRole('button',{name:'Download'}).waitFor();
    await page.screenshot({path:'tests/screenshots/excelFormatOG.png'});
    const downloadPromise=page.waitForEvent('download');
    await page.getByRole('button',{name:'Download'}).click();
    const download = await downloadPromise;
    await download.saveAs(filePath);
   // await page.pause();
    //const dl=await download;
    await testExcel(searchText,updatedValue,{row:0,column:2},filePath);
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);
    await page.screenshot({path:'tests/screenshots/excelFormatModified.png'});
    //await page.pause();
    const searchTextLocator=await page.getByText(searchText);
    const desiredRow=await page.getByRole('row').filter({has: searchTextLocator});

    await expect(await desiredRow.locator("#cell-4-undefined")).toContainText(updatedValue.toString());
});