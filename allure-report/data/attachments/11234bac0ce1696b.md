# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: upload-download.spec.js >> Upload download excel validations
- Location: tests\upload-download.spec.js:35:1

# Error details

```
Test timeout of 50000ms exceeded.
```

```
Error: download.saveAs: canceled
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - 'heading "RAHUL SHETTY ACADEMY PRACTISE Note: Data will be reset after page refresh." [level=1] [ref=e6]':
      - text: RAHUL SHETTY ACADEMY PRACTISE
      - generic [ref=e7]: "Note: Data will be reset after page refresh."
  - generic [ref=e8]:
    - table [ref=e11]:
      - rowgroup [ref=e12]:
        - row "S No ▲ Fruit Name ▲ Color ▲ Price ▲ Season ▲" [ref=e13]:
          - columnheader "S No ▲" [ref=e15] [cursor=pointer]:
            - generic [ref=e16]: S No
            - generic [ref=e17]: ▲
          - columnheader "Fruit Name ▲" [ref=e19] [cursor=pointer]:
            - generic [ref=e20]: Fruit Name
            - generic [ref=e21]: ▲
          - columnheader "Color ▲" [ref=e23] [cursor=pointer]:
            - generic [ref=e24]: Color
            - generic [ref=e25]: ▲
          - columnheader "Price ▲" [ref=e27] [cursor=pointer]:
            - generic [ref=e28]: Price
            - generic [ref=e29]: ▲
          - columnheader "Season ▲" [ref=e31] [cursor=pointer]:
            - generic [ref=e32]: Season
            - generic [ref=e33]: ▲
      - rowgroup [ref=e34]:
        - row "1 Mango Yellow 299 Summer" [ref=e35]:
          - cell "1" [ref=e36]:
            - generic [ref=e37]: "1"
          - cell "Mango" [ref=e38]:
            - generic [ref=e39]: Mango
          - cell "Yellow" [ref=e40]:
            - generic [ref=e41]: Yellow
          - cell "299" [ref=e42]:
            - generic [ref=e43]: "299"
          - cell "Summer" [ref=e44]:
            - generic [ref=e45]: Summer
        - row "2 Apple Red 345 Winter" [ref=e46]:
          - cell "2" [ref=e47]:
            - generic [ref=e48]: "2"
          - cell "Apple" [ref=e49]:
            - generic [ref=e50]: Apple
          - cell "Red" [ref=e51]:
            - generic [ref=e52]: Red
          - cell "345" [ref=e53]:
            - generic [ref=e54]: "345"
          - cell "Winter" [ref=e55]:
            - generic [ref=e56]: Winter
        - row "3 Papaya Orange 187 Spring" [ref=e57]:
          - cell "3" [ref=e58]:
            - generic [ref=e59]: "3"
          - cell "Papaya" [ref=e60]:
            - generic [ref=e61]: Papaya
          - cell "Orange" [ref=e62]:
            - generic [ref=e63]: Orange
          - cell "187" [ref=e64]:
            - generic [ref=e65]: "187"
          - cell "Spring" [ref=e66]:
            - generic [ref=e67]: Spring
        - row "4 Banana Yellow 69 All" [ref=e68]:
          - cell "4" [ref=e69]:
            - generic [ref=e70]: "4"
          - cell "Banana" [ref=e71]:
            - generic [ref=e72]: Banana
          - cell "Yellow" [ref=e73]:
            - generic [ref=e74]: Yellow
          - cell "69" [ref=e75]:
            - generic [ref=e76]: "69"
          - cell "All" [ref=e77]:
            - generic [ref=e78]: All
        - row "5 Kivi Green 399 Winter" [ref=e79]:
          - cell "5" [ref=e80]:
            - generic [ref=e81]: "5"
          - cell "Kivi" [ref=e82]:
            - generic [ref=e83]: Kivi
          - cell "Green" [ref=e84]:
            - generic [ref=e85]: Green
          - cell "399" [ref=e86]:
            - generic [ref=e87]: "399"
          - cell "Winter" [ref=e88]:
            - generic [ref=e89]: Winter
        - row "6 Orange Orange 199 Summer" [ref=e90]:
          - cell "6" [ref=e91]:
            - generic [ref=e92]: "6"
          - cell "Orange" [ref=e93]:
            - generic [ref=e94]: Orange
          - cell "Orange" [ref=e95]:
            - generic [ref=e96]: Orange
          - cell "199" [ref=e97]:
            - generic [ref=e98]: "199"
          - cell "Summer" [ref=e99]:
            - generic [ref=e100]: Summer
    - navigation [ref=e102]:
      - generic [ref=e103]: "Rows per page:"
      - generic [ref=e104]:
        - combobox "Rows per page:" [ref=e105] [cursor=pointer]:
          - option "10" [selected]
          - option "15"
          - option "20"
          - option "25"
          - option "30"
        - img
      - generic [ref=e106]: 1-6 of 6
      - generic [ref=e107]:
        - button "First Page" [disabled] [ref=e108]:
          - img [ref=e109]
        - button "Previous Page" [disabled] [ref=e112]:
          - img [ref=e113]
        - button "Next Page" [disabled] [ref=e116]:
          - img [ref=e117]
        - button "Last Page" [disabled] [ref=e120]:
          - img [ref=e121]
  - generic [ref=e125]:
    - button "Download" [active] [ref=e126] [cursor=pointer]
    - button "Choose File" [ref=e127]
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
  39 |     await page.goto("https://rahulshettyacademy.com/upload-download-test/");
  40 |     await page.getByRole('button',{name:'Download'}).waitFor();
  41 |     await page.screenshot({path:'tests/screenshots/excelFormatOG.png'});
  42 |     const downloadPromise=page.waitForEvent('download');
  43 |     await page.getByRole('button',{name:'Download'}).click();
  44 |     const download = await downloadPromise;
> 45 |     await download.saveAs(filePath);
     |                    ^ Error: download.saveAs: canceled
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