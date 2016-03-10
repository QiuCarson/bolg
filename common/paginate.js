module.exports=function paginate(pagecount,pagesize,currentpage){

		var pagecount = pagecount ;  
        var pagesize = pagesize;  
        var currentpage = currentpage;  
        var counts,pagehtml=pagecount+" 条 "+currentpage+"/"+pagesize+" 页";  
        if(pagecount%pagesize==0){  
            counts = parseInt(pagecount/pagesize);  
        }else{  
            counts = parseInt(pagecount/pagesize)+1;  
        }  
        //只有一页内容  
        if(pagecount<=pagesize){pagehtml="";}  
        //大于一页内容  
        if(pagecount>pagesize){  
            if(currentpage>1){  
                pagehtml+= '<a href="?p='+(currentpage-1)+'">上一页</a>';  
            }  
            for(var i=0;i<counts;i++){  
                if(i>=(currentpage-3) && i<(currentpage+3)){  
                    if(i==currentpage-1){  
                        pagehtml+= '<a class="current" href="?p='+(i+1)+'">'+(i+1)+'</a>';  
                    }else{  
                        pagehtml+= '<a href="?p='+(i+1)+'">'+(i+1)+'</a>';  
                    }  
                      
                }  
            }  
            if(currentpage<counts){  
                pagehtml+= '<a href="?p='+(currentpage+1)+'">下一页</a>';  
            }  
        }  
		this.phtml=pagehtml;
}