function counterProduct() {
  let countdown = 1;

  let timer = setInterval(function () {
    countdown--;
    if (countdown === 0) {
      clearInterval(timer);
      window.location.href = "./products"
    }
  }, 1000);
}