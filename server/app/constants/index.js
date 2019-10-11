const CONSTANTS = {
    SUCCESS_CODE: 200,   // 请求成功切有数据返回
    SUCCESS_MSG: 'success',

    FAILD_CODE: 500,  //  请求失败
    FAILD_MSG: 'faild',


    NODATA_CODE: 201,  // 请求成功但无数据返回
    NO_LOGIN_CODE: 301, //未登录或登录失效重定向

    /* 用户接口返回字段 start */
    PASSWORD_ERROR: '密码错误',
    PASSWORD_LENGTH_ERROR: '密码必须大于等于6位',
    NO_ACCOUNT: '账号不存在',
    NO_LOGIN: '请先登录',
    ACCOUNT_EXIST: '该邮箱已注册',
    NAME_EXIST: '该昵称已被占用',
    NO_PERMISSION: '你没有权限',
    ERROR_CODE: '验证码失效或错误',
    /* 用户接口返回字段 end */


    /* 频道接口返回字段 start */
    NO_CHANNEL: '暂无频道',
    CHANNEL_DELETE_ERROR: '删除失败，请先删除频道下的文章',
    CHANNEL_NOT_EXITS: '频道不存在',
    /* 频道接口返回字段 end */


    /* 文章接口返回字段 start */
    ARTICLE_LIMIT: 5, // 文章每一页的限定数
    NO_ARTICLE: '暂无文章',
    ARTICLE_NOT_EXITS: '文章不存在',
    NO_SEARCH: '搜索内容为空',
    /* 文章接口返回字段 end */


    /* 推特接口返回字段 start */
    TWEET_LIMIT: 10, // 推特每一页的限定数
    NO_TWEET: '暂无推文',
    TWEET_NOT_EXITS: '推文不存在',
    /* 推特接口返回字段 end */


    /* 留言板接口返回字段 start */
    BOARDS_LIMIT: 10, // 留言板每一页的限定数
    CHILD_BOARDS_LIMIT: 5, // 子留言的限定
    NO_EMAIL: '请输入邮箱',
    NO_NAME: '游客',
    NO_CONTENT: '请输入内容',
    NO_COMMENT: '评论不存在',
    NO_BOARDS: '暂无留言',
    NO_BOARD: '留言不存在',
    /* 留言板接口返回字段 end */


    /* 关注接口返回字段 start */
    NO_USER: '关注列表为空',
    FOLLOWER_LIMIT: 20,
    NO_FOLLOW: '你没有关注他',
    /* 关注接口返回字段 end */


    /* 帖子接口返回字段 start */
    FORUM_LIMIT: 10,
    /* 帖子接口返回字段 end */


    /* 画册接口返回字段 start */
    ALBUM_LIMIT: 20,
    ALBUM_NOT_EXITS: '画册不存在',
    /* 画册接口返回字段 end */


    ADMIN: '302931504@qq.com'
}

module.exports = CONSTANTS;