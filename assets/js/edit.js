const editcustomer = document.getElementById("editcustomer");
;
function getCustomerData(){
    const urlArray = location.href.split('=');
    const id = urlArray[1];
    
    customers = JSON.parse(localStorage.getItem('customers'));
    
    if(customers !== null){
       let customer =  customers.find(customer => customer.customerID === id);
        document.getElementById('customerName').value = customer.customerName;
        document.getElementById("customerEmail").value = customer.customerEmail;
        if(customer.gender === 'male'){
            document.getElementById("male").setAttribute("checked", "checked");
        }else{
            document.getElementById("female").setAttribute("checked", "checked");
        }
        
        document.getElementById("profile-pic").value = customer.profilePicURL;
    }
}

editcustomer.addEventListener('submit', function(event){
    event.preventDefault();
    const data = {
        'customerName': document.getElementById('customerName').value,
        'customerEmail': document.getElementById("customerEmail").value,
        'gender': document.querySelector('input[name="gender"]:checked').value,
        'profilePicURL': document.getElementById("profile-pic").value, 
    };

    const warnings = validateFormFields(data);

    if (warnings.length > 0){
        console.table(warnings);
    }else{
        console.table(data);
    }
});


function validateFormFields(data) {
  const warningArray = [];
  let validMailFormat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const urlPattern =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

  if (data.customerName === "") {
    warningArray.push("Name field cannot be empty");
  }

  if (data.customerEmail === "") {
    warningArray.push("Email Field cannot be empty");
  }

  if (validMailFormat.test(data.customerEmail) === false) {
    warningArray.push("Enter a valid email address");
  }

  if (urlPattern.test(data.profilePicURL) === false) {
    warningArray.push("Enter a valid image url");
  }

  return warningArray;
}