# bNgSlide

a directive to replace ngShow with toggleSlide effect.

there are 4 attribures
bresleveloper-ng-show="scope function name"
b-time="300"
b-delay="100"
b-test="children"

b-ng-slide takes a scope function name, override it, and toggleSlide before and after execution

b-time is the time for the animation, if not stated is 300

b-delay is the time for the delay before firing the animation (hover intent), if not stated is same as b-time

b-test is for a case where you don't want the animation to occur, in case of a null array or reference, so it loops all the argument of the scope function above and if it does not have this member (i.e. if (!args[b-test])) the slideDown will not occur

more information can be found in my blog http://bresleveloper.blogspot.co.il/2015/01/angular-ng-show-with-slide.html

a live example http://jsbin.com/jukogewobo/5/

example for usage  (every "topLevel" in "data" has a "Children" member except one)

&lt;menu ng-mouseleave=&#39;changeData({})&#39;&gt;
	&lt;ul&gt;
		&lt;li ng-repeat=&#39;topLevel in data&#39; ng-mouseenter=&#39;changeData(topLevel, $index)&#39; &gt;
			&lt;a href=&#39;{{ topLevel.URL || &#39;#&#39; }}&#39;&gt;{{ topLevel.Label }}&lt;/a&gt;
		&lt;/li&gt;
	&lt;/ul&gt;

    &lt;div b-ng-slide=&#39;changeData&#39; b-delay=&#39;150&#39; b-time=&#39;250&#39; b-test=&#39;Children&#39; &gt;
		&lt;!-- angular html --&gt;
	&lt;/div&gt;
&lt;/menu&gt;