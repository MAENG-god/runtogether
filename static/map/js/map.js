var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.46594871587684 , 126.95123527437407 ), // 지도의 중심좌표
        level: 4 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

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
    alert(marker.getPosition())


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
            <input type="number" name="quantity" min="1" max="100">
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
            <textarea rows="5"></textarea>
            </div>

            <input type="submit" class="btn btn-dark btn-lg" value="생성">

            
        </div>
    </div>
    `
    document.body.appendChild(room_content)
}