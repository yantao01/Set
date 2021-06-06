$(function() {
    var layer = layui.layer;
    var form = layui.form;

    initCate();
    // 初始化富文本编辑器
    initEditor();

    // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: 'http://api-breakingnews-web.itheima.net/my/article/cates',
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('初始化文章分类失败')
                }
                // 调用模板引擎，渲染分类的下拉菜单
                var htmlstr = template('temp-cate', res)
                $('[name=cate_id]').html(htmlstr)
                // 调用form.render（）方法
                form.render()
            }
        })
    }
})