function fetchAllData(){
    const customerList = document.querySelector(".customer-list");

    const customers = JSON.parse(localStorage.getItem('customers'));
    
    if(customers !== null){
        customers.map((customer) => {
          customerList.innerHTML += `<li class="customer-list-item">
                <div class="profile-text">
                    <a href="details.html?cid=${customer.customerID}" class="customer-link">${customer.customerName}</a>
                    <div class="action-group">
                        <a href="edit-customer.html?cid=${customer.customerID}" class="btn btn-edit"> <i class='bx bxs-edit'></i></a>
                        <a href="" class="btn btn-delete"><i class='bx bx-folder-minus'></i></a>
                    </div>
                </div>
                <div class="profile-image">
                    <img src="${customer.profilePicURL}" alt="" height="50" width="50">
                </div>  
            </li>`;
        });
    }else{
        customerList.innerHTML = `<li>No records found</li>`;
    }
     
}



