$(function(){
  function addUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>
    `;
    $("#user-search-result").append(html);
  }
  function addNoUser(){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>`;
    $("#user-search-result").append(html);
  }
  
  function addDeleteUser(name, id){
    var html = `<div class="chat-group-user clearfix js-chat-member" id="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`;
     $(".js-add-user").append(html);
  }
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }










  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !==0){
          users.forEach(function(user){
            addUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function(){
        alert("ユーザー検索に失敗しました");
      });
  });
  $(".chat-group-form").on("click", ".chat-group-user__btn--add", function(){
    // console.log("OK");
    var userId = $(this).attr("data-user-id");
    var userName = $(this).attr("data-user-name");
    // 一覧から消すためにクリックされたid nameを取得し変数に入れる
    // 変数に入れるのはあとから”チャットメンバー”に追加するためか？
    $(this)
      .parent()
      // thisの親要素を取得してそこから要素を削除する
      .remove();
      // すべての要素を削除している thisに対して
    addDeleteUser(userName, userId);
    // チャットメンバーに追加するための関数
    addMember(userId)
    // これ、、、何？
  });
  $(document).on("click", ".js-remove-btn", function(){
    $(this)
      .parent()
      .remove();
  });

});