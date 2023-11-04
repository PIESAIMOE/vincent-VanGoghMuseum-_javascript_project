window.addEventListener("load",()=>{
    if(!localStorage.getItem('userinfo')){
        window.location.href="login.html";
    }
  });
  
const title = document.getElementById('itemName');
const url = document.getElementById('image');
const price = document.getElementById('price');
const description = document.getElementById('itemDescription');

const uptitle = document.getElementById('upName');
const upurl = document.getElementById('upImg');
const upprice = document.getElementById('upPrice');
const updescription = document.getElementById('upDescription');



const addform = document.querySelector(".addItemForm");
const upform = document.querySelector(".updateItem");



// ! POST DATA
const handlerSubmit = async () => {

    const postId =  ''+ new Date().getTime();
    const newItem = {
    id:postId,
    url:url.value,
    title:title.value,
    price:price.value,
    description:description.value

    };
    try{
        const res = await fetch('http://localhost:3000/items',{

        method: 'POST',
        headers: {

            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)

        });
        const data = await res.json();
        
        if(!res.ok){
             console.log(data);
             return;
        }
        console.log("post data",data);

    }catch(error){

        console.log(error);
    }
}   

addform.addEventListener('submit',handlerSubmit);  



// !  GET DATA
const getData = async () =>{

    const response = await fetch('http://localhost:3000/items');

    const data = await response.json();

    data.map((item) => {
        
        display(item);
    })
   
   }
   
getData();


// ! DISPLAY ITEMS

function display(item){

    let display = document.createElement("div");
    let output = document.getElementById("products");
    display.innerHTML += `
    <div class="product">
        <div class="img">
        <img src="${item.url}" alt="${item.title}">
        </div>
        <p class="title">${item.title}</p>
        <p class="description">${item.description}</p>
        <p class="price">
        <span>${item.price}</span>
        <span>€</span>
        </p>
        </div>     
        `;
    const dele_btn = document.createElement('button');
    dele_btn.innerText="Delete";
    dele_btn.onclick = removeItem;
    dele_btn.id = item.id;
    display.appendChild(dele_btn);

    const edit_btn = document.createElement('button');
    edit_btn.innerText="Edit";
    edit_btn.onclick = edit;
    edit_btn.id = item.id;
    display.appendChild(edit_btn);
 
    output.prepend(display); 

    console.log("edit_btn.id",edit_btn.id);
    console.log("dele_btn.id",dele_btn.id);
}


// ! DELETE ITEM
const removeItem = async (event ) => {
    console.log("event.target",event.target);
    const dele_btn = event.target; 
    const deleId =  dele_btn.id;   
    const res= await fetch(`http://localhost:3000/items/${deleId}`, {
        
        method: 'DELETE', 
    });      
    const data = await response.json( );
    if(!res.ok){
        console.log("delete successful");
        return;
    }
    console.log(data);
};

 // ! UPDATE ITEM

    function edit(e){

      
        document.getElementById("updateItem").style.display = "block";
        document.getElementById("addItem").style.display = "none";
        const edit_btn = e.target; 
        const editID =  edit_btn.id;     
        console.log("editID",editID); 

        upform.addEventListener('submit',() =>{

            const upItem = {
            id:editID,
            url:upurl.value,
            title:uptitle.value,
            price:upprice.value,
            description:updescription.value
            };
            console.log("newItem",upItem)
       
            fetch(`http://localhost:3000/items/${editID}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(upItem)
             })
                .then(response => {
                    console.log("newItem",newItem)
                    return response.json( )
            })
             .then(data => 
            console.log("data",data) 
            );   
        }) 
    }      
        