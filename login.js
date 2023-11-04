window.addEventListener("load",()=>{
    if(localStorage.getItem('userinfo')) {
        window.location.href="home.html";
    }
    const signin = document.getElementById("login_form");
    const signupForm = document.getElementById("signup_form");

    singUp();
    signIn();

    function singUp(){

        signupForm.addEventListener("submit",  (e) => {
    
            e.preventDefault();
            const newname = document.getElementById("new-username").value;
            const newpass = document.getElementById("new-pass").value;
    
     
            console.log("name:",newname); 
            console.log(("pass:",newpass)); 
    
    
            var data = {
                username:newname ,
                password:newpass
               
            }
            document.getElementById("mess1").innerText="Sign UP Successful";
            document.getElementById("mess1").style.display="block";
    
            console.log(JSON.stringify(data));
            localStorage.setItem("userinfo",JSON.stringify(data));
            
        });
    }
    

    function signIn(){
        
        signin.addEventListener("submit",  (e) => {
    
            e.preventDefault();
    
            const username = document.getElementById("signin-username").value;
            const password = document.getElementById("signin-password").value;
           
            console.log(("username",username)); 
          
            console.log(("password",password)); 
            var userdata = {
                username:username ,
                password:password
            }   
            var userinfo = JSON.parse(localStorage.getItem("userinfo"));
    
            console.log("userinfo:",userinfo);
            console.log("userinfo:",userinfo.username);
            if(userdata.username === userinfo.username && userdata.password === userinfo.password){
                window.location.href = "home.html";
            }else{
                
                document.getElementById("mess").innerText="*Email or Password is worng*";
                document.getElementById("mess").style.display="block";
            }
        });
    }
    return true;
});
    // !  GET DATA
    const getData = async () => {

        const response = await fetch('http://localhost:3000/items');
    
        const data = await response.json();

        const limit = data.slice(-9);
         limit.map((item) => {           
             display(item);
             console.log(item)
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
            output.prepend(display); 
    }