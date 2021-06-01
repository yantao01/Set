$(function() {
    // 点击去注册账号的链接
    $('#link-register').on('click',function() {
        $('.login-box').hide();
        $('.register-box').show();
    })
    // 点击去登录的链接
    $('#link-login').on('click',function() {
        $('.login-box').show();
        $('.register-box').hide();
       
    })

    //从layui中获取form对象
    var form = layui.form;

    //从layui中获取layer
    var layer = layui.layer;

    //通过form.verify()函数自定义校验规则
    form.verify({
        //自定义了一个叫做pwd的校验规则
        pwd: [/^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'],

        // 校验两次密码是否一致
        repwd: function(value) {
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //如果判断失败，则return一个提示消息即可
            var pwd = $('.register-box [name=password]').val();
            if(pwd != value) {
             return '两次密码不一致'
            }
        }
        
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit',function(e) {
        //阻止表单的默认提交行为
        e.preventDefault();

        //使用ajax post请求服务器数据
       
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/reguser',
            data: {username: $('#form_reg [name=username]').val(),password: $('#form_reg [name=password]').val()},
            success: function(res) {
                // console.log(res);
                if(res.status !== 0) {
                    return layer.msg('msg.message');
                } 
                console.log(layer.msg('注册成功！请登录'));

                //模拟人的点击行为
                $('#link-login').click();
            }
        })
    })
    
    //监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status != 0) {
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功！');

                //将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token',res.token)
                // console.log(res.token);

                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})