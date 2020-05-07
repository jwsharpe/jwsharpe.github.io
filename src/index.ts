const img: any = new Image()
img.src = "https://backend-jwsharpe.herokuapp.com/pageview";
img.style = "position: absolute; left: -100px; right: -100px;"
img.onload = function () { document.appendChild(img); };