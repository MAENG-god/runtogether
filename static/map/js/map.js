var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.46594871587684 , 126.95123527437407 ), // 지도의 중심좌표
        level: 4 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

for(var i = 0; i<roomlist.length; i++){
    var position_str = roomlist[i].markerposition;
    var position_slice = position_str.slice(1, -1)
    var position_list = position_slice.split(",")
    var markposition = new kakao.maps.LatLng(Number(position_list[0]), Number(position_list[1]))

    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

    var marker_fix = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: markposition, // 마커를 표시할 위치
        title : roomlist[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });

    var content = '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
                        roomlist[i].title + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '                <button type="button" class="img btn btn-primary" onclick="clickbtn()">참가하기</button>' +
            '            <div class="desc">' + 
            '                <div class="ellipsis">성별: '+roomlist[i].who+'</div>' + 
            '                <div class="jibun ellipsis">날짜: '+roomlist[i].date + ' 시간: ' + roomlist[i].time + '</div>' +
            '                <div>COMMENT:</div>' +
            '                <div>'+ roomlist[i].comment + '</div>'  +
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>';

    var overlay = new kakao.maps.CustomOverlay({
        content: content,    
        position: markposition
    });

    function closeOverlay(){
        overlay.setMap(null);
    }
    

    // kakao.maps.event.addListener(marker_fix, 'mouseover', makeOverListener(map, overlay));
    // kakao.maps.event.addListener(marker_fix, 'mouseout', makeOutListener(overlay));
    kakao.maps.event.addListener(marker_fix, 'click', openListener(map, overlay));
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, overlay) {
    return function() {
        overlay.setMap(map);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(overlay) {
    return function() {
        overlay.setMap(null);
    };
}

//오버레이 클릭 시 열기
function openListener(map, overlay) {
    if(overlay.getMap() == null){
        return function() {
            overlay.setMap(map);
        };
    }   
    else{
        return function(){
            overlay.setMap(null);
        }
    }
}


var markers = []

var createroom1 = document.querySelector('.createroom1');
createroom1.addEventListener("click", function(){
    createroom1.style.visibility = "hidden";
    var makeplace = document.querySelector('.createroom2');
    makeplace.style.visibility = "visible";

    var markerPosition = new kakao.maps.LatLng(37.46594871587684 , 126.95123527437407);
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    // 마커가 드래그 가능하도록 설정합니다 
    marker.setDraggable(true);
    markers.push(marker)
    });

var createroom2 = function(){
    var marker = markers.shift()
    var marker_position = marker.getPosition()


    var makeplace = document.querySelector('.createroom2');
    makeplace.style.visibility = "hidden";
    room_content = document.createElement("div")
    room_content.className = "room_content";
    room_content.innerHTML = `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <div><h5 class="card-title">방 제목</h5><input name="roomname" class="input_name" type="text"></div>
            <br>

            <div>
            <h5>모집대상</h5>
            <input type="radio" id="male" name="gender" value="male">
            <label for="male">남자</label>
            <input type="radio" id="female" name="gender" value="female">
            <label for="female">여자</label>
            <input type="radio" id="both" name="gender" value="both">
            <label for="female">성별무관</label>
            </div>
            <br>

            <div>
            <h5>모집인원</h5>
            <input type="number" name="members" min="1" max="100">
            </div>
            <br>

            <div>
            <h5>시간</h5>
            <input type="date" name="date">
            <input type="time" name="time">
            </div>
            <br>

            <div>
            <h5>부가설명</h5>
            <textarea rows="5" name="comment"></textarea>
            </div>

            <input name="latling" value="${marker_position}" style="visibility:hidden;">

            <input type="submit" class="btn btn-dark btn-lg" value="생성">

            
        </div>
    </div>
    `
    var room_form = document.querySelector(".room_form");
    room_form.appendChild(room_content)
}

function clickbtn(){
    alert("준비중입니다!")
}