if (localStorage.getItem('cookieSeen') != 'shown') {
    // document.getElementById('bodySection').style.display = 'none'
    // await darthFader('cookie-banner')
    // document.querySelector('#close').addEventListener('click', (async function() {
    //     await darthFader('cookie-banner', 'out')
    //     .then( await darthFader('bodySection'))

    //     localStorage.setItem('cookieSeen','shown')
    //     window.location.reload()
    //   }))
    setDarth()
    // .then(
    //     darthClickClose()
    //     )
  };

  document.querySelector('#revokeCookiePerms').addEventListener('click', (async function() {
    await darthFader('cookie-banner')
    await darthFader('bodySection', 'out')
   
    localStorage.removeItem('cookieSeen','shown')
    window.location.reload()
  }))
  
  async function setDarth() {
    document.getElementById('bodySection').style.display = 'none'
    await darthFader('cookie-banner')
  }
  async function darthClickClose() {
    // document.querySelector('#close').addEventListener('click', (async function() {
        await darthFader('cookie-banner', 'out')
        .then( await darthFader('bodySection'))
        localStorage.setItem('cookieSeen','shown')
        window.location.reload()
    //   })
    //   )
  }
  
  async function darthFader(target, out) {
    const element = document.getElementById(target);
    let op;
    let timer;

    if (out) {
        op = 1;
        timer = setInterval( fadeOut, 30 )
    } else {
        op = 0.1;
        timer = setInterval( fadeIn, 50 )
    }

    async function fadeOut() {
        if (!element) { return }
        if ( op <= 0.1 ) {
            clearInterval( timer );
            element.style.display = "none";
        }
        element.style.opacity = op;
        op -= op * 0.1;
    }

    async function fadeIn() {
        if (!element) { return }
        element.style.display = "block";
        if ( op >= 0.95 ) {
            clearInterval( timer );
        }
        element.style.opacity = op;
        op += op * 0.1;
    }
}
function acceptFunction(){
    document.myform.accept.value  = "Accepted";
}
function rejectFunction(){
    document.myform.accept.value  = "Rejected";
}