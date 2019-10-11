const path = require('path');
const fs = require('fs');
const Busboy = require('busboy');

// 创建文件上传目录
function mkdirsSync (dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true;
        }
    }
}

// 获取文件后缀
function getSuffixName (filename) {
    let nameList = filename.split('.');
    return nameList[nameList.length - 1];
}

class UploadServer {
    constructor () {}

    async uploadfile (ctx, options) {
        let req = ctx.req;
        let busboy = new Busboy({headers: req.headers});

        let fileType = options.fileType || 'common';
        let filePath = path.join(options.path, fileType);

        mkdirsSync(filePath);

        return new Promise((resolve, reject) => {
            let result = {
                success: false,
                formData: {}
            }
            busboy.on('file', (filedname, file, filename) => {
                let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename);
                let _uploadFilePath = path.join(filePath, fileName);
                let saveTo = path.join(_uploadFilePath);

                // 文件保存到指定路径
                file.pipe(fs.createWriteStream(saveTo));

                // 文件写入时间结束 
                file.on('end', function () {
                    result.success = true;
                    result.message = '文件上传成功';
                    result.formData.url = `/server/static/${options.user}/${options.fileType}/${fileName}`;
                    resolve(result); 
                });
            });

            // 解析结束事件
            busboy.on('finish', function () {
                resolve(result);
            });
        
            busboy.on('error', function (err) {
                reject(result);
            });
        
            req.pipe(busboy);
        });
    }
}

module.exports = new UploadServer();