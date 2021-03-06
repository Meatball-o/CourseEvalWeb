$(document).ready(function(){



    $("#signup").on("click", function(e){
        e.preventDefault();
        handleSignup(document.getElementById("s-user").value,document.getElementById("s-pass").value/*,document.getElementById("s-email")*/);
    });

    $("#login").on("click", function(e){
        e.preventDefault();
        handleLogin(document.getElementById("l-user").value,document.getElementById("l-pass").value);       
        
    });


});


async function handleSignup(user,password){
    console.log(user);
    console.log(password);
    console.log(document.cookie);
    try {
        const makeUser = await axios({            
            method: 'post',
            url: 'http://localhost:3010/account',
            timeout: 2000,
            data:{
                _id: user,
                pass: password
            }
        });
        if (makeUser.status == 200) {
            alert("success, please login:)");
        }
    } catch (err) {
        alert("account already exist, change a new one")
        return;
    }
    
}


async function handleLogin(user,pass){
        const loginUser = await axios({
            method: 'get',
            url: `http://localhost:3010/account/${user}`
        });
        if (loginUser.data == null) {
            alert("no username exists or incorrect password, please check again");
            return;
        }
        if (loginUser.status == 200) {
            if (loginUser.data.pass == pass) {
                document.cookie = user;
                alert("login success");
                window.location.href = "./index.html"
                return;
            } else {
                alert("no username exists or incorrect password, please check again");
                return;
            }
        }

}