
function launch(comment){
    let player, topHeight, commentBlock, textSize, commentSpan;
    let imgAttr = new Object();

    commentSpan = 8000;
    player = $('.html5-video-player.ytp-transparent');
    textSize = player.height()*0.05;
    topHeight = player.offset().top + Math.floor( (player.height()-textSize) * Math.random());

    commentBlock = $('<div id=nicolizeComment></div>');
    commentBlock.html(comment);
    commentBlock.css({
        'cssText': 
        'white-space: nowrap;'+
        `font-size: ${textSize}px !important;`+
        'text-shadow: gray 1px -1px,  gray -1px -1px, gray 1px 1px,  gray -1px 1px;',
        color:'white',
        float: 'right',
        position: 'absolute',
        right: '0%',
        top: topHeight,
        zIndex: '1000000',
        opacity: 0.9,
        background: 'transparent',
        
  
    });
    
    Reflect.set(imgAttr, 'width', textSize);
    Reflect.set(imgAttr, 'height', textSize);
    commentBlock.find('img').attr(imgAttr);
    
    $('body').append(commentBlock);

    commentBlock.animate({ 'right': '125%' }, commentSpan, 'linear',()=>{
        commentBlock.remove();
    });
 
}

let oldComments = new Object();
let newComments = new Object();

window.setInterval(async () => {
    Object.assign(oldComments, newComments);
    //console.log($('.ytp-time-current').text());

    let comments = $('#chatframe').contents().find('#message.style-scope.yt-live-chat-text-message-renderer');
    let names = $('#chatframe').contents().find('#author-name.style-scope.yt-live-chat-author-chip');

    comments.each(
        function (index, element) {
            Reflect.set(newComments, names[index].innerText, $(element).html());
        }
    );

    Object.keys(newComments).forEach(key => {
        if (newComments[key] != oldComments[key]) {
            launch(newComments[key]);
        }
    });
}, 500);
