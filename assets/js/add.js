const form = document.getElementById("addcustomer");

/**
 * This method adds items into the localStorage when a submit event is triggered on the add form
 */
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // this is an object that holds our form input values
    const data = {
        customerName: document.getElementById('customerName').value,
        customerEmail: document.getElementById("customerEmail").value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        profilePicURL: document.getElementById("profile-pic").value,
    };
    
    // the validate method accepts an object as its argument, in this case the data object
    validateFormFields(data);

    // getting the customer item from our localStorage
    const customers = JSON.parse(localStorage.getItem("customers"));

    // the if statement gets executed if the item exists in our localStorage
    if(customers !== null){
        customers.push(data);
        localStorage.setItem("customers", JSON.stringify(customers));
        form.reset();
        window.location.replace("index.html");
    }else{
       const customerArray = [];
       customerArray.push(data);
       localStorage.setItem("customers", JSON.stringify(customerArray));
       form.reset();
       window.location.replace("index.html");
    }

    //console.log(`${customerName} ${customerEmail} ${gender} ${profilePic}`);
});

function validateFormFields (data){
    const warning = document.querySelector(".warning");
    const warningArray = [];
    let validMailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const urlPattern =
      /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    if(data.customerName === ''){
        warningArray.push('Name field cannot be empty');
    }
    
    if(data.customerEmail === ''){
        warningArray.push("Email Field cannot be empty");
    }

    if (validMailFormat.test(data.customerEmail) === false) {
        warningArray.push("Enter a valid email address");
    }

    if(urlPattern.test(data.profilePicURL) === false){
        warningArray.push("Enter a valid image url");
    }

    if(warningArray.length > 0){
        warning.style.display = 'block';
        warning.innerHTML = warningArray
          .map((singleWarning) => `<li>${singleWarning}</li>`)
          .join("");
    }
    
}