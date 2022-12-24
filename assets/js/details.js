function displayDetails(){
    const profileCard = document.querySelector('.profile-card');
    const url = location.href.split('=');
    const id = url[1];

    const customers = JSON.parse(localStorage.getItem('customers'));

    if(customers !== null){
         let customer = customers.find(customer => customer.customerID === id );
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