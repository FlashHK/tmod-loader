<div id="header">
	{{include '../b/b'}}
	<ul id="nav">
	{{each list as item}}
	    <li><a href="http://www.qq.com">{{item.time | dateFormat:'yyyy-MM-dd hh:mm:ss'}}</a></li>
	{{/each}}
	</ul>
</div>
<!-- 头部 结束 --> 