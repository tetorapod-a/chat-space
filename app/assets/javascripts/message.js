$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html = 
      `<div class="chat-main__messages__message">
        <div class="chat-main__messages__message-info">
          <p class="sender">
            ${message.user_name}
          </p>
          <p class="date">
            ${message.created_at}
          </p>
        </div>
        <div class="chat-main__messages__message-text">
          <p class="lower-message__content">
            ${message.content}
          </p>
          <img class="lower-message__image" src=${message.image} >
        </div>
      </div>`
      return html;
    } else {
      var html = 
        `<div class="chat-main__messages__message">
          <div class="chat-main__messages__message-info">
            <p class="sender">
              ${message.user_name}
            </p>
            <p class="date">
              ${message.created_at}
            </p>
          </div>
          <div class="chat-main__messages__message-text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
         </div>`
      return html;
    };
}


  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.chat-main__messages').append(html);
       $('form')[0].reset();
       $('.chat-main__messages').animate({scrollTop: $('.chat-main__messages')[0].scrollHeight});
     })
     .fail(function(){
       alert("メッセージ送信に失敗しました。")
     })
     .always(function(){
       $('.submit-btn').removeAttr("disabled");
     })
  });
});