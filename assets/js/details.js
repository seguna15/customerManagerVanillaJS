const deleteButton = document.getElementById("delete");

function displayDetails() {
  const profileCard = document.querySelector(".profile-card");
  const url = location.href.split("=");
  const id = url[1];

  
  const customers = JSON.parse(localStorage.getItem("customers"));

  if (customers !== null) {
    let customer = customers.find((customer) => customer.customerID === id);
    deleteButton.setAttribute("data-info", customer.customerID)
    profileCard.innerHTML = ` <div class="profile-image">
                <img src="${customer.profilePicURL}" alt="" class="src">
            </div>
            <div class="profile-text">
                <h2 class="profile-name">${customer.customerName}</h2>
                <h4><i class='bx bxs-envelope'></i> <a href="mailto:${customer.customerEmail}">${customer.customerEmail}</a></h4>
                <h4>Gender: ${customer.gender}</h4>
                
            </div>`;
  }
}

deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    const id = deleteButton.getAttribute('data-info');
  
    const deleteCommand = confirm('Are you sure you want to delete Item');
    
    if(deleteCommand){
        const customers = JSON.parse(localStorage.getItem("customers"));
        const newCustomerArray = customers.filter(customer =>  customer.customerID !== id); 
       
        if(newCustomerArray !== null) {
            localStorage.removeItem(customers);
             localStorage.setItem("customers", JSON.stringify(newCustomerArray));
        }
       
        alert('Customer Deleted');
        window.location.replace('index.html');
    }
});
