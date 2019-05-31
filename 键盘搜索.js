//https://github.com/shellingfordly/jsbox
$keyboard.barHidden = true;
let URL = "http://www.baidu.com/s?wd="
$delay(0.1, () => {
    if ($keyboard.hasText) {
        $keyboard.getAllText( (text)=> {
            console.info(text)
            search(text)
        })
    } else {
        let text = $clipboard.text
        if(text){
            search(text)
        } else {
            $keyboard.next();
            $ui.alert("无内容")
        }
    }
  })
function search(text){

    $safari.open({
        url: URL + encodeURIComponent(text),
        entersReader: true,
        height: 400,
        handler: function() {
            let t = setInterval(() => {
                if ($keyboard.hasText) $keyboard.delete()
                else clearInterval(t)
              }, 10);
            $keyboard.next();
        }
      })
}
