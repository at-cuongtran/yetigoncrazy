let map;
const COORDINATE_PATTERN = /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/;

function initMap() {
  const mapOptions = {
    mapTypeId: 'satellite',
  }

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // const mapLayer = new google.maps.KmlLayer({
  //   url: "https://www.google.com/maps/d/kml?mid=1lEe_sgnXv9bwxQG2Ea1dBcYBFRIC9gAh",
  //   map: map
  // });
}

const markers = [
  [15.92358, 107.57196],
  [15.92706, 107.57069],
  [15.94046, 107.57247],
  [15.94279, 107.5719]
];

$(document).ready(function () {
  $('#parent').on("scroll", onScroll);
});

const parentHeight = $('#parent')[0].clientHeight;
const stacks = {
  stack: [],
  length: 0,
  top: null
};  
function onScroll(event) {
  let scrollOffsetTop;
  stacks.stack = [];
  // stacks.length = 0;
  // stacks.top = null;

  $('#parent .section').each(function () {
    const el = $(this)[0];
    scrollOffsetTop = el.offsetTop - el.offsetParent.scrollTop;
    let id;
    if (scrollOffsetTop <= parentHeight/2) {
      // console.log(el, scrollOffsetTop, parentHeight/2);
      id = Number.parseInt(el.getAttribute('id'));
      stacks.stack.push(id);
    }
  });

  if (stacks.stack.length != stacks.length) {
    stacks.length = stacks.stack.length;
    stacks.top = stacks.stack[stacks.stack.length - 1];
    console.log(stacks.top);
    moveToLocation(
      markers[stacks.top][0], markers[stacks.top][1]
    )
    if (stacks.top === 0) {
      map.setZoom(13);
    } else {
      map.setZoom(16);
    }
  }
}

function moveToLocation(lat, lng){
  const bounds = new google.maps.LatLng(lat, lng);
  map.panTo(bounds);
}

