// Parse the query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the value of the parameter you want to use in the title
const pageTitle = urlParams.get("data_title");
let identity = urlParams.get("identity");
const emName = urlParams.get("name");
const applyReportingBoss = urlParams.get("boss");
const reportingBossName = urlParams.get("bossName");
const accountsActivityTop = document.getElementById("accountsActivityTop");
// const btn = accountsActivityTop.querySelector("button");
const title = accountsActivityTop.querySelector("p");



if (pageTitle) {
  title.textContent = pageTitle;
  switch (pageTitle) {
    case "Bill entry":
      title.textContent = "Bill Entry";
      fetchHrData("Bill_entry")
        .then((response) => {
          bill_entry_func(response);
          

          //update parameter of back button to hrm page
          // updateHrmButtonOnclickParamenter(identity);
          
          updateOnclickBackButtonWithArrayParams([
            'accounts_Activity_back_btn', 
           
            `hrmRoute('HRM.html', 'hrmMain', 'hrmIcon', '${identity}','${emName}','${applyReportingBoss}','${reportingBossName}')`
          ]);

          document.getElementById('accounts_Activity_back_btn').setAttribute(
            "onclick",
            `handleBackButton('accounts', {class_name:'hrmMain',data_title:'hrmIcon',identity:'${identity}',emName: '${emName}', applyReportingBoss: '${applyReportingBoss}', reportingBossName: '${reportingBossName}'})`
          );
        })
        .catch((error) => {
          // console.log(error);
        });
      break;
    default:
      // console.log("Test");
      break;
  }
}

// sojib emId = "BR-0516-19"
// mong emId = "BR-0682-24"

function bill_entry_func(response){

  const container = document.getElementById("accountsActivityMain"); // Get the image element by its id
  container.innerHTML = "";

  // Create and append the preloader icon
  const preloader = document.createElement("div");
  preloader.setAttribute("id", "preloader_icon");
  preloader.innerHTML = '<img src="../assets/images/preloader.gif" alt="Loading...">';
  container.appendChild(preloader);
  
  
  const date_time = handleDateAndTime('bill_date');    

  container.innerHTML =`
    <div id="bill_entry_container" class="bill_entry_container">
      <div id="bill_entry_button_container" class="bill_entry_button_container">
      
      </div>
      <span id="bill_entry_title"><h2>Bill Entry</h2></span>
      <div id="bill_entry_details_container" class="bill_entry_details_container">
        <div id="entry_container_top" class="entry_container_top">
          <span id="bill_create_ref">
            
            <p id="bill_no"></p>
          </span>
          <span id="bill_create_date">
            
              <p id="bill_date">${date_time.formattedCurrentDate}</p>
          </span>
          <span id="bill_create_time">
            
              <p id="bill_time">${date_time.currentTime}</p>
          </span>
        </div>
        <div id="entry_container_middle" class="entry_container_middle">
        
        </div>

      </div>
    </div>
  `

  // container.innerHTML =`
  // <div id="bill_entry_container" class="bill_entry_container">
  //   <div id="bill_entry_button_container" class="bill_entry_button_container">
    
  //   </div>
  //   <span id="bill_entry_title"><h2>Bill Entry</h2></span>
  //   <div id="bill_entry_details_container" class="bill_entry_details_container">
  //     <div id="entry_container_top" class="entry_container_top">
  //       <span id="bill_create_ref">
  //         <label>Bill Ref</label>
  //         <p id="bill_no"></p>
  //       </span>
  //       <span id="bill_create_date">
  //         <label>Date</label>
  //           <p id="bill_date">${date_time.formattedCurrentDate}</p>
  //       </span>
  //       <span id="bill_create_time">
  //         <label>Time</label>
  //           <p id="bill_time">${date_time.currentTime}</p>
  //       </span>
  //     </div>
  //     <div id="entry_container_middle" class="entry_container_middle">
      
  //     </div>

  //   </div>
  // </div>
  // `

  const imageUpload =`
  <section id="handle_files">
      <label for="files" class="custom-file-input">
        <span>+</span>
        <span>Choose Files</span>
        <input type="file" id="files" name="files[]" multiple accept="image/*"/>
      </label>
  </section>
  `


  const bill_entry_button_container = document.getElementById("bill_entry_button_container");
  const entry_container_top = document.getElementById("entry_container_top")
  const entry_container_middle = document.getElementById("entry_container_middle")
  const bill_entry_title = document.getElementById("bill_entry_title");
  
  const buttons = createNavigationButton(response, "Entry",async function(data,key){
    
    const url = `https://ctgshop.com/erp/api/xbill.ashx?type=get_info`;

    const response = await fetchData(url,{mode:'no-cors'})
      .then((res)=>res)
      .catch(error=>{
        // console.log(error)
      });
    

    if(key === 'Entry'){
      if (document.body.classList.contains('no-scroll')) {
        document.body.classList.remove('no-scroll');
      }
        const date_format = handleDateAndTime('bill_date_picker')
        const entry_container_top = document.getElementById("entry_container_top");
        
        bill_entry_title.style.display = "block";
        entry_container_top.style.display = "flex";
        const useForm = handleForm('entry','entry_class');
        const bill_set = response.bill_set;

        const txtBillRef = bill_set.bill_no;
        const txtBillDate = bill_set.bill_date;
        const txtBillTime = bill_set.bill_time;
        let spinCompany;
        let spinBillType;
        let spinPurpose;
        let spinBillFor;
        let txtNote;
        let txtAmount;
        let default_type='';

        const imageUploadElement = document.createElement('div');
        imageUploadElement.setAttribute("class","field");
        imageUploadElement.setAttribute("align","left");
        imageUploadElement.setAttribute('id','Img_preview');
        imageUploadElement.innerHTML = imageUpload;


        // Create a add bill button
        const addBillBtn = document.createElement("button");
        addBillBtn.type = "submit";
        // addBillBtn.setAttribute('id','add_bill')
        addBillBtn.id = "add_bill";
        addBillBtn.textContent = "Add Bill";

            
        //add bill container
        const addBillContainer = document.createElement('span');
        addBillContainer.setAttribute('id','addBillContainer');

        // add bill info
        const addBillInfo = document.createElement('label');
        addBillInfo.setAttribute('id','addBillInfo');
        addBillInfo.textContent = "After  ADD BILL, please press on  SUBMIT";
        addBillInfo.innerHTML = '<p>After <p style="color: #0343b8; font-weight: 600;">ADD BILL,</p> <p>please press on</p> <p style="color: #0343b8; font-weight: 600;">SUBMIT</p>. </p>';


        // console.log(bill_set,data)

        const bill_no = document.getElementById("bill_no");
        bill_no.textContent = bill_set.bill_no;

        const bill_date = document.getElementById("bill_date");
        bill_date.textContent = bill_set.bill_date;

        const bill_time = document.getElementById("bill_time");
        bill_time.textContent = bill_set.bill_time;

        const entry_container_middle = document.getElementById("entry_container_middle");
        entry_container_middle.innerHTML = "";

        // create spans
        const compSpan = document.createElement('span');
        const billTypeSpan = document.createElement('span');
        const billDateSpan = document.createElement('span');
        const purposeSpan = document.createElement('span');
        const billForSpan = document.createElement('span');
        const billNoteSpan = document.createElement('span');
        const billAmountSpan = document.createElement('span');

        // create select
        const selectComp = document.createElement('select');
        selectComp.setAttribute('id','comp');
        selectComp.name = 'com';

        const selectType = document.createElement('select');
        selectType.setAttribute('id','bill_type');
        selectType.name = 'type';

        const selectPurpose = document.createElement('select');
        selectPurpose.setAttribute('id','bill_purpose');
        selectPurpose.name = 'purpose'; 

        const selectBillFor = document.createElement('select');
        selectBillFor.setAttribute('id','bill_For');
        selectBillFor.name = 'bill_for'; 


        // bill note textarea
        const billNoteTextArea = document.createElement('textarea');
        billNoteTextArea.id = 'billNoteTextArea';
        billNoteTextArea.name = 'bill_Note';
        billNoteTextArea.rows = 4;
        billNoteTextArea.cols = 50;
        billNoteTextArea.placeholder = 'Enter your note here';

        // bill amount input
        const billAmountInput = document.createElement('input');
        billAmountInput.setAttribute('class','rtl-cursors')
        billAmountInput.id = 'billAmountInput';
        billAmountInput.name = 'bill_amount';
        billAmountInput.type = 'number';
        billAmountInput.style.textAlign = 'right'
    
       
        

            
            

        // create label
        const comLabel = document.createElement('label');
        comLabel.textContent = "Company";

        const typeLabel = document.createElement('label');
        typeLabel.textContent = "Bill Type";

        const billDateLabel = document.createElement('label');
        billDateLabel.textContent = 'Bill Date';

        const purposeLabel = document.createElement('label');
        purposeLabel.textContent = "Purpose";

        const billForLabel = document.createElement('label');
        billForLabel.textContent = "Bill For";

        const billNoteLabel = document.createElement('label');
        billNoteLabel.textContent = "Notes";

        const billAmountLabel = document.createElement('label');
        billAmountLabel.textContent = "Amount(Tk)";


        // append child to span
        compSpan.appendChild(comLabel);
        compSpan.appendChild(selectComp);
        
        billTypeSpan.appendChild(typeLabel);
        billTypeSpan.appendChild(selectType);

        
        // Date picker input
        const billDateInput = document.createElement('input');
        billDateInput.type = 'text';
        billDateInput.id = 'bill_date_picker';
        billDateInput.name = 'bill_date_picker';

        
        // Initialize the date picker
        const currentDate = new Date();
        const formattedCurrentDate = $.datepicker.formatDate('dd/mm/yy', currentDate);
        $(billDateInput).datepicker({
          dateFormat: 'dd/mm/yy'
        }).datepicker('setDate', currentDate); // Set current date

        // billDateInput.value = formattedCurrentDate; // Set initial value
        billDateInput.value = date_format.elementName.value; // Set initial value
        
        billDateSpan.appendChild(billDateLabel);
        // billDateSpan.appendChild(billDateInput);
        billDateSpan.appendChild(date_format.elementName);

        purposeSpan.appendChild(purposeLabel);
        purposeSpan.appendChild(selectPurpose);

        billForSpan.appendChild(billForLabel);
        billForSpan.appendChild(selectBillFor);

        billNoteSpan.appendChild(billNoteLabel);
        billNoteSpan.appendChild(billNoteTextArea);

        billAmountSpan.appendChild(billAmountLabel);
        billAmountSpan.appendChild(billAmountInput);

        // code for company
        response.com.forEach((comp,index)=>{
            const option = document.createElement('option');
            option.value = comp.com;
            option.text = comp.com;

            if(index === 0){
              option.selected = true;
              spinCompany = comp.com
            }
            selectComp.appendChild(option);
        });

        
        // code for bill type
        response.bill_pur.forEach((bill,index)=>{
          const option = document.createElement('option');
          option.value = bill.type
          option.text = bill.type 
          
          if(index === 0){
            option.selected = true 
            spinBillType = bill.type;
            default_type = bill.type
          }
          selectType.appendChild(option);
        });

        
        useForm.appendChild(compSpan);
        useForm.appendChild(billTypeSpan);
        useForm.appendChild(billDateSpan);
        entry_container_middle.appendChild(useForm);

        

        // add selected comp value to spinCompany
        const comp = document.getElementById('comp');
        comp.addEventListener('change',(event)=>{
          const selectedComp = event.target.value;
          spinCompany = selectedComp;
        });

            

        const selectedType = document.getElementById('bill_type');
        selectedType.addEventListener('change',(event)=>{
          const selectedValue = event.target.value;
          spinBillType = selectedValue
          response.bill_pur.forEach((element,index)=>{
            if(element.type === selectedValue){
              const bill_purpose = document.getElementById('bill_purpose');
              const bill_For = document.getElementById('bill_For');
              bill_purpose.innerHTML = "";
              bill_For.innerHTML = "";

              //code for bill purpose
              element.purpose.forEach((nestedElement,index)=>{
                const option = document.createElement('option');
                option.value = nestedElement.pur;
                option.text = nestedElement.pur;

                
                // Check if the index is 0 or 1, and set selected attribute accordingly
                if (index === 0) {
                  option.selected = true;
                  spinPurpose = nestedElement.pur
                }
                
                selectPurpose.appendChild(option)
              });

              //code for bill for
              element.bfor.forEach((nestedBillFor,index)=>{
                const option = document.createElement('option');
                option.value = nestedBillFor.med;
                option.text = nestedBillFor.med;

                // Check if the index is 0 or 1, and set selected attribute accordingly
                if (index === 0) {
                  option.selected = true;
                  spinBillFor = nestedBillFor.med
                }
                
                selectBillFor.appendChild(option)
              })
            }
          })
        });

        useForm.appendChild(purposeSpan);
        useForm.appendChild(billForSpan);
        useForm.appendChild(billNoteSpan);
        useForm.appendChild(billAmountSpan);
        useForm.appendChild(imageUploadElement);

        addBillContainer.appendChild(addBillInfo);
        addBillContainer.appendChild(addBillBtn);

        useForm.appendChild(addBillContainer);

        

        // on change bill purpose value
        const bill_purpose = document.getElementById("bill_purpose");
            
        response.bill_pur.forEach((element,index)=>{
          if(element.type === default_type){
            const option = document.createElement('option');
            for(let key in element.purpose){
              option.value = element.purpose[key].pur;
              option.text = element.purpose[key].pur;
            }
            bill_purpose.appendChild(option)
          }
        })

        bill_purpose.addEventListener('change',(event)=>{
          const selectedBillPurpose = event.target.value;
          
          spinPurpose = selectedBillPurpose;
        })

        // on change bill for value
        const bill_For = document.getElementById("bill_For");

        response.bill_pur.forEach((element,index)=>{
          if(element.type === default_type){
            const option = document.createElement('option');
            for(let key in element.bfor){
              option.value = element.bfor[key].med;
              option.text = element.bfor[key].med;
            }
            bill_For.appendChild(option)
          }
        })

        bill_For.addEventListener('change',(event)=>{
          const selectedBillFor = event.target.value;
          
          spinBillFor = selectedBillFor;
        })

        
        let tBody = [];
        let selectedFiles = [];
        let totalAmount = 0;
        useForm.addEventListener("formSubmitted",(event)=>{
          const submitData = event.detail.formData;

          // Extract billNoteInput from the formData
          let billNoteInput = submitData.bill_Note;

          // Remove newlines from the billNoteInput
          if (billNoteInput) {
              billNoteInput = billNoteInput.replace(/(\r\n|\n|\r)/gm, '');
              
              // Update the submitData object with the cleaned value
              submitData.bill_Note = billNoteInput;
          }


          
          if(!identity ){
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
              title: 'Warning!',
              text: 'Not a valid user',
              icon: 'warning',
              confirmButtonText: 'OK'
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
            return
          }
          
          if(submitData.type && (submitData.type === '' || submitData.type === '--SELECT TYPE--')){
            // console.log('must select bill type')
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');
            Swal.fire({
              title: 'Warning!',
              text: 'Must select bill type',
              icon: 'warning',
              confirmButtonText: 'OK'
            }).then((result) => {
              // Hide the overlay when alert is closed
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent'); // Remove class to allow scrolling
            });
            return
          }
          txtNote = submitData.bill_Note;
          txtAmount = submitData.bill_amount;

          // Initialize an empty object
          let formObject = {};

          // Iterate through the formData object and add key-value pairs to formObject
          for (let key in submitData) {
            // If the key is 'files[]', skip adding to formObject for now
            if (key === 'files[]') continue;
            formObject[key] = submitData[key].toString();
          }
          
          // Create the FormData object
          const newFormData = new FormData();

          // Add other form data to the new FormData object
          for (let key in formObject) {
            if (formObject.hasOwnProperty(key)) {
              newFormData.append(key, formObject[key]);
            }
          }

          selectedFiles.forEach((file,index)=>{
            // imgPath1 = file
            if(!file){
              document.getElementById('darkOverlay').style.display = 'block';
              document.body.classList.add('transparent');
              Swal.fire({
                title: 'Warning!',
                text: 'Must have at least one Attachment',
                icon: 'warning',
                confirmButtonText: 'OK'
              }).then((result) => {
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });
              return
            }else{
              // let attachment1 = new File([imgPath1],imgPath1.name);
              // newFormData.append("attachImage1", attachment1, attachment1.name);

                let attachment = new File([file], file.name);
                newFormData.append(`attachImage${index + 1}`, attachment, attachment.name);
            }
          })
          
          // Convert formObject to a JSON string
          var jsonString = JSON.stringify(formObject);
  
          // Append the JSON string to the FormData object
          newFormData.append("postData", jsonString); 

          const postUrl = `https://ctgshop.com/erp/api/xbill.ashx?type=ent_bill_pur&bno=${txtBillRef}&btp=${spinBillType}&bpur=${spinPurpose}&bnote=${txtNote}&bamo=${txtAmount}&cid=${spinCompany}&bfor=${spinBillFor}&bemp=${identity}`;
          
          fetch(postUrl,{
            method: 'POST',
            body: newFormData
            })
            .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok ' + response.statusText);
              }
              return response.json();
            })
            .then(data=>{
              if(data.status === false){
                document.getElementById('darkOverlay').style.display = 'block';
                document.body.classList.add('transparent');
                Swal.fire({
                    title: 'Warning!',
                    text: data.message,
                    icon: 'warning',
                    confirmButtonText: 'Try Again',
                    customClass: {
                      popup: 'swal2-alert-custom-smallscreen'
                    },
                }).then((result) => {
                  // Hide the overlay when alert is closed
                  document.getElementById('darkOverlay').style.display = 'none';
                  document.body.classList.remove('transparent'); // Remove class to allow scrolling
                });

              }else if(data.status === true){

                const Ref = txtBillRef;
                const Date = txtBillDate;
                const Time = txtBillTime;
                const url = `https://ctgshop.com/erp/api/xbill.ashx?type=get_tmp_bpur&bno=${Ref}&bemp=${identity}`
                
                // empty table fields after submit form with add bill 
                const billNoteTextArea = document.getElementById('billNoteTextArea');
                billNoteTextArea.textContent = "";
                billNoteTextArea.value = "";

                const billAmountInput = document.getElementById('billAmountInput');
                billAmountInput.textContent = "";
                billAmountInput.value = "";
                
                const handle_files = document.getElementById('handle_files');
                let labels = document.getElementsByClassName('img_remove');

                labels = Array.from(labels);
                labels.forEach(function(label) {
                  handle_files.removeChild(label);
                });

                selectedFiles = [];
                selectedFiles.forEach(file=>{
                  displayFile(file);
                });
                
                totalAmount =Number(totalAmount) +  Number(submitData.bill_amount);
                
                fetch(url)
                  .then(response => {
                    if (!response.ok) {
                      throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.text(); // Fetch the response as text
                  })
                  .then(text => {
                    // Parse the text to JSON
                    let data;
                    try {
                      data = JSON.parse(text);
                    } catch (error) {
                      throw new Error('Error parsing JSON: ' + error.message);
                    }
                    
                      // Now you have the parsed JSON data
                      tBody = [];
                      data.Data.forEach((element,index)=>{
                      let obj ={
                        SL:element.sl,
                        Purpose:element.bill_no,
                        Taka:element.bill_amo
                      }
                      tBody.push(obj)
                    })

                    const entry_class = document.getElementById("entry_class");
                    const wholeTable = document.getElementById("bill_entry_table_attrib");
                    
                    
                    if(wholeTable){
                      wholeTable.remove();
                    }
                  

                    const final_submit = document.getElementById("final_submit");
                    if(final_submit){
                      final_submit.remove();
                    }

                    const useFormFinalSubmit = document.createElement('form');
                    useFormFinalSubmit.setAttribute('id', 'finalSubmit');
                    useFormFinalSubmit.setAttribute('class', 'finalSubmit');
                    useFormFinalSubmit.setAttribute('method', 'GET');
                  
                    let finalSubmitTables = document.getElementsByClassName('bill_entry_table_attrib');
                    finalSubmitTables = Array.from(finalSubmitTables);
                    finalSubmitTables.forEach(function(finalSubmitTable) {
                      entry_container_middle.removeChild(finalSubmitTable);
                    });

                    const footerData = ['Total',"",totalAmount];
                    const table = createTable('',['SL','Purpose','Taka'],tBody,'bill_entry_table_attrib',false,footerData);

                    entry_container_middle.appendChild(table)
                    

                    // Create a submit button
                    const submitBtn = document.createElement("button");
                    submitBtn.type = "submit";
                    // submitBtn.setAttribute('id','submit_final_btn');
                    submitBtn.id = "final_submit";
                    submitBtn.textContent = "Submit";
                    entry_container_middle.appendChild(submitBtn);

                    // submit form finally
                    submitBtn.addEventListener('click', function(event) {
                      event.preventDefault();

                      const finalSubmitUrl = `https://ctgshop.com/erp/api/xbill.ashx?type=ent_bill_mas&bno=${Ref}&bdt=${Date}&btim=${Time}&bamo=${totalAmount}&btp=${spinBillType}&emp=${identity}&cid=${spinCompany}`;
                      fetch(finalSubmitUrl)
                        .then(response => {
                          if (!response.ok) {
                            throw new Error('Network response was not ok ' + response.statusText);
                          }
                          return response.json();
                        })
                        .then(data => {
                          const wholeTable = document.getElementById("bill_entry_table_attrib");
                          if(wholeTable){
                            wholeTable.remove();
                          }
                          const final_submit = document.getElementById("final_submit");
                          if(final_submit){
                            final_submit.remove();
                          }


                          useForm.reset();
                          document.getElementById('darkOverlay').style.display = 'block';
                          document.body.classList.add('transparent');
                          Swal.fire({
                            title: 'Success!',
                            text: 'Final submission successful.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                          }).then((result) => {
                            // Hide the overlay when alert is closed
                            document.getElementById('darkOverlay').style.display = 'none';
                            document.body.classList.remove('transparent'); // Remove class to allow scrolling
                          });

                        })
                        .catch(error => {
                          document.getElementById('darkOverlay').style.display = 'block';
                          document.body.classList.add('transparent');
                          Swal.fire({
                            title: 'Error!',
                            text: 'Final submission failed.',
                            icon: 'error',
                            confirmButtonText: 'Try Again'
                          }).then((result) => {
                            // Hide the overlay when alert is closed
                            document.getElementById('darkOverlay').style.display = 'none';
                            document.body.classList.remove('transparent'); // Remove class to allow scrolling
                          });
                        });
                    })
                                      
                    
                  })
                  .catch(error => {
                    console.error('Fetch error:', error);
                  });
                
              }
            })
            .catch(error=>{
              // console.log(error)
            });
        

        });

           
      

        // const file_input=document.getElementById('files');
        document.getElementById('files').addEventListener('change', (e) => {
          const files = Array.from(e.target.files);
          files.forEach(file => {
            const isFileAlreadySelected = selectedFiles.some(selectedFile => selectedFile.name === file.name);
            if (!isFileAlreadySelected) {
              selectedFiles.push(file);
              displayFile(file);
          } else {
              // console.log(`File with name ${file.name} is already selected.`);
          }
              // selectedFiles.push(file);
              // displayFile(file);
          });
          // Reset the input field
          e.target.value = '';

      
          const handle_files = document.getElementById("handle_files");
          let labels = handle_files.getElementsByTagName('label');

          labels = Array.from(labels);
          labels.forEach(function(label){
            if (label.classList.contains('custom-file-input')) {
              handle_files.remove(label);

              handle_files.appendChild(label)

              const Img_preview = document.getElementById("Img_preview");
                if (Img_preview) {
                    Img_preview.appendChild(handle_files);
                }
            }
          })
          
        });

        function displayFile(file) {      
          const handle_files = document.getElementById("handle_files");
          const labels = handle_files.getElementsByTagName('label');
          const img = document.createElement('img');
          const label = document.createElement('label');

          label.setAttribute('class',"img_remove");

          label.setAttribute('style','max-width: 60px; max-height:60px')
          img.setAttribute('style', 'max-width: 100%; max-height:100%; cursor: pointer;');
          img.setAttribute('alt', file.name);
          
          // Use FileReader to read the file and set the image src
          const reader = new FileReader();
          reader.onload = function (e) {
              img.setAttribute('src', e.target.result); 
          };
          reader.readAsDataURL(file);
          label.appendChild(img);

          // img.addEventListener('click', () => {
          //     const previewWindow = window.open();
          //     previewWindow.document.write(`<img src="${img.src}" alt="${file.name}" style="width:100%;">`);
          // });

          const removeButton = document.createElement('button');
          removeButton.setAttribute('id','delete_file')
          removeButton.textContent = '-';
                          
          label.appendChild(removeButton)
          handle_files.appendChild(label);

          const delete_file  = document.getElementById("delete_file")
          
          removeButton.addEventListener('click',function(){
              const handle_files = document.getElementById('handle_files')
              let labels = document.getElementsByClassName('img_remove')

              labels = Array.from(labels);
              labels.forEach(function(label) {
                handle_files.removeChild(label);
              });
            
              selectedFiles = selectedFiles.filter(f => f !== file);
              selectedFiles.forEach(file=>{
                displayFile(file);
              });

              let reverseLabels = handle_files.getElementsByTagName('label')
              reverseLabels = Array.from(reverseLabels);
              reverseLabels.forEach(function(label){
                if (label.classList.contains('custom-file-input')) {
                  handle_files.remove(label);

                  handle_files.appendChild(label)

                  const Img_preview = document.getElementById("Img_preview");
                    if (Img_preview) {
                        Img_preview.appendChild(handle_files);
                    }
                }
            });
          })
        
        } 

        



        const addStyles = {
          // position: "absolute",
          // zIndex: "999",
          
          // overflow: "hidden",
          // width: "100%",
          // backgroundColor: "#fff",

          position:'fixed',
          zIndex:'999',
          width:'100%', /*width: 96%*/
          top:'50px',
          left:'0',/*left: 96%*/
          right:'0',/*right: 96%*/
          backgroundColor:'#fff'
        };
        
        // styles to remove
        const stylesToRemove = [ 'tops','lefts', 'rights'];
        
        
        setStyles(bill_entry_button_container, addStyles);
        removeStyles(bill_entry_button_container, stylesToRemove);


        const overlay_visibility = document.getElementById('overlay')
        if (overlay_visibility.style.visibility === 'visible') {
          overlay_visibility.style.visibility = 'hidden';
        }

        // bill_create_date bill_create_time bill_create_ref



        const bill_create_date = document.getElementById('bill_create_date');
        if(!bill_create_date.querySelector('span > i.fa-solid.fa-calendar-days')){
          // bill_create_date.innerHTML = '<span><i class="fa-solid fa-calendar-days fa-lg"></i></span>' + bill_create_date.innerHTML
          bill_create_date.innerHTML = '<i class="fa-solid fa-calendar-days fa-lg"></i>' + bill_create_date.innerHTML
        }

        const bill_create_time = document.getElementById('bill_create_time');
        if(!bill_create_time.querySelector('span > i.fa-solid.fa-clock')){
          // bill_create_time.innerHTML = '<span><i class="fa-solid fa-clock fa-lg"></i></span>' + bill_create_time.innerHTML
          bill_create_time.innerHTML = '<i class="fa-solid fa-clock fa-lg"></i>' + bill_create_time.innerHTML
        }

        const bill_create_ref = document.getElementById('bill_create_ref');
        if(!bill_create_ref.querySelector('span > i.fa-solid.fa-link')){
          // bill_create_ref.innerHTML = '<span><i class="fa-solid fa-link fa-lg"></i></span>' + bill_create_ref.innerHTML
          bill_create_ref.innerHTML = '<i class="fa-solid fa-link fa-lg"></i>' + bill_create_ref.innerHTML
        }
        
        entry_class.style.paddingTop = `${bill_entry_button_container.offsetHeight + bill_entry_title.offsetHeight + entry_container_top.offsetHeight + 50}px`;

        


        window.addEventListener('resize', function() {
          entry_class.style.paddingTop = `${bill_entry_button_container.offsetHeight + bill_entry_title.offsetHeight + entry_container_top.offsetHeight + 50}px`;
         
        });

        // Initial calculation
        window.dispatchEvent(new Event('resize'));
    }
    else if(key === 'view'){
      if (document.body.classList.contains('no-scroll')) {
        document.body.classList.remove('no-scroll');
      }

      const useForm = handleForm('view','view_class');
      
      if(bill_entry_title){
        bill_entry_title.style.display = "none";
      }
      if(entry_container_top){
        entry_container_top.style.display = "none";
      }

      // entry_container_top.innerHTML = ""
      entry_container_middle.innerHTML = ""
      
      const dateContainer = document.createElement("div");
      
      dateContainer.setAttribute("id", "date_container");
      dateContainer.setAttribute("class", "date_container");
      const startTimeInput = handleDateAndTime('startDatePickerInput');
      const endTimeInput = handleDateAndTime('endDatePickerInput');

      // Set startTimeInput to three months back
      startTimeInput.elementName.value = getMonthsBackDate(3);


      const span = document.createElement("span");
      const singleHolderSpan = document.createElement("span");

      Object.keys(response).forEach(async(key,index)=>{
       
        if(key === 'com'){
          const selectElement =await createSelectElement(response.com, "com",'Company');
          span.appendChild(selectElement);
          
        }
        if(key === 'bill_pur'){
          
          const selectElement = await createSelectElement(response.bill_pur,'type','ALL Type');
          singleHolderSpan.appendChild(selectElement);
          
        }
        if(key === 'st'){
          const selectElement = await createSelectElement(response.st,'st','ALL STATUS');
          singleHolderSpan.appendChild(selectElement);
        }
      })
     
      useForm.appendChild(span);
      useForm.appendChild(singleHolderSpan);

      
      dateContainer.appendChild(startTimeInput.elementName);
      dateContainer.appendChild(endTimeInput.elementName);

      const submitButton = document.createElement("button");
      submitButton.setAttribute('id','search-submit')
      submitButton.type = "submit";
      submitButton.textContent = "Search";

      
      useForm.appendChild(dateContainer);
      useForm.appendChild(submitButton);

      entry_container_middle.appendChild(useForm)

      const fileInputs = document.querySelector('input[type="file"]');
      if(fileInputs){
        
        fileInputs.style.display = 'none';
      }

    
      // Trigger form submission on page load
      const formData = new FormData(useForm);
      const formDataObj = {};
      formData.forEach((value, key) => {
          formDataObj[key] = value;
      });
      handleViewFormSubmission(formDataObj);
      
      useForm.addEventListener("formSubmitted",(event)=>{
        const submitData = event.detail.formData;   
        handleViewFormSubmission(submitData);
      });   
      
      
      const addStyles = {
        position: "fixed",
        top: "50px",
        backgroundColor: "#fff",
        left: "0", /*left: 2%*/
        right: "0", /*right: 2%*/
        width: "100%",  /*width : 96%*/
    };


    // add self bill cancel button
    const bill_show_btns = document.getElementById('bill_show_btns');


    // styles to remove
    const stylesToRemove = ['zIndex', 'overflow'];
  
    setStyles(bill_entry_button_container, addStyles);
    removeStyles(bill_entry_button_container, stylesToRemove);

    overlay_cancel.style.top = `${bill_entry_button_container.offsetHeight}px`;
    overlayImageContainer.style.paddingTop = `${bill_entry_button_container.offsetHeight + overlay_cancel.offsetHeight + 5}px`;

    const overlay_visibility = document.getElementById('overlay')
        if (overlay_visibility.style.visibility === 'visible') {
          overlay_visibility.style.visibility = 'hidden';
        }

       
        
    }
    else if(key === 'Approval'){

      if (document.body.classList.contains('no-scroll')) {
        document.body.classList.remove('no-scroll');
      }

      const useForm = handleForm('approval','approval_class');
      if(bill_entry_title){
        bill_entry_title.style.display = "none";
      }
      if(entry_container_top){
        entry_container_top.style.display = "none";
      }
      // entry_container_top.innerHTML = ""
      entry_container_middle.innerHTML = ""
      
      const dateContainer = document.createElement("div");
      
      dateContainer.setAttribute("id", "date_container");
      dateContainer.setAttribute("class", "date_container");
      const startTimeInput = handleDateAndTime('startDatePickerInput');
      const endTimeInput = handleDateAndTime('endDatePickerInput');

      // Set startTimeInput to three months back
      startTimeInput.elementName.value = getMonthsBackDate(3);

      const span = document.createElement("span");
      span.setAttribute('id','comp_status')
      const singleHolderSpan = document.createElement("span");
      
      const statusParameter = identity === 'BR-0230-15' ? 'CHECKED' : 'PENDING';
      
      Object.keys(response).forEach(async(key,index)=>{
        
        if(key === 'com'){
          const selectElement =await createSelectElement(response.com, "com",'Company');
          span.appendChild(selectElement);
          
        }
        if(key === 'bill_pur'){
          const selectElement = await createSelectElement(response.bill_pur,'type','ALL Type');
          singleHolderSpan.appendChild(selectElement);
          
        }
        if(key === 'st'){
          const selectElement = await createSelectElement(response.st,'st','ALL STATUS',statusParameter);
          singleHolderSpan.appendChild(selectElement);

        }
      })
     
      
      useForm.appendChild(span);
      useForm.appendChild(singleHolderSpan);
      
      dateContainer.appendChild(startTimeInput.elementName);
      dateContainer.appendChild(endTimeInput.elementName);

      const submitButton = document.createElement("button");
      submitButton.setAttribute('id','search-submit')
      submitButton.type = "submit";
      submitButton.textContent = "Search";

      
      useForm.appendChild(dateContainer);
      useForm.appendChild(submitButton);
      
      entry_container_middle.appendChild(useForm);

      const fileInputs = document.querySelector('input[type="file"]');
      if(fileInputs){
        fileInputs.style.display = 'none';
      }

      // Trigger form submission on page load
      const formData = new FormData(useForm);
      const formDataObj = {};
      formData.forEach((value, key) => {
          formDataObj[key] = value;
      });
      

      // on load page approval page build
      handleApprovalFormSubmission(formDataObj);
      
   
      // on submit button click form submission
      useForm.addEventListener("formSubmitted",(event)=>{
        const submitData = event.detail.formData;
       
        handleApprovalFormSubmission(submitData);
        
      });



      const addStyles = {
          position: "fixed",
          top: "50px",
          backgroundColor: "#fff",
          left: "0%",/*left: 0*/
          right: "0%",/*right: 0*/
          width: "100%", /*width: 96%*/
      };

      // styles to remove
      const stylesToRemove = ['zIndex', 'overflow'];
    
      setStyles(bill_entry_button_container, addStyles);
      removeStyles(bill_entry_button_container, stylesToRemove);

      const overlay_visibility = document.getElementById('overlay')
        if (overlay_visibility.style.visibility === 'visible') {
          overlay_visibility.style.visibility = 'hidden';
        }
    }

  });
  

  bill_entry_button_container.appendChild(buttons);


  
}


const handleViewFormSubmission = async(submitData)=>{
 
        let status ='ALL STATUS';
        let company ='ALL COMPANY';
        let type ='ALL TYPE';

        for(let key in submitData){
          if(key === 'Company'){
            company = submitData[key]
          }
          if(key === 'ALL STATUS'){
            status = submitData[key]
          }
          if(key === 'ALL Type'){
            type = submitData[key]
          }
        }       

        const url = `https://ctgshop.com/erp/api/xbill.ashx?type=get_bill_mast&bemp=${identity}&sd=${submitData.startDatePickerInput}&ed=${submitData.endDatePickerInput}&st=${status}&cid=${company}&tp=${type}`
        
        if(url.includes(' ')){
          const encodedUrl = url.replace(/ /g, '%20');
          const entry_container_middle = document.getElementById('entry_container_middle');
          const bill_cards = document.createElement('div');
          
          // bill_cards.innerHTML = ""
          bill_cards.setAttribute('id','all_cards');
          bill_cards.setAttribute('class','all_cards');
         
          // fetchData(encodedUrl,{mode:'no-cors'})
          //   .then((data)=>{
              
              
          //     // Filter the array based on emp_id
          //     const filteredData = data.Data.filter(element => element.emp_id === identity);
         
          //     if(filteredData.length>0){
          //       // Function to convert date and time to a single Date object
          //       function parseDateTime(dateString, timeString) {
          //         const [day, month, year] = dateString.split('/').map(Number);
          //         const [time, modifier] = timeString.split(' ');
          //         let [hours, minutes] = time.split(':').map(Number);

          //         if (modifier === 'PM' && hours !== 12) {
          //           hours += 12;
          //         } else if (modifier === 'AM' && hours === 12) {
          //           hours = 0;
          //         }

          //         return new Date(year, month - 1, day, hours, minutes);
          //       }

          //       // Sort the array based on the combined Date object
          //       filteredData.sort((a, b) => parseDateTime(b.bill_date, b.bill_time) - parseDateTime(a.bill_date, a.bill_time))

          //       filteredData.forEach((element,index)=>{
          //         const single_card = document.createElement('div');
          //         single_card.setAttribute('id','single_card');
          //         single_card.setAttribute('class','single_card');

          //         // Set the color based on the bill status
          //         let statusColor = element.bill_status === 'CANCELLED' ? 'red' : element.bill_status === 'PENDING' ?  'orange' : 'green';

          //         const bill_html = `
          //             <span>
          //               <img src=${element.comp_logo} alt="img"/>
          //               <p>${element.bill_type}</p>
          //             </span>
          //             <p class="bill_ref">${element.bill_no}</p>
          //             <p class="bill_date">${element.bill_date}</p>
          //             <span class="status"><label>Status:</label><p style="background-color: ${statusColor};color:white;padding:3px 8px;border-radius:10px">${element.bill_status}</p></span>
          //             <span><label>Bill Amount</label><p>${element.bill_amo}</p></span>
          //             <span><label>Approved Amount</label><p>${element.bill_app_amo}</p></span>
          //             <p>Submitted By</p>
          //             <p>${element.emp_name}</p>
                     

          //             <span id="bill_show_btns" class="bill_show_btns">
          //               <button onclick='handle_bill_btn("${element.bill_no}","details")'>Entry Details</button>
          //               <button onclick='handle_bill_btn("${element.bill_no}","supporting")'>Supportings</button>
          //             </span>
          //              ${element.bill_status === 'PENDING' ? `<span id="bill_cancel_btn"><button onclick="handle_bill_cancel_btn('${element.bill_no}','${submitData.startDatePickerInput}','${submitData.endDatePickerInput}')">CANCEL</button></span>` : ""}
          //         `
          //         single_card.innerHTML = bill_html;
          //         bill_cards.appendChild(single_card);
          //         entry_container_middle.appendChild(bill_cards);
          //       })
          //     }else{
          //       Swal.fire({
          //         // title: 'Warning!',
          //         text: data.message,
          //         icon: 'warning',
          //         confirmButtonText: 'Try Again',
          //         showCloseButton: true,
          //         focusConfirm: false,
          //         confirmButtonText: "OK",
          //         customClass: {
          //         },
          //       });
          //     }

              
          //     const bill_entry_button_container = document.getElementById('bill_entry_button_container')
          //     const bill_entry_button_container_height = bill_entry_button_container.offsetHeight;
          //     const view_class = document.getElementById('view_class')
          //     const view_class_height = view_class.offsetHeight;
          //     document.getElementById('all_cards') != null ? document.getElementById('all_cards').style.paddingTop = `${(bill_entry_button_container_height + view_class_height + 10)}px` : '';
          //   })
          //   .catch(error=>console.log(error));  
          
          processFetchedData(encodedUrl,identity,entry_container_middle,submitData.startDatePickerInput,submitData.endDatePickerInput);

         

        }    
        const entry_container_middle = document.getElementById('entry_container_middle');
        let all_cards = document.getElementsByClassName('all_cards');
      

        all_cards = Array.from(all_cards)
        all_cards.forEach(function(card){
          entry_container_middle.removeChild(card)
        })

        let bill_date_item = document.getElementsByClassName('bill_date')
        bill_date_item = Array.from(bill_date_item)

        
        

}

const handleApprovalFormSubmission = async(submitData)=>{
  // let status ='ALL STATUS';
  let status = identity === 'BR-0230-15' ? 'CHECKED' : 'PENDING';
  let company ='ALL COMPANY';
  let type ='ALL TYPE';
  

  for(let key in submitData){
    if(key === 'Company'){
      company = submitData[key]
    }
    if(key === 'ALL STATUS'){
      status = submitData[key]
    }
    if(key === 'ALL Type'){
      type = submitData[key]
    }
  }       


  let mast_or_mast_boss_type;

  if(identity === 'BR-0230-15' && status === 'PAID'){
    mast_or_mast_boss_type = 'get_bill_mast';
  } else {
    mast_or_mast_boss_type = 'get_bill_mast_boss';
  }

// let url = `https://ctgshop.com/erp/api/xbill.ashx?type=get_bill_mast&bemp=${identity}&sd=${submitData.startDatePickerInput}&ed=${submitData.endDatePickerInput}&st=${status}&cid=${company}&tp=${type}`
  let url = `https://ctgshop.com/erp/api/xbill.ashx?type=${mast_or_mast_boss_type}&bemp=${identity}&sd=${submitData.startDatePickerInput}&ed=${submitData.endDatePickerInput}&st=${status}&cid=${company}&tp=${type}`
  
  if(url.includes(' ')){
    url = url.replace(/ /g, '%20');
  }
  
  const entry_container_middle = document.getElementById('entry_container_middle');
  const bill_cards = document.createElement('div');
  
  // bill_cards.innerHTML = ""
  bill_cards.setAttribute('id','all_cards');
  bill_cards.setAttribute('class','all_cards');

  fetchData(url,{mode:'no-cors'})
    .then((data)=>{
     
      if(data.status === true){      
        
        // Sort the array based on the combined Date object
        data.Data.sort((a, b) => parseDateTime(b.bill_date, b.bill_time) - parseDateTime(a.bill_date, a.bill_time));

        let filteredData = [];

        data.Data.forEach((element,index)=>{
        //  !== 'CANCELLED' && element.bill_status !== 'CHECKED' && element.bill_status !== 'PAID'
        
          if(identity === 'BR-0017-08'){

            if(element.bill_type === 'MEDICAL BILL' && element.bill_status === status){
              filteredData.push(element)
            } else if(identity === element.emp_boss_id && element.bill_status === status){
              filteredData.push(element)
            } else if(identity === element.emp_boss_id && ( status === 'ALL STATUS' || company === 'ALL COMPANY' || type === 'ALL Type') ){
              filteredData.push(element)
            }
          } else if(identity === 'BR-0230-15'){
            
            if(element.bill_status === 'CHECKED'){
              filteredData.push(element)
            } else if(element.bill_status === 'PAID'){
              filteredData.push(element)
            } 
          } else if(identity !== 'BR-0017-08' && identity !== 'BR-0230-15' && identity === element.emp_boss_id && element.bill_status === status){
              filteredData.push(element)
          }
        })
        
        if(filteredData && filteredData.length > 0){
          filteredData.forEach((element,index)=>{
           
            const single_card = document.createElement('div');
            single_card.setAttribute('id','single_card');
            single_card.setAttribute('class','single_card')

            let authorityButtons = '';
            
            if ((identity === 'BR-0017-08' && element.bill_type === 'MEDICAL BILL' && element.bill_status ==='PENDING') || (identity === 'BR-0017-08' && identity === element.emp_boss_id && element.bill_status ==='PENDING')){
              authorityButtons = `
                  <div id="authority_btn">
                      <button onclick='handle_bill_execute("approve","${element.bill_no}","${identity}","${element.bill_amo}")'>Approve</button>
                      <button onclick='handle_bill_execute("cancel","${element.bill_no}","${identity}","${element.bill_amo}")'>Cancel</button>
                  </div>  
              `;
            }else if(identity === 'BR-0230-15' && element.bill_status === 'CHECKED'){
              authorityButtons = `
                  <div id="authority_btn_paid">
                      <button onclick='handle_bill_execute("paid","${element.bill_no}","${identity}","${element.bill_amo}")'>Paid</button>
                  </div> 
              `;
            } else if(identity !== 'BR-0017-08' && identity !== 'BR-0230-15' && identity === element.emp_boss_id && element.bill_status === 'PENDING'){
              authorityButtons = `
                  <div id="authority_btn">
                      <button onclick='handle_bill_execute("approve","${element.bill_no}","${identity}","${element.bill_amo}")'>Approve</button>
                      <button onclick='handle_bill_execute("cancel","${element.bill_no}","${identity}","${element.bill_amo}")'>Cancel</button>
                  </div>
              `;
            }

            // Set the color based on the bill status
            let statusColor = element.bill_status === 'CANCELLED' ? 'red' : element.bill_status === 'PENDING' ?  'orange' : 'green';

            const bill_html = `
                <span>
                  <img src=${element.comp_logo} alt="img"/>
                  <p>${element.bill_type}</p>
                </span>
                <p class="bill_ref">${element.bill_no}</p>
                <p class="bill_date">${element.bill_date}</p>
                <span class="status"><label>Status:</label><p style="background-color: ${statusColor};color:white;padding:3px 8px;border-radius:10px">${element.bill_status}</p></span>
                <span><label>Bill Amount</label><p>${element.bill_amo}</p></span>
                <span><label>Approved Amount</label><p>${element.bill_app_amo}</p></span>
                <p>Submitted By</p>
                <p>${element.emp_name}</p>
                <span id="bill_show_btns">
                  <button onclick='handle_bill_btn("${element.bill_no}","details")'>Entry Details</button>
                  <button onclick='handle_bill_btn("${element.bill_no}","supporting")'>Supportings</button>
                </span>
                ${authorityButtons}
            `
            single_card.innerHTML = bill_html;
        
            bill_cards.appendChild(single_card);
          
            entry_container_middle.appendChild(bill_cards);
            
          })
        }else if(filteredData && filteredData.length <= 0){
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
            icon: "warning",
            // title: "Oops...",
            text: "Data not found",
            confirmButtonText: "Ok",
            customClass: {
              popup: 'my-swal2-popup-class',        // Add class to the popup
              htmlContainer: 'my-swal2-html-class'  // Add class to the html container
            }
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
        }
  

      }else if(data.status === false){
        document.getElementById('darkOverlay').style.display = 'block';
        document.body.classList.add('transparent');
        Swal.fire({
          text: data.message,
          icon: 'warning',
          confirmButtonText: 'Try Again',
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: "OK",
          customClass: {
            popup: 'my-swal2-popup-class',        // Add class to the popup
            htmlContainer: 'my-swal2-html-class'  // Add class to the html container
          }
          
        }).then((result) => {
          // Hide the overlay when alert is closed
          document.getElementById('darkOverlay').style.display = 'none';
          document.body.classList.remove('transparent'); // Remove class to allow scrolling
        });
      }

      const bill_entry_button_container = document.getElementById('bill_entry_button_container')
      const bill_entry_button_container_height = bill_entry_button_container.offsetHeight;
      const view_class = document.getElementById('approval_class')
      const view_class_height = view_class.offsetHeight;
      
      document.getElementById('all_cards') != null ? document.getElementById('all_cards').style.paddingTop = `${(bill_entry_button_container_height + view_class_height+document.getElementsByClassName('accounts_Activity_back_btn')[0].offsetHeight + 10)}px` :'';

    })
    .catch(error=>{
      // console.log(error)
    });  
     

  let all_cards = document.getElementsByClassName('all_cards');

  all_cards = Array.from(all_cards)
  all_cards.forEach(function(card){
    entry_container_middle.removeChild(card)
  })
}

const handle_bill_cancel_btns = (bno,sd,ed,atn) =>{
  let status ='ALL STATUS';
  let company ='ALL COMPANY';
  let type ='ALL TYPE';

  const url = `https://ctgshop.com/erp/api/xbill.ashx?type=get_bill_mast&bemp=${identity}&sd=${sd}&ed=${ed}&st=${status}&cid=${company}&tp=${type}`
  const encodedUrl = url.replace(/ /g, '%20');
  const entry_container_middle = document.getElementById('entry_container_middle');
  const all_cards = document.getElementById('all_cards');
  

  if (bno) {
    const cancelUrl = `https://ctgshop.com/erp/API/xbill.ashx?type=del_bill&bno=${bno}&bemp=${identity}&batn=${atn}`;
  
    // Perform the fetch request
    fetch(cancelUrl, { method: 'GET', mode: 'cors' })  // Adjust the method and mode as necessary
      .then(response => response.json())  // Parse the response as JSON
      .then(data => {
        // Check the status of the response
        if (data.status === true) {
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
            title: 'Success!',
            text: 'Bill Cancel successful.',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
              popup: 'my-swal2-popup-class',        // Add class to the popup
              htmlContainer: 'my-swal2-html-class'  // Add class to the html container
            }
          }).then((result) => {
            if (result.isConfirmed) {
              all_cards.innerHTML = '';  // Clear the all_cards container
              processFetchedData(encodedUrl, identity, entry_container_middle, sd, ed);
            }
            // Hide the overlay when alert is closed
          document.getElementById('darkOverlay').style.display = 'none';
          document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
        } else if (data.status === false) {
          document.getElementById('darkOverlay').style.display = 'block';
          document.body.classList.add('transparent');
          Swal.fire({
            title: 'Warning!',
            text: 'Bill Cancel Failed',
            icon: 'warning',
            confirmButtonText: 'Try again',
            customClass: {
              popup: 'my-swal2-popup-class',        // Add class to the popup
              htmlContainer: 'my-swal2-html-class'  // Add class to the html container
            }
          }).then((result) => {
            // Hide the overlay when alert is closed
            document.getElementById('darkOverlay').style.display = 'none';
            document.body.classList.remove('transparent'); // Remove class to allow scrolling
          });
        }
      })
      .catch(error => {
        
        document.getElementById('darkOverlay').style.display = 'block';
        document.body.classList.add('transparent');
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue with the request.',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'my-swal2-popup-class',        // Add class to the popup
            htmlContainer: 'my-swal2-html-class'  // Add class to the html container
          }
        }).then((result) => {
          // Hide the overlay when alert is closed
          document.getElementById('darkOverlay').style.display = 'none';
          document.body.classList.remove('transparent'); // Remove class to allow scrolling
        });
      });
  }
}

const handle_bill_cancel_btn = (bno, sd, ed, atn) => {
  let status = 'ALL STATUS';
  let company = 'ALL COMPANY';
  let type = 'ALL TYPE';

  const url = `https://ctgshop.com/erp/api/xbill.ashx?type=get_bill_mast&bemp=${identity}&sd=${sd}&ed=${ed}&st=${status}&cid=${company}&tp=${type}`
  const encodedUrl = url.replace(/ /g, '%20');
  const entry_container_middle = document.getElementById('entry_container_middle');
  const all_cards = document.getElementById('all_cards');

  if (bno) {
    // Ask for confirmation before canceling the bill
    document.getElementById('darkOverlay').style.display = 'block';
    document.body.classList.add('transparent');
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to cancel this bill?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        popup: 'my-swal2-popup-confirm_class',        // Add class to the popup
        htmlContainer: 'my-swal2-html-confirm-class'  // Add class to the html container
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with the cancellation if confirmed
        const cancelUrl = `https://ctgshop.com/erp/API/xbill.ashx?type=del_bill&bno=${bno}&bemp=${identity}&batn=${atn}`;

        // Perform the fetch request
        fetch(cancelUrl, { method: 'GET', mode: 'cors' })
          .then(response => response.json())
          .then(data => {
            document.getElementById('darkOverlay').style.display = 'block';
            document.body.classList.add('transparent');

            if (data.status === true) {
              Swal.fire({
                title: 'Success!',
                text: 'Bill cancel successful.',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                  popup: 'my-swal2-popup-class',
                  htmlContainer: 'my-swal2-html-class'
                }
              }).then((result) => {
                if (result.isConfirmed) {
                  all_cards.innerHTML = '';  // Clear the all_cards container
                  processFetchedData(encodedUrl, identity, entry_container_middle, sd, ed);
                }
                // Hide the overlay when alert is closed
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent'); // Remove class to allow scrolling
              });
            } else {
              Swal.fire({
                title: 'Warning!',
                text: 'Bill cancel failed.',
                icon: 'warning',
                confirmButtonText: 'Try again',
                customClass: {
                  popup: 'my-swal2-popup-class',
                  htmlContainer: 'my-swal2-html-class'
                }
              }).then(() => {
                document.getElementById('darkOverlay').style.display = 'none';
                document.body.classList.remove('transparent');
              });
            }
          })
          .catch(error => {
            Swal.fire({
              title: 'Error!',
              text: 'There was an issue with the request.',
              icon: 'error',
              confirmButtonText: 'OK',
              customClass: {
                popup: 'my-swal2-popup-class',
                htmlContainer: 'my-swal2-html-class'
              }
            }).then(() => {
              document.getElementById('darkOverlay').style.display = 'none';
              document.body.classList.remove('transparent');
            });
          });
      }
      // Hide the overlay when alert is closed
      document.getElementById('darkOverlay').style.display = 'none';
      document.body.classList.remove('transparent'); // Remove class to allow scrolling
    });
  }
};

function processFetchedData(encodedUrl, identity, entry_container_middle,sd,ed) {
  fetchData(encodedUrl, { mode: 'no-cors' })
    .then(data => {
      
      // Filter the array based on emp_id
      const filteredData = data.Data.filter(element => element.emp_id === identity);

      if (filteredData.length > 0) {
        // Function to convert date and time to a single Date object
        function parseDateTime(dateString, timeString) {
          const [day, month, year] = dateString.split('/').map(Number);
          const [time, modifier] = timeString.split(' ');
          let [hours, minutes] = time.split(':').map(Number);

          if (modifier === 'PM' && hours !== 12) {
            hours += 12;
          } else if (modifier === 'AM' && hours === 12) {
            hours = 0;
          }

          return new Date(year, month - 1, day, hours, minutes);
        }

        // Sort the array based on the combined Date object
        filteredData.sort((a, b) => parseDateTime(b.bill_date, b.bill_time) - parseDateTime(a.bill_date, a.bill_time));

        const bill_cards = document.createElement('div');
        bill_cards.setAttribute('id', 'all_cards');
        bill_cards.setAttribute('class', 'all_cards');

        filteredData.forEach(element => {
        
          const single_card = document.createElement('div');
          single_card.setAttribute('id', 'single_card');
          single_card.setAttribute('class', 'single_card');

          // Set the color based on the bill status
          let statusColor = element.bill_status === 'CANCELLED' ? 'red' : element.bill_status === 'PENDING' ? 'orange' : 'green';

          const bill_html = `
            <span>
              <img src=${element.comp_logo} alt="img"/>
              <p>${element.bill_type}</p>
            </span>
            <p class="bill_ref">${element.bill_no}</p>
            <p class="bill_date">${element.bill_date}</p>
            <span class="status"><label>Status:</label><p style="background-color: ${statusColor};color:white;padding:3px 8px;border-radius:10px">${element.bill_status}</p></span>
            <span><label>Bill Amount</label><p>${element.bill_amo}</p></span>
            <span><label>Approved Amount</label><p>${element.bill_app_amo}</p></span>
            <p>Submitted By</p>
            <p>${element.emp_name}</p>
            <span id="bill_show_btns" class="bill_show_btns">
              <button onclick='handle_bill_btn("${element.bill_no}","details")'>Entry Details</button>
              <button onclick='handle_bill_btn("${element.bill_no}","supporting")'>Supportings</button>
            </span>
            ${element.bill_status === 'PENDING' ? `<span id="bill_cancel_btn"><button onclick="handle_bill_cancel_btn('${element.bill_no}','${sd}','${ed}','${element.atn}')">CANCEL</button></span>` : ""}
          `;
          single_card.innerHTML = bill_html;
          bill_cards.appendChild(single_card);
        });

        entry_container_middle.appendChild(bill_cards);
      } else {
        document.getElementById('darkOverlay').style.display = 'block';
        document.body.classList.add('transparent');
        Swal.fire({
          text: 'Data not found',
          icon: 'warning',
          confirmButtonText: 'Try Again',
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: "OK",
          customClass: {
            popup: 'my-swal2-popup-class',        // Add class to the popup
            htmlContainer: 'my-swal2-html-class'  // Add class to the html container
          }
        }).then((result) => {
          // Hide the overlay when alert is closed
          document.getElementById('darkOverlay').style.display = 'none';
          document.body.classList.remove('transparent'); // Remove class to allow scrolling
        });
      }

      const bill_entry_button_container = document.getElementById('bill_entry_button_container');
      const bill_entry_button_container_height = bill_entry_button_container.offsetHeight;
      const view_class = document.getElementById('view_class');
      const view_class_height = view_class.offsetHeight;
      const all_cards = document.getElementById('all_cards');
 
      if (all_cards) {
        all_cards.style.paddingTop = `${(bill_entry_button_container_height + view_class_height +document.getElementsByClassName('accounts_Activity_back_btn')[0].offsetHeight + 10)}px`;
      }
    })
    .catch(error => {
      // console.log(error)
    });
}




