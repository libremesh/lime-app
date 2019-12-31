export default function makeid(length) {
  var text = ""
  var possible = "qwertyupasdfghjklzxvbnm23456789"
  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}
