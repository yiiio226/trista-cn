function OnKeyPressHandle(e, modalId, index) {
  if (e && 13 == e.keyCode) {
    const pwd = $("." + modalId + " input").val()
    console.log(pwd + "" + pwd.length)
    const secret = pwd.substring(pwd.length - 3, pwd.length)
    const decrypted = CryptoJS.AES.decrypt(
      "U2FsdGVkX1/2OGZhup1GdSsFtUAuaBI8Pe9zhtujaLw=",
      secret
    )

    console.log(3 < pwd.length)
    3 < pwd.length &&
      decrypted.toString(CryptoJS.enc.Utf8) ===
        pwd.substring(0, pwd.length - 3) &&
      ReadProgressButton("work-modal-" + index)
    setTimeout(function() {
      $("." + modalId + " input").hide()
      $("body").hasClass("bg-black")
        ? $("." + modalId + " .lockIcon.img-dark").show()
        : $("." + modalId + " .lockIcon.img-light").show()
    }, 1e4)
  }
}
