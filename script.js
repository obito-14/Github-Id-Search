const url="https://api.github.com/users";
const searchInputEl=document.getElementById("inputId")
const searchBtnEl=document.getElementById("searchBtn")
const profileContainerEl=document.getElementById("profileContainer")
const loadingEl=document.getElementById("loding")

const generateProfile=(profile)=>{
    console.log({url})
    return(
       `
       <div class="profile-box">
       <div class="top-section">
           <div class="left">
               <div class="avatar">
                   <img src=${profile.avatar_url} alt="avatar"/>
               </div>
               <div class="self">
                   <h1>${profile.name}</h1>
                   <h1>${profile.login}</h1>
               </div>
           </div>
           <a href="${profile.html_url}"target="blank"><button class="primary-btn" id="search1-btn">Check Now</button></a>
       </div>
       <div class="about">
           <h2>About</h2>
           <p>${profile.bio}</p>
       </div>
       <div class="status">
           <div class="status-items">
               <h3>Followers</h3>
               <p>${profile.followers}</p>
           </div>
           <div class="status-items">
               <h3>Followings</h3>
               <p>${profile.following}</p>
           </div>
           <div class="status-items">
               <h3>Repos</h3>
               <p>${profile.public_repos}</p>
           </div>
       </div>
   </div>`
    )
}
const fetchProfile = async () =>{
    const username = searchInputEl.value;
    loadingEl.innerText="loading.......";
    loadingEl.style.color="black"
    try{
        const res = await fetch(`${url}/${username}`)
        const data = await res.json();
        if(data.bio){
            loadingEl.innerText="";
            profileContainerEl.innerHTML =generateProfile(data)
        }else{
            loadingEl.innerText=data.message;
            loadingEl.style.color="red"
            profileContainerEl.innerText="";
        }
        console.log("data",data);
    }catch(error){
        console.log({error})
        loadingEl.innerText="";
    }
}
searchBtnEl.addEventListener("click",fetchProfile);
