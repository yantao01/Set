$(function() {
    var form = layui.form;
    var layer = layui.layer;


    // 设置自定义验证规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        samepwd: function(value) {
            if(value === $('[name=oldpwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        repwd: function(value) {
            if(value !== $('[name=newpwd]').val()) {
                return '两次新密码不一致'
            }
        }
    })

    // 监听表单的提交事件
    $('.layui-form').on('click',function(e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.mag('更新密码失败')
                }
                layer.msg('更新密码成功')

                // 重置表单
                $('.layui-form')[0].reset();
            }

        })
    })
})