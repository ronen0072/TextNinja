unirest.get("https://wordsapiv1.p.mashape.com/words/finish/syllables")
.header("X-Mashape-Key", "nx00f13nfWmshOLjQ67Z1NUKHKGup1YAgKZjsntcXspcZYWgQq")
.header("X-Mashape-Host", "wordsapiv1.p.mashape.com")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
