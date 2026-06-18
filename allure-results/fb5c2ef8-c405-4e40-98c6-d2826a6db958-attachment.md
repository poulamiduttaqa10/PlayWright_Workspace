# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: upload-download.spec.js >> Upload download excel validations
- Location: tests\upload-download.spec.js:35:1

# Error details

```
Error: page.goto: net::ERR_ABORTED at https://rahulshettyacademy.com/upload-download-test/
Call log:
  - navigating to "https://rahulshettyacademy.com/upload-download-test/", waiting until "load"

```

# Test source

```ts
  1  | const {test,expect}=require('@playwright/test');
  2  | const ExcelJS=require('exceljs');
  3  | 
  4  | 
  5  | async function testExcel(searchText,replacementText,change,filePath){
  6  | let input={row:-1,column:-1};
  7  | const excelWorkbook=new ExcelJS.Workbook();
  8  | await excelWorkbook.xlsx.readFile(filePath);
  9  | const workSheet=excelWorkbook.getWorksheet('Sheet1');
  10 | input=readExcel(workSheet,searchText);
  11 | const cell=workSheet.getCell(input.row+change.row,input.column+change.column);
  12 | cell.value=replacementText;
  13 | await excelWorkbook.xlsx.writeFile(filePath);
  14 | }
  15 | 
  16 | function readExcel(workSheet,searchText) {
  17 |     const result={};
  18 |     workSheet.eachRow((row,rowNumber)=>{
  19 |     console.log("rows:"+rowNumber+":"+row.values)
  20 |     row.eachCell((cellElement,colNum)=>{
  21 |         console.log(cellElement.value);
  22 |         //"C:\Users\poula\Downloads\downloadExcelTest.xlsx"
  23 |         if(cellElement.value===searchText){
  24 |             console.log("rownumber:"+rowNumber);
  25 |             console.log("cellnumber:"+colNum)
  26 |             result.row=rowNumber;
  27 |             result.column=colNum;
  28 |         }
  29 |     })
  30 | })
  31 | return result;
  32 | }
  33 | //testExcel("Mango",350,{row:0,column:2},"/Users/poula/Downloads/ExcelTestCreated.xlsx");
  34 | 
  35 | test("Upload download excel validations", async ({page})=>{
  36 |     const filePath='/Users/poula/Downloads/download.xlsx';
  37 |     const searchText='Mango';
  38 |     const updatedValue=350;
> 39 |     await page.goto("https://rahulshettyacademy.com/upload-download-test/");
     |                ^ Error: page.goto: net::ERR_ABORTED at https://rahulshettyacademy.com/upload-download-test/
  40 |     await page.getByRole('button',{name:'Download'}).waitFor();
  41 |     await page.screenshot({path:'tests/screenshots/excelFormatOG.png'});
  42 |     const downloadPromise=page.waitForEvent('download');
  43 |     await page.getByRole('button',{name:'Download'}).click();
  44 |     const download = await downloadPromise;
  45 |     await download.saveAs(filePath);
  46 |    // await page.pause();
  47 |     //const dl=await download;
  48 |     await testExcel(searchText,updatedValue,{row:0,column:2},filePath);
  49 |     await page.locator("#fileinput").click();
  50 |     await page.locator("#fileinput").setInputFiles(filePath);
  51 |     await page.screenshot({path:'tests/screenshots/excelFormatModified.png'});
  52 |     //await page.pause();
  53 |     const searchTextLocator=await page.getByText(searchText);
  54 |     const desiredRow=await page.getByRole('row').filter({has: searchTextLocator});
  55 | 
  56 |     await expect(await desiredRow.locator("#cell-4-undefined")).toContainText(updatedValue.toString());
  57 | });
```