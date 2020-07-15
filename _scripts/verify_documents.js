// let reader = new FileReader();
let data = require('./documentsupdated.json');
const fs = require("fs"); // Or `import fs from "fs";` with ESM
const commonMethods = require('./common_functions.js');

let path;

(function () {
   commonMethods.resetErrorCounter();
   let pass = 0; // 0 is true -1 is false
   data.forEach(item => {
      path = "pages/documents/";
      path += commonMethods.convertToExpectedFolderName(item.categoryname) + '/';
      if (fs.existsSync(path) && item.documents) {
         item.documents.forEach(doc => {
            var document_path = path
            //check if document is a folder 
            if (doc.pages) {
               document_path += commonMethods.convertToExpectedFolderName(doc.documentname) + '/'
               // console.log("Doc is a folder")
               if (fs.existsSync(document_path)) {
                  // console.log('Doc Folder exists');
                  //now loop over pages
                  doc.pages.forEach(page => {
                     let page_path = document_path;
                     if (page.subpages) {
                        page_path += commonMethods.convertToExpectedFolderName(page.pagename) + '/'
                        if (fs.existsSync(page_path)) {
                           page.subpages.forEach(subpage => {
                              commonMethods.fileExists(subpage.subpagename, page_path)
                           })
                        } else {
                           console.log(`${page.pagename} folder doesn't exist or is not named properly. \n\n`);
                        }
                        // TODO
                     }
                     commonMethods.fileExists(page.pagename, document_path)
                  })
               }
               else {
                  console.log(`${doc.documentname} folder doesn't exist or is not named properly. \n\n`);
               }
            }
            commonMethods.fileExists(doc.documentname, document_path)
         })

      } else {
         console.log(` ${commonMethods.convertToExpectedFolderName(item.categoryname)} folders doesn't exist or is not named properly. \n\n`);
      }
   })
   let errorCounter = commonMethods.getErrorCount();
   console.log("\n\n Number of errors: ", errorCounter)
   if (errorCounter > 0) {
      throw new Error('Please address the errors and commit again in the documents folder. These errors are in the logs under the _scripts folder : ' + errorCounter)
   }
   return errorCounter
}());




