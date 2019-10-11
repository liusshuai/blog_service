const nodemailer = require('nodemailer');
const Temp = require('./templet');
const Title = '"刘帅的个人博客"<yigehaoren_gdoer@163.com>';
const ME = '302931504@qq.com';

const transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    secureConnection: true,
    port: 465,
    auth: {
        user: 'yigehaoren_Gdoer@163.com', // 这里改成你自己的邮箱地址
        pass: '******' // 这是代理密码，具体如何生成请百度
    }
});

module.exports = {
    sendIdentifyCode (params) {
        const mailOptions = {
            from: Title,
            to: params.to,
            subject: '邮箱验证',
            html: Temp.sendIdentifyCodeTemp(params)
        };
        transporter.sendMail(mailOptions, function (err) {
            if (err) console.log(err);
        });
    },
    
    newArticleBotice (params) {
        const mailOptions = {
            from: Title,
            to: params.to,
            subject: '新文章提醒',
            html: Temp.newArticleNoticeTemp(params)
        };
        transporter.sendMail(mailOptions, function (err) {
            if (err) console.log(err);
        });
    },

    messReply(params) {
        const mailOptions = {
            from: Title,
            to: params.to,
            subject: '留言回复',
            html: Temp.messReplyTemp(params)
        };
        transporter.sendMail(mailOptions, function (err) {
            if (err) console.log(err);
        });
    },



    /* ****************************************** */
   /*             mail send to me                */
  /* ****************************************** */

    follow(params) {
        const mailOptions = {
            from: Title,
            to: ME,
            subject: '您有新订阅',
            html: Temp.followTemp(params)
        };
        transporter.sendMail(mailOptions, function (err) {
            if (err) console.log(err);
        });
    },

    leaveMess(params) {
        const mailOptions = {
            from: Title,
            to: ME,
            subject: '您有新留言',
            html: Temp.leaveMessTemp(params)
        };
        transporter.sendMail(mailOptions, function (err) {
            if (err) console.log(err);
        });
    },

    commentTweet(params) {
        const mailOptions = {
            from: Title,
            to: ME,
            subject: 'Bibi有新评论',
            html: Temp.commentTweetTemp(params)
        };
        transporter.sendMail(mailOptions, function (err) {
            if (err) console.log(err);
        });
    },

    commentBlog(params) {
        const mailOptions = {
            from: Title,
            to: ME,
            subject: '文章有新评论',
            html: Temp.commentArticleTemp(params)
        };
        transporter.sendMail(mailOptions, function (err) {
            if (err) console.log(err);
        });
    },

    commentSource(params) {
        const mailOptions = {
            from: Title,
            to: ME,
            subject: '资源有新评论',
            html: Temp.commentSourceTemp(params)
        };
        transporter.sendMail(mailOptions, function (err) {
            if (err) console.log(err);
        });
    }
};