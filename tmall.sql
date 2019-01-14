-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2019-01-14 09:54:55
-- 服务器版本： 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tmall`
--

-- --------------------------------------------------------

--
-- 表的结构 `tmall_goods`
--

CREATE TABLE `tmall_goods` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `pic` text NOT NULL,
  `old_price` decimal(20,2) NOT NULL,
  `new_price` decimal(20,2) NOT NULL,
  `info` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `tmall_goods`
--

INSERT INTO `tmall_goods` (`id`, `title`, `pic`, `old_price`, `new_price`, `info`) VALUES
(1, 'COACH/蔻驰男包大号男士双肩背包双肩包商务休闲包 54786', '{"p1" : "../img/goods1_bigger1.jpg","p2" : "../img/goods1_bigger2.jpg","p3" : "../img/goods1_bigger3.jpg","p4" : "../img/goods1_bigger4.jpg","p5" : "../img/goods1_bigger5.jpg"}', '1998.00', '1798.00', '{"collectCount" : "（1935人气）","subTitle" : "客邻牛皮大号男士多功能双肩包","sellCount" : 26,"reviewCount" : 26,"pointValue" : 32,"stock" : 112,"deliveryAdd" : "美国","sku" : "<p class=\'sku-line\'>颜色分类：X521深蓝</p>","shop" : "客邻尚品海外旗舰店"}'),
(2, '环球网红豹纹高帮帆布鞋女2018冬季新款韩版学生布鞋加绒保暖棉鞋', '{"p1" : "../img/goods2_bigger1.jpg","p2" : "../img/goods2_bigger2.jpg","p3" : "../img/goods2_bigger3.jpg","p4" : "../img/goods2_bigger4.jpg","p5" : "../img/goods2_bigger5.jpg"}', '59.00', '49.00', '{"collectCount" : "（632人气）","subTitle" : "","sellCount" : 163,"reviewCount" : 117,"pointValue" : 24,"stock" : 59,"deliveryAdd" : "浙江金华","sku" : "<p class=\'sku-line\'>尺寸：26.4x20cm</p><p class=\'sku-line\'>颜色分类：赭石黑</p>","shop" : "睿莎鞋类专营店"}'),
(3, 'Steiner视得乐望远镜2002高倍高清夜视便携袖珍双筒眼德国进口', '{"p1" : "../img/goods3_bigger1.jpg","p2" : "../img/goods3_bigger2.jpg","p3" : "../img/goods3_bigger3.jpg","p4" : "../img/goods3_bigger4.jpg","p5" : "../img/goods3_bigger5.jpg"}', '1388.00', '1188.00', '{"collectCount" : "（313人气）","subTitle" : "高倍高清 袖珍便携 保修十年","sellCount" : 16,"reviewCount" : 38,"pointValue" : 594,"stock" : 47,"deliveryAdd" : "上海","sku" : "<p class=\'sku-line\'>尺寸：26.4x20cm</p><p class=\'sku-line\'>颜色分类：1薄荷绿 蓝牙版</p>","shop" : "睿莎鞋类专营店"}');

-- --------------------------------------------------------

--
-- 表的结构 `tmall_user`
--

CREATE TABLE `tmall_user` (
  `u_id` int(11) NOT NULL,
  `u_name` varchar(20) NOT NULL,
  `u_password` varchar(20) NOT NULL,
  `u_email` varchar(20) NOT NULL,
  `u_phone` varchar(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `tmall_user`
--

INSERT INTO `tmall_user` (`u_id`, `u_name`, `u_password`, `u_email`, `u_phone`) VALUES
(10000, '方', '3.1415926', '163@qq.com', '13312341234'),
(10002, 'wangwu', '123456', '1632@qq.com', '13233333333'),
(10003, 'asdasd', 'asdasd', '16352382@qq.com', '13312341236'),
(10004, 'wangwu1', '233333', '123@qq.com', '18812345678'),
(10005, '19999999999', '19999999999', '163@qq.com', '19999999999'),
(10006, '123456', '123456', '123@qq.com', '13777885653');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tmall_goods`
--
ALTER TABLE `tmall_goods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tmall_user`
--
ALTER TABLE `tmall_user`
  ADD PRIMARY KEY (`u_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `tmall_user`
--
ALTER TABLE `tmall_user`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10007;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
