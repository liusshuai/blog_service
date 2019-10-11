/*
 Navicat Premium Data Transfer

 Source Server         : myblog
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : localhost
 Source Database       : myblog

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : utf-8

 Date: 10/08/2019 12:17:15 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `album`
-- ----------------------------
DROP TABLE IF EXISTS `album`;
CREATE TABLE `album` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '昵称',
  `desc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '密码',
  `tags` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '邮箱',
  `createtime` datetime NOT NULL,
  `views` int(8) DEFAULT '0',
  `likes` int(8) DEFAULT '0',
  `channel` int(10) NOT NULL,
  `cover` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `author` int(8) NOT NULL,
  `rec` int(2) DEFAULT '0',
  `imgcount` int(2) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
--  Table structure for `articles`
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '标题',
  `author` int(8) NOT NULL COMMENT '作者',
  `pubtime` timestamp NULL DEFAULT NULL COMMENT '发布时间',
  `views` int(10) unsigned DEFAULT '0' COMMENT '阅读数',
  `likes` int(10) unsigned DEFAULT '0' COMMENT '点赞数',
  `content` text COLLATE utf8_unicode_ci COMMENT '内容',
  `imgcover` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '封面',
  `channel` int(8) NOT NULL COMMENT '频道',
  `desc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '简介',
  `tags` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '标签',
  `createtime` timestamp NULL DEFAULT NULL,
  `show` tinyint(2) NOT NULL,
  `comments` int(10) DEFAULT '0',
  `rec` int(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
--  Table structure for `author`
-- ----------------------------
DROP TABLE IF EXISTS `author`;
CREATE TABLE `author` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `account` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '邮箱',
  `nickname` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '昵称',
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '密码',
  `avator` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '头像',
  `followers` int(16) DEFAULT NULL COMMENT '关注数',
  `bg_cover` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '封面',
  `intro` tinytext COLLATE utf8_unicode_ci COMMENT '自我介绍',
  `admin` tinyint(2) NOT NULL DEFAULT '0',
  `articles` int(6) DEFAULT '0',
  `tweets` int(6) DEFAULT '0',
  `albums` int(6) DEFAULT '0',
  `ide` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lock` int(2) NOT NULL DEFAULT '0',
  `rec` int(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
--  Table structure for `blog_comments`
-- ----------------------------
DROP TABLE IF EXISTS `blog_comments`;
CREATE TABLE `blog_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `host` int(11) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `useremail` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `userblog` varchar(255) DEFAULT NULL,
  `replyname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `replyemail` varchar(255) DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT '1',
  `replycontent` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `blogfollower`
-- ----------------------------
DROP TABLE IF EXISTS `blogfollower`;
CREATE TABLE `blogfollower` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `breadcast`
-- ----------------------------
DROP TABLE IF EXISTS `breadcast`;
CREATE TABLE `breadcast` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `time` datetime NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
--  Table structure for `chanelfollow`
-- ----------------------------
DROP TABLE IF EXISTS `chanelfollow`;
CREATE TABLE `chanelfollow` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `ownid` int(8) NOT NULL,
  `cid` int(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `channel`
-- ----------------------------
DROP TABLE IF EXISTS `channel`;
CREATE TABLE `channel` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `cname` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '名字',
  `createtime` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `cdesc` text COLLATE utf8_unicode_ci COMMENT '简介',
  `cimg` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '封面',
  `boss` int(8) NOT NULL DEFAULT '0',
  `followers` int(6) NOT NULL DEFAULT '0',
  `articlecount` int(6) NOT NULL DEFAULT '0',
  `albumcount` int(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
--  Table structure for `child_comment`
-- ----------------------------
DROP TABLE IF EXISTS `child_comment`;
CREATE TABLE `child_comment` (
  `child_comment_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `parent_id` int(8) NOT NULL COMMENT '父留言id(外键)',
  `pubtime` datetime DEFAULT NULL COMMENT '发布时间',
  `content` text COLLATE utf8_unicode_ci COMMENT '内容',
  `req_user_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '回复对象昵称',
  `res_user_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '被回复对象昵称',
  `req_user_id` int(8) NOT NULL,
  `res_user_id` int(8) NOT NULL,
  PRIMARY KEY (`child_comment_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
--  Table structure for `comments`
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `comment_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_id` int(8) DEFAULT NULL COMMENT '评论指向id(外键)',
  `content` text COLLATE utf8_unicode_ci COMMENT '内容',
  `userid` int(8) DEFAULT '0',
  `pubtime` datetime DEFAULT NULL COMMENT '发布时间',
  `type` int(4) DEFAULT NULL COMMENT '指向(文章/帖子)',
  PRIMARY KEY (`comment_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
--  Table structure for `follows`
-- ----------------------------
DROP TABLE IF EXISTS `follows`;
CREATE TABLE `follows` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `own_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  `each` int(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
--  Table structure for `forum`
-- ----------------------------
DROP TABLE IF EXISTS `forum`;
CREATE TABLE `forum` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `author` int(8) NOT NULL,
  `pubtime` timestamp NULL DEFAULT NULL,
  `views` int(10) DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci,
  `top` tinyint(2) DEFAULT '0',
  `choice` tinyint(2) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
--  Table structure for `imgs`
-- ----------------------------
DROP TABLE IF EXISTS `imgs`;
CREATE TABLE `imgs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `src` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pid` int(8) NOT NULL,
  `type` int(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
--  Table structure for `message`
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `sid` int(8) NOT NULL,
  `content` text NOT NULL,
  `rid` int(8) NOT NULL,
  `rname` varchar(255) NOT NULL,
  `time` datetime NOT NULL,
  `isread` int(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `messboard`
-- ----------------------------
DROP TABLE IF EXISTS `messboard`;
CREATE TABLE `messboard` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `userid` int(8) NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `time` datetime NOT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `semail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sblog` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` int(4) NOT NULL DEFAULT '1',
  `parentid` int(8) NOT NULL DEFAULT '0',
  `childs` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
--  Table structure for `movie`
-- ----------------------------
DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `cover` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `director` varchar(255) DEFAULT NULL,
  `actor` varchar(255) DEFAULT NULL,
  `desc` text,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tweet`
-- ----------------------------
DROP TABLE IF EXISTS `tweet`;
CREATE TABLE `tweet` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `pubtime` datetime DEFAULT NULL,
  `userid` int(8) NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `fromw` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `like_num` int(10) DEFAULT '0',
  `video` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `imgs` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
