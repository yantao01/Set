$(function() {
    // 调用getuserinfo获取用户的基本信息
    getuserinfo();


    var layer = layui.layer;
    
    // 点击按钮，实现退出功能
    $('#btn-logout').on('click',function() {
        // 提示用户是否退出
        layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清楚本地存储中的token
            localStorage.removeItem('token');
            // 点击确定跳转至login页面
            location.href = '/login.html'

            // 关闭confirm 询问框
            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getuserinfo() {
    $.ajax({
        method: 'GET',
        url: 'http://api-breakingnews-web.itheima.net/my/userinfo',
        // headers: {
        //     // 请求头配置对象headers
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if(res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }

            // 调用renderAvatar渲染用户的头像
            renderAvatar(res.data) 

        }
        
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username;
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    // 按需渲染用户的头像 
    if(user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    }   else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}
