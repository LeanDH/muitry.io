function setCookie(c_name,value)
{
	//var exdate=new Date();
	//exdate.setDate(exdate.getDate() + 5);
	document.cookie=c_name+ "=" +escape(value);
}

function getCookie(c_name)
{
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1)
		{ 
			c_start=c_start + c_name.length+1 
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
				return unescape(document.cookie.substring(c_start,c_end))
		} 
	}
	return ""
}

function checkCookie()
{
 	if (getCookie('orgid') == '')
	{
		window.location.href="/htrb/public/php/index.php"
	}
}
