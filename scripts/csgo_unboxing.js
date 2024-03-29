var img = {
  blue: '<img src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhhwszYI2gS09-5mpSEguXLPr7Vn35c18lwmO7Eu9TwjVbs8xVqZm_3J4TGcVU3YFCE-Ae5weq81JXovJXLyiRjvyFw4nfD30vgN-NX6nY/360fx360f"/>',
  purple: '<img src="http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTjlH7du6kb-FlvD1DLfYkWNF18lwmO7Eu46h2QS1r0tvZjvyLI-RIwI6aV7X_ADrwevmhZO0up_AwSM1uHNw5nzD30vgQ0tV-jw/360fx360f"/>',
  pink: '<img src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTjlH_9mkgIWKkPvxDLDEm2JS4Mp1mOjG-oLKhF2zowcDPzixc9OLcw82ZlyF8wC8wb251MW4tcifmydi7CEn4HiPlhyy1BxJbeNshqPIHELeWfJvK5CfiA/360fx360f"/>',
  red: '<img src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5gZKKkPLLMrfFqWZU7Mxkh9bN9J7yjRrhrUFuazjzJteVJlQ6NVHTrFe3wObs15G06picwHFnvid25C3bnhSzn1gSOQz0szG-/360fx360f"/>',
  yellow: '<img src="http://vignette4.wikia.nocookie.net/cswikia/images/a/ad/Csgo-default_rare_item.png/revision/latest?cb=20150227163025"/>'
}

function reset(){
  $('.card').remove();
  for (var i = 0; i < 210; i++){
    var element = '<div class="card" style="background-color: lightblue;" data-rarity="blue" id=itemNumber'+i+'>'+img.blue+'</div>';
    var rand = random(1,10000)/100;
    if (rand < 20){
      element = '<div class="card" style="background-color: purple;" data-rarity="purple" id=itemNumber'+i+'>'+img.purple+'</div>';
    }
    if (rand < 5){
      element = '<div class="card" style="background-color: hotpink;" data-rarity="pink" id=itemNumber'+i+'>'+img.pink+'</div>';
    }
    if (rand < 2){
      element = '<div class="card" style="background-color: red;" data-rarity="red" id=itemNumber'+i+'>'+img.red+'</div>';
    }
    if (rand < 0.5){
      element = '<div class="card" style="background-color: yellow;" data-rarity="yellow" id=itemNumber'+i+'>'+img.yellow+'</div>';
    }

    $('#cardList').append(element);
  }
  $('.card').first().css('margin-left',-1000);
}

function openCase(){
  reset();
  var rand = random(1000,20000);
  var childNumber = Math.floor(rand/100)+4;
  //var timings = ["easeInOutBack","easeOutExpo","easeInOutBounce","easeOutQuad","swing","easeOutElastic","easeInOutElastic"];
  var timings = ["easeOutExpo"];
  var timing = timings[random(0,timings.length)];
  var reward = $('#itemNumber'+childNumber).attr('data-rarity');
  
  $('.card').first().animate({
    marginLeft: -rand
  }, 5000, timing, function(){
    
    var src = $('#itemNumber'+childNumber+' img').attr('src');
    $('#itemNumber'+childNumber).css({background: "linear-gradient(#00bf09, #246b27)"});
    
    $('#dialog-msg').html("You have received "+reward+" item!"+"<br><img src="+src+">");
    
    $('#dialog').dialog({
      modal: true,
      title: "New item!",
      resizeable: false,
      draggable: false,
      width: 400,
      buttons: {
        "Receive item":function(){
          $(this).dialog("close");
          // add resources
        }
      }
    });
  });
  
  
  //$('.card').css({backgroundColor: 'red'})
  //$('.card:nth-child('+(childNumber+1)+')').css({backgroundColor: 'green'})
}

function random(min, max){
  return Math.floor((Math.random()*(max - min))+min);
}