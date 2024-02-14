var images = document.querySelectorAll('#userImage div');

// Point of user and computer
const userPoint = document.querySelector('#userPoint')
const computerPoint = document.querySelector('#computerPoint')

//images for computer and user
const userImage = document.querySelector('#userImage')
const computerImage = document.querySelector('#computerImage')

// status about win or lose for both
const userStatus = document.querySelector('#userStatus')
const computerStatus = document.querySelector('#computerStatus')
// sounds
const youWinSound = new Audio('./assets/audio/youWin.wav')
const youLoseSound = new Audio('./assets/audio/youLose.wav')
                    // Coding of program     
//points for both
var userPointCurrent = 0;
var computerPointCurrent = 0;

//  0 stands for paper
//  1 stands for scissors
//  2 stands for rock

var imagesArray = ['./assets/images/paper.svg', './assets/images/scissors.svg', './assets/images/rock.svg']
var namesArray = ['Paper', 'Scissors', 'Rock']
var userCurrent;
var computerCurrent;
                    
function getUserDetail(item){

    item.addEventListener('click', function(){
        getComputerDetail();
        //in this if else statements i am trying to identify the image and reflect it on page
        if(item.querySelector('img').getAttribute('src') == "./assets/images/paper.svg"){
            userCurrent = 0;
            userImage.innerHTML = `
                <div id="userPaper">
                    <img src="${imagesArray[userCurrent]}" alt="">
                    <p>
                        ${namesArray[userCurrent]}
                    </p>
                </div>
            `
        }else if(item.querySelector('img').getAttribute('src') == "./assets/images/scissors.svg"){
            userCurrent = 1;
            userImage.innerHTML = `
                <div id="userScissors">
                    <img src="${imagesArray[userCurrent]}" alt="">
                    <p>
                        ${namesArray[userCurrent]}
                    </p>
                </div>
                `
        }else if(item.querySelector('img').getAttribute('src') == "./assets/images/rock.svg"){
            userCurrent = 2;
            userImage.innerHTML = `
                <div id="userRock">
                    <img src="${imagesArray[userCurrent]}" alt="">
                    <p>
                        ${namesArray[userCurrent]}
                    </p>
                </div>
                `
        }

        setTimeout(function(){
            userImage.innerHTML = `
                <!-- Paper Block -->
                <div id="userPaper">
                    <img src="./assets/images/paper.svg" alt="">
                    <p>
                        Paper
                    </p>
                </div>


                <!-- Scissors Block -->
                <div id="userScissor">
                    <img src="./assets/images/scissors.svg" alt="">
                    <p>
                        Scissor
                    </p>
                </div>


                <!-- Rock Block -->
                <div id="userRock">
                    <img src="./assets/images/rock.svg" alt="">
                    <p>
                        Rock
                    </p>
                </div>
            `
            setTimeout(function(){
                images = document.querySelectorAll('#userImage div');
                images.forEach(function(item){
                    getUserDetail(item);      
                })
            },1)

        },1000)
        //when we click we are getting result for 1 second then we again getting the options


        compare(); // each time we click we need to compare function
        endGame();  // here we are checking if the game ends
    })
}

// In this function we will get the random from computer
function getComputerDetail(){
    computerCurrent = Math.floor(Math.random() * 3)
    computerImage.innerHTML = `
        <div id="computerImage">
            <img src="${imagesArray[computerCurrent]}" alt="">
            <p>
                ${namesArray[computerCurrent]}
            </p>
        </div>
    `
}

function compare(){
    // compare who wins the turn
    if(computerCurrent == userCurrent){
        userStatus.innerHTML = `Draft`
        computerStatus.innerHTML = `Draft`
    }else if(computerCurrent == 0 && userCurrent == 1){
        userStatus.innerHTML = `Won`
        computerStatus.innerHTML = `Lose`
    }
    else if(computerCurrent == 0 && userCurrent == 2){
        userStatus.innerHTML = `Lose`
        computerStatus.innerHTML = `Won`
    }else if(computerCurrent == 1 && userCurrent == 0){
        userStatus.innerHTML = `Lose`
        computerStatus.innerHTML = `Won`
    }else if(computerCurrent == 1 && userCurrent == 2){
        userStatus.innerHTML = `Won`
        computerStatus.innerHTML = `Lose`
    }else if(computerCurrent == 2 && userCurrent == 0){
        userStatus.innerHTML = `Won`
        computerStatus.innerHTML = `Lose`
    }else if(computerCurrent == 2 && userCurrent == 1){
        userStatus.innerHTML = `Lose`
        computerStatus.innerHTML = `Won`
    }

    // Her i am changing the color of Won Lose text
    if(userStatus.innerHTML == "Lose"){
        userStatus.style.color = "red"
        computerStatus.style.color = "green"
        computerPointCurrent++;
        youLoseSound.play()

        computerPoint.innerHTML = `
            Points: ${computerPointCurrent}
        `
        
    }else if(userStatus.innerHTML == "Won"){
        userStatus.style.color = "green"
        youWinSound.play()
        computerStatus.style.color = "red"
        userPointCurrent++;

        userPoint.innerHTML = `
            Points: ${userPointCurrent}
        `
    }else{
        userStatus.style.color = "green"
        computerStatus.style.color = "green"
    }

}

// If one of scores is 3 game will refresh
function endGame(){
    setTimeout(function(){
        if(userPointCurrent == 3 || computerPointCurrent == 3){
            if(userPointCurrent == 3){
                alert("User Won")
            }else if(computerPointCurrent == 3){
                alert('Computer Won')
            }
    
    
            userPointCurrent = 0;
            computerPointCurrent = 0;
            userPoint.innerHTML = `
                Points: ${userPointCurrent}
            `
            computerPoint.innerHTML = `
                Points: ${computerPointCurrent}
            `
        }
    }, 500)
    
}


// on load of page function will start
window.onload = function(){  
    images.forEach(function(item){
        getUserDetail(item);      
    })
}