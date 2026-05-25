document.addEventListener('touchstart', function(e) {
  if (e.touches[0].pageX < 30) {
    e.preventDefault();
  }
}, { passive: false });
