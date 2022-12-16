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
        
        document.getElementById("profile-pic").value = customer.profilePicURL
    }
}