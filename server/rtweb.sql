-- 初始化 用户角色权限表 

CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `value` varchar(45) DEFAULT NULL,
  `attr` varchar(45) DEFAULT NULL COMMENT '补充值',
  `desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COMMENT='权限表';

INSERT INTO `permission` VALUES 
(1,NULL,'后台','admin','',''),
(2,1,'用户','user','',''),
(3,2,'编辑','edit','',''),
(4,1,'角色','role','',''),
(5,4,'编辑','admin','',''),
(6,1,'权限','permission','',''),
(7,6,'编辑','edit','','');

CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nmae_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COMMENT='角色id 为1 当作系统管理员用 不需要权限编辑 ';
INSERT INTO `role` VALUES (1,NULL,'系统管理员');

CREATE TABLE `role_permission` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL COMMENT '根据 type 和 action_id  关联到 app_menu,app_partner 权限'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `pwd` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

INSERT INTO `user` VALUES (1,'系统账号','admin','111111');

CREATE TABLE `user_role` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user_role` VALUES (1,1);