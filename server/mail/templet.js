const moment = require('moment');
const url = 'http://www.lsshuai.com';
const Head = `
    <h1 style="font-size: 20px;padding: 16px 20px;background-color: #24292c;font-family: Microsoft Yahei, Helvetica, sans-serif; font-weight: normal;">
        <a target="_blank" href="${url}" title="Blossom" style="color: #fff; text-decoration:none;">刘帅的个人博客</a>
    </h1>
`;
const Footer = `
    <div style="padding: 0 30px;">
        <p style="font-size: 13px; color: #555;">邮件发送时间: ${moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}</p>
        <div style="font-size: 14px;">
            <p style="line-height: 30px; color: red; margin-top: 10px; padding-top: 20px; border-top: 1px solid #ddd;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p>
        </div>
    </div>
`;

const mailSendTime = `<p style="font-size: 13px;color: #aaa;border-bottom: 1px solid #eee;padding-bottom: 20px;">邮件发送时间: ${moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}</p>`;

module.exports = {
    sendIdentifyCodeTemp (params) {
        const Body = `
            <p style="padding: 20px 30px; font-size: 16px; color: #333;">[验证码]
                <span style="color: #537fd8; margin-left: 5px;font-size: 20px;">${params.code}</span>
            </p>
        `;
        return Head + Body + Footer;
    },
    newArticleNoticeTemp (params) {
        const Body = `
            <div style="padding: 0 30px;">
                <p><span>[新文章]</span><a href="${url}/article/${params.id}" target="_blank" style="color: #537fd8;margin-left: 4px;">${params.title}</a></p>
                <p style="font-size: 13px;color: #aaa;border-bottom: 1px solid #eee;padding-bottom: 20px;">邮件发送时间: ${moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}</p>
                <div style="font-size: 15px;">
                    <p>${params.username}，您好：</p>
                    <p>我于 <span style="color: #aaa;">${moment(params.pubTime).format('YYYY-MM-DD HH:mm:ss')}</span> 发布了新文章<a href="${url}/article/${params.id}" target="_blank" style="color: #537fd8;margin-left: 4px;">《${params.title}》</a></p>
                    <p style="padding: 20px 16px;line-height: 24px;background-color:#eee;border:1px solid #ccc;">
                        ${params.desc}
                    </p>
                    <p>文章分类：${params.classify}</p>
                    <p>标签：${params.tag}</p>
                    <p>您可以点击<a href="${url}/article/${params.id}" target="_blank" style="color: #537fd8;margin: 0 4px;">[查看详情]</a>查看文章的完整内容</p>
                    <p>感谢您关注<a href="${url}" target="_blank" style="color: #537fd8;margin: 0 4px;">刘帅的个人博客</a>，若有疑问请在博客留言，我会及时回复</p>
                    <p style="color: red;margin-top: 30px;">(该邮件由系统自动发送，请勿直接回复此邮箱)</p>
                </div>
            </div>
        `; 

        return Head + Body;
    },
    messReplyTemp(params) {
        const Body = `
            <div style="padding: 0 30px;">
                <p><span>[你有新回复]</span></p>
                ${mailSendTime}
                <div style="font-size: 15px;">
                    <p>${params.replyname}，您好！</p>
                    <p>${params.username} 于 ${params.pubtime} 回复了您的留言：<span style="font-size: 13px;font-weight: bold;">${params.replycontent}</span></p>
                    <pre style="padding: 15px 20px; border: 1px dotted #ccc;font-family: Microsoft Yahei, Helvetica, sans-serif; margin: 20px 0;">
                        <span style="font-size: 20px;">“ </span>${params.content}<span style="font-size: 20px;"> ”</span>
                    </pre>
                    <p>您可以点击<a href="${url}/${params.target}" target="_blank" style="color: #537fd8;margin: 0 4px;">[查看详情]</a>查看完整内容</p>
                    <p>感谢您关注<a href="${url}" target="_blank" style="color: #537fd8;margin: 0 4px;">刘帅的个人博客</a>，若有疑问请在博客留言，我会及时回复</p>
                    <p style="color: red;margin-top: 30px;">(该邮件由系统自动发送，请勿直接回复此邮箱)</p>
                </div>
            </div>
        `;

        return Head + Body;
    },




    followTemp(params) {
        const Body = `
            <div class="mainBox" style="padding: 0 30px;">
                <p class="mailTitle" style="font-size: 16px; color: #333;">[您有新订阅] “${params.username}” 关注你了，<a href="${url}/admin/"
                    style="color: #537fd8; margin-left: 5px; text-decoration:none;" target="_blank">点击查看详情。</a></p>
                ${mailSendTime}
                <div style="background: #eee;padding: 20px 15px;font-size: 14px;color: #537fd8;line-height: 25px;">
                    昵称：<span style="font-weight: bold;">${params.username}</span><br/>
                    email：<span style="font-weight: bold;">${params.email}</span>
                </div>
                <p>总订阅数：<em style="font-size: 20px;">${params.followCount}</em></p>
                <div class="content" style="font-size: 14px; margin-top: 20px;">
                    <p style="line-height: 30px; color: #ff5722; margin-top: 10px;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p>
                </div>
            </div>
        `;

        return Head + Body;
    },

    leaveMessTemp(params) {
        const Body = `
            <div class="mainBox" style="padding: 0 30px;">
                <p class="mailTitle" style="font-size: 16px; color: #333;">[您有新留言]<a href="${url}/admin/"
                        style="color: #537fd8; margin-left: 5px; text-decoration:none;">您有一条新留言，点击查看详情</a></p>
                ${mailSendTime}
                <div class="content" style="font-size: 14px; margin-top: 20px;">
                    <p style="font-family: Microsoft Yahei, Helvetica, sans-serif; font-weight: normal; color: #333;">
                        ${params.username} 于 ${params.pubtime} 发表了新留言：</p>
                    <pre style="padding: 15px 20px; border: 1px dotted #ccc;font-family: Microsoft Yahei, Helvetica, sans-serif; margin: 20px 0;"><span style="font-size: 20px;">“ </span>${params.content}<span style="font-size: 20px;"> ”</span></pre>
                    <p style="line-height: 30px; color: #ff5722; margin-top: 10px;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p>
                </div>
            </div>
        `;

        return Head + Body;
    },

    commentTweetTemp(params) {
        const Body = `
            <div class="mainBox" style="padding: 0 30px;">
                <p class="mailTitle" style="font-size: 16px; color: #333;">[新评论] 您的行博有一条新评论！</p>
                ${mailSendTime}
                <div class="content" style="font-size: 14px; margin-top: 20px;">
                    <p style="font-family: Microsoft Yahei, Helvetica, sans-serif; font-weight: normal; color: #333;">
                        ${params.username} 于 ${params.pubtime} 评论了你的行博：</p>
                    <pre style="padding: 15px 20px; border: 1px dotted #ccc;font-family: Microsoft Yahei, Helvetica, sans-serif; margin: 20px 0;"><span style="font-size: 20px;">“ </span>${params.content}<span style="font-size: 20px;"> ”</span></pre>
                    <p style="line-height: 30px; color: #333;">行博详情</p>
                    <pre style="padding: 15px 20px; background-color: #eee;border: 1px solid #ccc;font-family: Microsoft Yahei, Helvetica, sans-serif; margin: 20px 0;">${params.tweet}</pre>
                    <p style="line-height: 30px; color: #333;">您可以点击<a href="${url}/bibi/${params.bibiId}" target="_blank"
                        style="color: #537fd8;">[查看详情]</a>查看完整内容</p>
                    <p style="line-height: 30px; color: #ff5722; margin-top: 10px;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p>
                </div>
            </div>
        `;

        return Head + Body;
    },

    commentArticleTemp(params) {
        const Body = `
            <div class="mainBox" style="padding: 0 30px;">
                <p class="mailTitle" style="font-size: 16px; color: #333;">[新评论] 您的文章<a
                    href="${url}/article/${params.id}" target="_blank"
                    style="color: #537fd8; margin-left: 5px; line-height: 30px; text-decoration:none;">《${params.title}》</a>有一条新评论！
                </p>
               ${mailSendTime}
                <div class="content" style="font-size: 14px; margin-top: 20px;">
                    <p style="font-family: Microsoft Yahei, Helvetica, sans-serif; font-weight: normal; color: #333;">
                        ${params.username} 于 ${params.pubtime} 评论了你的文章：</p>
                    <pre
                        style="padding: 15px 20px; border: 1px dotted #ccc;font-family: Microsoft Yahei, Helvetica, sans-serif; margin: 20px 0;"><span style="font-size: 20px;">“ </span>${params.content}<span style="font-size: 20px;"> ”</span></pre>
                    <p style="line-height: 30px; color: #333;">您可以点击<a href="${url}/article/${params.id}" target="_blank"
                            style="color: #537fd8;">[查看详情]</a>查看完整内容</p>
                    <p style="line-height: 30px; color: #ff5722; margin-top: 10px;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p>
                </div>
            </div>
        `;

        return Head + Body;
    },

    commentSourceTemp(params) {
        const Body = `
            <div class="mainBox" style="padding: 0 30px;">
                <p class="mailTitle" style="font-size: 16px; color: #333;">[新评论] 您的资源<a
                    href="${url}/article/${params.id}" target="_blank"
                    style="color: #537fd8; margin-left: 5px; line-height: 30px; text-decoration:none;">《${params.title}》</a>有一条新评论！
                </p>
               ${mailSendTime}
                <div class="content" style="font-size: 14px; margin-top: 20px;">
                    <p style="font-family: Microsoft Yahei, Helvetica, sans-serif; font-weight: normal; color: #333;">
                        ${params.username} 于 ${params.pubtime} 评论了你的资源：</p>
                    <pre
                        style="padding: 15px 20px; border: 1px dotted #ccc;font-family: Microsoft Yahei, Helvetica, sans-serif; margin: 20px 0;"><span style="font-size: 20px;">“ </span>${params.content}<span style="font-size: 20px;"> ”</span></pre>
                    <p style="line-height: 30px; color: #333;">您可以点击<a href="${url}/movie/${params.id}" target="_blank"
                            style="color: #537fd8;">[查看详情]</a>查看完整内容</p>
                    <p style="line-height: 30px; color: #ff5722; margin-top: 10px;">(此邮件由系统自动发出，请勿直接回复此邮箱)</p>
                </div>
            </div>
        `;

        return Head + Body;
    }
};