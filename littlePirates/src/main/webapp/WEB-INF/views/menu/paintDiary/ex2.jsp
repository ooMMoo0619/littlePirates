<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>원고지 테스트</title>
    <style>

        .wrap{
            width:750px;
            margin: 0 auto;
        }

        .sm-paper{
            --line-length:4;
            box-sizing: content-box;
            border:2px solid red;
            display: flex;
            padding:0.2em 0;
            flex-direction: row;
            flex-wrap: wrap;
            width:calc( var(--line-length) * 1.5em );
            font-family: cursive ;
            /* font-size: 116px; */
            font-size: calc(700px / var(--line-length) / 1.5);
        }
        .sm-paper[data-line-length="1"]{ --line-length:1; }
        .sm-paper[data-line-length="2"]{ --line-length:2; }
        .sm-paper[data-line-length="3"]{ --line-length:3; }
        .sm-paper[data-line-length="4"]{ --line-length:4; }
        .sm-paper[data-line-length="5"]{ --line-length:5; }
        .sm-paper[data-line-length="6"]{ --line-length:6; }
        .sm-paper[data-line-length="7"]{ --line-length:7; }
        .sm-paper[data-line-length="8"]{ --line-length:8; }
        .sm-paper[data-line-length="9"]{ --line-length:9; }
        .sm-paper[data-line-length="10"]{ --line-length:10; }
        .sm-paper[data-line-length="11"]{ --line-length:11; }
        .sm-paper[data-line-length="12"]{ --line-length:12; }
        .sm-paper[data-line-length="13"]{ --line-length:13; }
        .sm-paper[data-line-length="14"]{ --line-length:14; }
        .sm-paper[data-line-length="15"]{ --line-length:15; }
        .sm-paper[data-line-length="16"]{ --line-length:16; }
        .sm-paper[data-line-length="17"]{ --line-length:17; }
        .sm-paper[data-line-length="18"]{ --line-length:18; }
        .sm-paper[data-line-length="19"]{ --line-length:19; }
        .sm-paper[data-line-length="20"]{ --line-length:20; }
        
        .sm-paper > span{
            box-sizing: border-box;
            flex: 1 0 auto;
            vertical-align: middle;
            display: inline-flex;
            flex-wrap: nowrap;
            align-content: center;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width:1.5em;
            height:1.5em;
            border:1px solid red;
            border-left-width: 0px;
            margin:0.2em 0;
            /* margin-left: -1px; */
        }
        .sm-paper[data-line-length="1"] > span:nth-child(1n),
        .sm-paper[data-line-length="2"] > span:nth-child(2n),
        .sm-paper[data-line-length="3"] > span:nth-child(3n),
        .sm-paper[data-line-length="4"] > span:nth-child(4n),
        .sm-paper[data-line-length="5"] > span:nth-child(5n),
        .sm-paper[data-line-length="6"] > span:nth-child(6n),
        .sm-paper[data-line-length="7"] > span:nth-child(7n),
        .sm-paper[data-line-length="8"] > span:nth-child(8n),
        .sm-paper[data-line-length="9"] > span:nth-child(9n),
        .sm-paper[data-line-length="10"] > span:nth-child(10n),
        .sm-paper[data-line-length="11"] > span:nth-child(11n),
        .sm-paper[data-line-length="12"] > span:nth-child(12n),
        .sm-paper[data-line-length="13"] > span:nth-child(13n),
        .sm-paper[data-line-length="14"] > span:nth-child(14n),
        .sm-paper[data-line-length="15"] > span:nth-child(15n),
        .sm-paper[data-line-length="16"] > span:nth-child(16n),
        .sm-paper[data-line-length="17"] > span:nth-child(17n),
        .sm-paper[data-line-length="18"] > span:nth-child(18n),
        .sm-paper[data-line-length="19"] > span:nth-child(19n),
        .sm-paper[data-line-length="20"] > span:nth-child(20n)        
        {
            border-right-width: 0px;
        }
    </style>
    <script>
        function syncSmPaper(text){
            let sm_paper = document.querySelector('#sm_paper');
            sm_paper.innerHTML = '';
            text = text.trim();
            let len = text.length;
            let ll = parseInt(sm_paper.dataset.lineLength,10)
            

            let mlen = (len > ll*4)?ll*8:ll*4;
            text += ' '.repeat(Math.max(0,Math.min(mlen-len,ll*8)));
            text.split('').forEach(ch => {
                let span = document.createElement('span')
                span.textContent = ch;
                sm_paper.append(span)
            });
        }
        window.addEventListener('load',(event)=>{
            document.form_sm_paper.onsubmit();
        })
    </script>
</head>
<body>
    <div class="wrap">

        <div>
            <form name="form_sm_paper" action="#" onsubmit="syncSmPaper(this.text.value);return false;" style="text-align: center">
                <input type="text" value="한글은, AB !? 韓 文 이렇고 저렇고 어쩌고 저쩌고," maxlength="500" style="width:700px;font-size: 30px;" name="text" oninput="this.form.onsubmit(); return false" onblur="this.form.onsubmit(); return false">

                <br>
                한줄에 몇글자? <select style="font-size: 30px;;" onchange="document.querySelector('#sm_paper').dataset.lineLength=this.value;this.form.onsubmit()">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4" selected>4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    
                </select>
            </form>
        </div>
        <br>                <br>
        <div class="sm-paper" data-line-length="4" id="sm_paper" style="margin:0 auto;">
            <span>한</span>
            <span>글</span>
            <span>작</span>
            <span>성</span>
            <span> </span>
            <span>.</span>
            <span>?</span>
            <span>!</span>
        </div>
    </div>
	</body>
</html>