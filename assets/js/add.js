const form = document.getElementById("addcustomer");

/**
 * This method adds items into the localStorage when a submit event is triggered on the add form
 */
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const warning = document.querySelector(".warning");
    // this is an object that holds our form input values
    const data = {
        customerID: crypto.randomUUID(),
        customerName: document.getElementById('customerName').value,
        customerEmail: document.getElementById("customerEmail").value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        profilePicURL: document.getElementById("profile-pic").value,
    };
    
    const warningList = validateFormFields(data);
    // the validate method accepts an object as its argument, in this case the data object
    if(warningList.length > 0){
        warning.style.display = "block";
        warning.innerHTML = warningList
            .map((singleWarning) => `<li>${singleWarning}</li>`)
            .join("");
        
    } else{
        // getting the customer item from our localStorage
        const customers = JSON.parse(localStorage.getItem("customers"));

        // the if statement gets executed if the item exists in our localStorage
        if (customers !== null) {
        customers.push(data);
        localStorage.setItem("customers", JSON.stringify(customers));
        form.reset();
        window.location.replace("index.html");
        } else {
        const customerArray = [];
        customerArray.push(data);
        localStorage.setItem("customers", JSON.stringify(customerArray));
        form.reset();
        window.location.replace("index.html");
        }
    }

    
    //console.log(`${customerName} ${customerEmail} ${gender} ${profilePic}`);
});

function validateFormFields (data){
  const warningArray = [];
  let validMailFormat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let urlPattern =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

  // getting the customer item from our localStorage
  const customers = JSON.parse(localStorage.getItem("customers"));

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

  if(customers !== null){
    customers.filter((customer) => {
      if (customer.customerEmail === data.customerEmail) {
        warningArray.push("Email already exists");
      }
      if (customer.profilePicURL === data.profilePicURL) {
        warningArray.push("Profile picture already exits");
      }
    });
  }
 

  return warningArray;
}